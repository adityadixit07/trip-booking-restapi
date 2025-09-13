import express from 'express';
import auth from '../middlewares/auth.js';
import {
  createBooking,
  getUserBookings,
  getBooking,
  getTicketPdf,
  cancelBooking
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/my-bookings', auth, getUserBookings);
router.get('/:id', auth, getBooking);
router.get('/:id/ticket', auth, getTicketPdf);
router.post('/:id/cancel', auth, cancelBooking);

export default router;
