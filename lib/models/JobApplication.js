import mongoose from 'mongoose'

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  resume: {
    filename: String,
    originalName: String,
    path: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  reviewedBy: {
    type: String,
    trim: true
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
jobApplicationSchema.index({ email: 1 })
jobApplicationSchema.index({ status: 1 })
jobApplicationSchema.index({ createdAt: -1 })
jobApplicationSchema.index({ position: 1 })

const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema)

export default JobApplication