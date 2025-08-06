import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  
  // Company Information
  companyName: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  industry: {
    type: String,
    trim: true,
    maxlength: [50, 'Industry cannot exceed 50 characters']
  },
  
  // Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Inquiry Type
  inquiryType: {
    type: String,
    required: [true, 'Inquiry type is required'],
    enum: ['General Inquiry', 'Product Information', 'Service Request', 'Quote Request', 'Technical Support', 'Partnership', 'Other']
  },
  
  // Priority Level
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Message Status
  status: {
    type: String,
    enum: ['new', 'read', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  
  // Admin Response
  adminResponse: {
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Admin response cannot exceed 1000 characters']
    },
    respondedAt: {
      type: Date
    },
    respondedBy: {
      type: String,
      trim: true
    }
  },
  
  // Follow-up Information
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  },
  followUpNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Follow-up notes cannot exceed 500 characters']
  },
  
  // Tags for categorization
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Each tag cannot exceed 30 characters']
  }],
  
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  readAt: {
    type: Date
  },
  resolvedAt: {
    type: Date
  },
  resolvedBy: {
    type: String,
    trim: true
  },
  
  // IP and User Agent for security
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  
  // Referrer information
  referrer: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    enum: ['contact-form', 'email', 'phone', 'social-media', 'other'],
    default: 'contact-form'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for better query performance
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ status: 1 });
contactMessageSchema.index({ submittedAt: -1 });
contactMessageSchema.index({ inquiryType: 1 });
contactMessageSchema.index({ priority: 1 });
contactMessageSchema.index({ 'adminResponse.respondedAt': -1 });

// Virtual for full name
contactMessageSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for response time
contactMessageSchema.virtual('responseTime').get(function() {
  if (this.adminResponse && this.adminResponse.respondedAt && this.submittedAt) {
    const submitted = new Date(this.submittedAt);
    const responded = new Date(this.adminResponse.respondedAt);
    const diffTime = Math.abs(responded - submitted);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  }
  return null;
});

// Virtual for days since submission
contactMessageSchema.virtual('daysSinceSubmission').get(function() {
  const submitted = new Date(this.submittedAt);
  const now = new Date();
  const diffTime = Math.abs(now - submitted);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Ensure virtual fields are serialized
contactMessageSchema.set('toJSON', { virtuals: true });
contactMessageSchema.set('toObject', { virtuals: true });

// Pre-save middleware to update timestamps
contactMessageSchema.pre('save', function(next) {
  // Update readAt when status changes to read
  if (this.isModified('status') && this.status === 'read' && !this.readAt) {
    this.readAt = new Date();
  }
  
  // Update resolvedAt when status changes to resolved
  if (this.isModified('status') && this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
  }
  
  next();
});

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;