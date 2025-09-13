import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String },
  isBooked: { type: Boolean, default: false }
}, { _id: false });

const tripSchema = new mongoose.Schema({
  from: { type: String, required: true, trim: true },
  to: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  time: { type: String },
  price: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  seats: [seatSchema],
  createdAt: { type: Date, default: Date.now }
});

// Initialize seats if not provided or mismatched
tripSchema.pre('save', function (next) {
  if (!this.seats || this.seats.length !== this.totalSeats) {
    const seats = [];
    for (let i = 1; i <= this.totalSeats; i++) {
      seats.push({ seatNumber: String(i), isBooked: false });
    }
    this.seats = seats;
  }
  next();
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;
