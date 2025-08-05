import mongoose from 'mongoose'

const TrainingCourseSchema = new mongoose.Schema({
  title: {
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
  level: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  curriculum: [{
    module: String,
    topics: [String]
  }],
  prerequisites: [{
    type: String
  }],
  certification: {
    type: String
  },
  instructor: {
    name: String,
    bio: String,
    image: String
  },
  schedule: [{
    startDate: Date,
    endDate: Date,
    location: String,
    maxStudents: Number,
    enrolledStudents: { type: Number, default: 0 }
  }],
  image: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.models.TrainingCourse || mongoose.model('TrainingCourse', TrainingCourseSchema)