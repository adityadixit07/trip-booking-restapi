import Trip from '../models/Trip.js';

export const addTrip = async (req, res, next) => {
  try {
    const { from, to, date, time, price, totalSeats } = req.body;
    const trip = new Trip({
      from, to, date: new Date(date), time, price, totalSeats
    });
    await trip.save();
    res.status(201).json({ trip });
  } catch (err) {
    next(err);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    const { from, to, date, time, price, totalSeats } = req.body;
    Object.assign(trip, { from, to, date: date ? new Date(date) : trip.date, time, price });
    if (totalSeats && totalSeats !== trip.totalSeats) {
      // naive approach: reset seats (ensure this is acceptable for your workflow)
      trip.totalSeats = totalSeats;
      trip.seats = [];
    }
    await trip.save();
    res.json({ trip });
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    next(err);
  }
};

export const listTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json({ trips });
  } catch (err) {
    next(err);
  }
};
