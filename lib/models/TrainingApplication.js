import mongoose from 'mongoose';

const trainingApplicationSchema = new mongoose.Schema({
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
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  
  // Company Information
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  companySize: {
    type: String,
    required: [true, 'Company size is required'],
    enum: ['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees']
  },
  
  // Training Details
  trainingProgram: {
    type: String,
    required: [true, 'Training program is required'],
    trim: true
  },
  trainingType: {
    type: String,
    required: [true, 'Training type is required'],
    enum: ['On-site', 'Online', 'Hybrid', 'Workshop', 'Certification']
  },
  
  // Participant Information
  participants: {
    type: Number,
    required: [true, 'Number of participants is required'],
    min: [1, 'At least 1 participant is required'],
    max: [100, 'Maximum 100 participants allowed']
  },
  
  // Training Requirements
  preferredDates: {
    startDate: {
      type: Date,
      required: [true, 'Preferred start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'Preferred end date is required']
    }
  },
  
  // Additional Requirements
  specialRequirements: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requirements cannot exceed 500 characters']
  },
  
  // Training Objectives
  objectives: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each objective cannot exceed 200 characters']
  }],
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'confirmed', 'scheduled', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Admin Notes
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Admin notes cannot exceed 500 characters']
  },
  
  // Scheduling Information
  scheduledDate: {
    type: Date
  },
  trainer: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
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
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for better query performance
trainingApplicationSchema.index({ email: 1 });
trainingApplicationSchema.index({ status: 1 });
trainingApplicationSchema.index({ submittedAt: -1 });
trainingApplicationSchema.index({ trainingProgram: 1 });
trainingApplicationSchema.index({ companyName: 1 });

// Virtual for full name
trainingApplicationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for training duration
trainingApplicationSchema.virtual('duration').get(function() {
  if (this.preferredDates && this.preferredDates.startDate && this.preferredDates.endDate) {
    const start = new Date(this.preferredDates.startDate);
    const end = new Date(this.preferredDates.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }
  return 'Not specified';
});

// Ensure virtual fields are serialized
trainingApplicationSchema.set('toJSON', { virtuals: true });
trainingApplicationSchema.set('toObject', { virtuals: true });

// Pre-save middleware to update reviewedAt when status changes
trainingApplicationSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status !== 'pending') {
    this.reviewedAt = new Date();
  }
  next();
});

// Validation middleware for dates
trainingApplicationSchema.pre('save', function(next) {
  if (this.preferredDates && this.preferredDates.startDate && this.preferredDates.endDate) {
    const start = new Date(this.preferredDates.startDate);
    const end = new Date(this.preferredDates.endDate);
    
    if (start >= end) {
      return next(new Error('End date must be after start date'));
    }
  }
  next();
});

const TrainingApplication = mongoose.models.TrainingApplication || mongoose.model('TrainingApplication', trainingApplicationSchema);

export default TrainingApplication;