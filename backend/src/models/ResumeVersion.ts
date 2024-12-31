import mongoose from 'mongoose';

const resumeVersionSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  version: {
    type: Number,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  name: {
    type: String,
    default: 'Untitled version'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notes: String
});

// Index composé pour garantir l'unicité de la version par CV
resumeVersionSchema.index({ resumeId: 1, version: 1 }, { unique: true });

export const ResumeVersion = mongoose.model('ResumeVersion', resumeVersionSchema); 