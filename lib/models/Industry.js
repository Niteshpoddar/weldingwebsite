import mongoose from 'mongoose';

const industrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  services: [{
    name: String,
    description: String
  }],
  caseStudies: [{
    title: String,
    description: String,
    image: String,
    results: String
  }],
  testimonials: [{
    client: String,
    company: String,
    testimonial: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  featured: {
    type: Boolean,
    default: false
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
industrySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Industry || mongoose.model('Industry', industrySchema);