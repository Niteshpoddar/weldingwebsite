import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema({
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
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'resolved'],
    default: 'unread'
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
contactMessageSchema.index({ email: 1 })
contactMessageSchema.index({ status: 1 })
contactMessageSchema.index({ createdAt: -1 })
contactMessageSchema.index({ company: 1 })

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema)

export default ContactMessage