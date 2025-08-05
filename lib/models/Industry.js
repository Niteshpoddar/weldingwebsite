import mongoose from 'mongoose'

const IndustrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  services: [{
    type: String
  }],
  applications: [{
    type: String
  }],
  image: {
    type: String
  },
  caseStudies: [{
    title: String,
    description: String,
    image: String,
    results: String
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.models.Industry || mongoose.model('Industry', IndustrySchema)