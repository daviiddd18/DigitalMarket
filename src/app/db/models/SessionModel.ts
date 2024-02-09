import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

export const SessionModel = mongoose.models.Session || mongoose.model('Session', sessionSchema);


