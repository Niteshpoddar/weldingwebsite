import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
    trim: true
  },
  yearsOfExperience: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  resumeUrl: {
    type: String, // store file URL or path, e.g. uploaded location in cloud or /uploads
    // required: true,
    trim: true
  },
  coverLetterUrl: {
    type: String, // can be optional
    trim: true
  },
  coverLetterText: {
    type: String, // alternatively, you can store the letter as text instead of URL
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected', 'hired'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
