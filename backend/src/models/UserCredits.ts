import mongoose from 'mongoose';

const userCreditsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  credits: {
    type: Number,
    default: 10
  },
  usageHistory: [{
    action: String,
    cost: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

export const UserCredits = mongoose.model('UserCredits', userCreditsSchema); 