import mongoose from 'mongoose'

const trainingRegistrationSchema = new mongoose.Schema({
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
  company: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  trainingType: {
    type: String,
    required: true,
    trim: true
  },
  participants: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'confirmed', 'cancelled'],
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
trainingRegistrationSchema.index({ email: 1 })
trainingRegistrationSchema.index({ status: 1 })
trainingRegistrationSchema.index({ createdAt: -1 })
trainingRegistrationSchema.index({ course: 1 })
trainingRegistrationSchema.index({ company: 1 })

const TrainingRegistration = mongoose.models.TrainingRegistration || mongoose.model('TrainingRegistration', trainingRegistrationSchema)

export default TrainingRegistration