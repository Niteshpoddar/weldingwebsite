import mongoose from 'mongoose'

const JobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'temporary']
  },
  experience: {
    type: String,
    required: true,
    enum: ['entry-level', '1-3 years', '3-5 years', '5+ years']
  },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  applicationDeadline: {
    type: Date
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema)