import Booking from '../models/Booking.js';
import Trip from '../models/Trip.js';
import User from '../models/User.js';
import { streamTicketPdf } from '../utils/generateTicket.js';

export const createBooking = async (req, res, next) => {
    try {
      const userId = req.user._id;
      let { tripId, selectedSeats = [], paymentMethod = 'mock' } = req.body;
  
      if (!Array.isArray(selectedSeats)) {
        selectedSeats = [selectedSeats]; 
      }
  
      if (!tripId || selectedSeats.length === 0) {
        return res.status(400).json({ message: 'tripId and at least one seat required' });
      }
  
      const trip = await Trip.findById(tripId);
      if (!trip) return res.status(404).json({ message: 'Trip not found' });
  
      const unavailable = selectedSeats.filter(s => {
        const seat = trip.seats.find(x => x.seatNumber === String(s));
        return !seat || seat.isBooked;
      });
  
      if (unavailable.length > 0) {
        return res.status(409).json({ message: 'Selected seats not available', unavailable });
      }
  
      // Mark seats as booked
      selectedSeats.forEach(s => {
        const seat = trip.seats.find(x => x.seatNumber === String(s));
        if (seat) seat.isBooked = true;
      });
      await trip.save();
  
      const totalAmount = selectedSeats.length * trip.price;
      const booking = new Booking({
        user: userId,
        trip: tripId,
        seats: selectedSeats.map(s => ({ seatNumber: String(s) })),
        totalAmount
      });
      await booking.save();
  
      res.status(201).json({
        booking,
        message: 'Booking confirmed',
        ticketUrl: `/api/bookings/${booking._id}/ticket`
      });
    } catch (err) {
      next(err);
    }
  };
  
export const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId }).populate('trip');
    const now = new Date();
    const upcoming = bookings.filter(b => b.trip && new Date(b.trip.date) >= now);
    const past = bookings.filter(b => b.trip && new Date(b.trip.date) < now);
    res.json({ upcoming, past });
  } catch (err) {
    next(err);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('trip user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (String(booking.user._id) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json({ booking });
  } catch (err) {
    next(err);
  }
};

export const getTicketPdf = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('trip user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (String(booking.user._id) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    streamTicketPdf(res, booking, booking.trip, booking.user);
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('trip');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (String(booking.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const trip = await Trip.findById(booking.trip._id);
    booking.seats.forEach(s => {
      const seat = trip.seats.find(x => x.seatNumber === String(s.seatNumber));
      if (seat) seat.isBooked = false;
    });
    await trip.save();

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    next(err);
  }
};
