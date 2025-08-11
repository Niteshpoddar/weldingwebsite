import mongoose from 'mongoose';

const trainingApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  trainingCourse: {
    type: String,
    required: true,
    trim: true
  },
  numberOfParticipants: {
    type: String,
    required: true,
  },
  trainingFormat: {
    type: String,
    // enum: ['On-site', 'Remote', 'Workshop', 'Other'], // customize as needed
    required: true
  },
  additionalRequirement: {
    type: String,
    trim: true,
    default: ''
  },
  resumeUrl: {
    type: String, // store Cloudinary secure URL for resume uploads
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const TrainingApplication = mongoose.models.TrainingApplication || mongoose.model('TrainingApplication', trainingApplicationSchema);
export default TrainingApplication;
