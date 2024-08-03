import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  scheduledDeparture: { type: Date, required: true },
  status: { type: String, required:true},
  airline: { type: String, required: true },
  flightType: { type: String, required: true },
}, {
  timestamps: true,
});

const Flight = mongoose.models.Flight || mongoose.model('Flight', flightSchema);

export default Flight;
