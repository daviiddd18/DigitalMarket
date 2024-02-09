import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  date: { type: Date, default: Date.now },
});

export const SessionModel = mongoose.models.Session || mongoose.model('Session', sessionSchema);


