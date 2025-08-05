import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Basic Welding', 'Advanced Welding', 'Safety Training', 'Certification', 'Specialized Techniques']
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  instructor: {
    name: String,
    qualifications: String,
    experience: String
  },
  schedule: [{
    date: Date,
    time: String,
    location: String,
    availableSeats: Number
  }],
  curriculum: [{
    module: String,
    description: String,
    duration: String
  }],
  prerequisites: [{
    type: String
  }],
  certifications: [{
    name: String,
    description: String,
    issuingBody: String
  }],
  maxStudents: {
    type: Number,
    default: 10
  },
  materials: [{
    name: String,
    included: Boolean
  }],
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
trainingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Training || mongoose.model('Training', trainingSchema);