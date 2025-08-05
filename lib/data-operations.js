import dbConnect from './mongoose'
import Product from './models/Product'
import Industry from './models/Industry'
import TrainingCourse from './models/TrainingCourse'
import JobPosting from './models/JobPosting'

// Product operations
export const productOperations = {
  // Get all products with optional filters
  async getAll(filters = {}) {
    await dbConnect()
    return await Product.find(filters).sort({ createdAt: -1 })
  },

  // Get featured products
  async getFeatured(limit = 4) {
    await dbConnect()
    return await Product.find({ featured: true }).limit(limit)
  },

  // Get products by category
  async getByCategory(category, limit = 0) {
    await dbConnect()
    return await Product.find({ category }).limit(limit)
  },

  // Create new product
  async create(productData) {
    await dbConnect()
    return await Product.create(productData)
  },

  // Update product
  async update(id, updateData) {
    await dbConnect()
    return await Product.findByIdAndUpdate(id, updateData, { new: true })
  },

  // Delete product
  async delete(id) {
    await dbConnect()
    return await Product.findByIdAndDelete(id)
  }
}

// Industry operations
export const industryOperations = {
  // Get all industries
  async getAll() {
    await dbConnect()
    return await Industry.find({}).sort({ createdAt: -1 })
  },

  // Get featured industries
  async getFeatured(limit = 3) {
    await dbConnect()
    return await Industry.find({ featured: true }).limit(limit)
  },

  // Get industry by slug
  async getBySlug(slug) {
    await dbConnect()
    return await Industry.findOne({ slug })
  },

  // Create new industry
  async create(industryData) {
    await dbConnect()
    return await Industry.create(industryData)
  },

  // Update industry
  async update(id, updateData) {
    await dbConnect()
    return await Industry.findByIdAndUpdate(id, updateData, { new: true })
  }
}

// Training course operations
export const trainingOperations = {
  // Get all courses with optional filters
  async getAll(filters = {}) {
    await dbConnect()
    return await TrainingCourse.find(filters).sort({ createdAt: -1 })
  },

  // Get featured courses
  async getFeatured(limit = 3) {
    await dbConnect()
    return await TrainingCourse.find({ featured: true }).limit(limit)
  },

  // Get courses by level
  async getByLevel(level) {
    await dbConnect()
    return await TrainingCourse.find({ level })
  },

  // Get course by slug
  async getBySlug(slug) {
    await dbConnect()
    return await TrainingCourse.findOne({ slug })
  },

  // Create new course
  async create(courseData) {
    await dbConnect()
    return await TrainingCourse.create(courseData)
  },

  // Update course
  async update(id, updateData) {
    await dbConnect()
    return await TrainingCourse.findByIdAndUpdate(id, updateData, { new: true })
  },

  // Enroll student in course schedule
  async enrollStudent(courseId, scheduleIndex) {
    await dbConnect()
    const course = await TrainingCourse.findById(courseId)
    if (course && course.schedule[scheduleIndex]) {
      course.schedule[scheduleIndex].enrolledStudents += 1
      return await course.save()
    }
    throw new Error('Course or schedule not found')
  }
}

// Job posting operations
export const jobOperations = {
  // Get all active jobs
  async getActive(filters = {}) {
    await dbConnect()
    return await JobPosting.find({ isActive: true, ...filters }).sort({ createdAt: -1 })
  },

  // Get featured jobs
  async getFeatured(limit = 3) {
    await dbConnect()
    return await JobPosting.find({ featured: true, isActive: true }).limit(limit)
  },

  // Get jobs by department
  async getByDepartment(department) {
    await dbConnect()
    return await JobPosting.find({ department, isActive: true })
  },

  // Get jobs by type
  async getByType(type) {
    await dbConnect()
    return await JobPosting.find({ type, isActive: true })
  },

  // Create new job posting
  async create(jobData) {
    await dbConnect()
    return await JobPosting.create(jobData)
  },

  // Update job posting
  async update(id, updateData) {
    await dbConnect()
    return await JobPosting.findByIdAndUpdate(id, updateData, { new: true })
  },

  // Deactivate job posting
  async deactivate(id) {
    await dbConnect()
    return await JobPosting.findByIdAndUpdate(id, { isActive: false }, { new: true })
  }
}

// General utility functions
export const generalOperations = {
  // Get dashboard stats
  async getDashboardStats() {
    await dbConnect()
    
    const [productCount, industryCount, courseCount, activeJobCount] = await Promise.all([
      Product.countDocuments(),
      Industry.countDocuments(),
      TrainingCourse.countDocuments(),
      JobPosting.countDocuments({ isActive: true })
    ])

    return {
      products: productCount,
      industries: industryCount,
      courses: courseCount,
      activeJobs: activeJobCount
    }
  },

  // Search across all collections
  async globalSearch(searchTerm) {
    await dbConnect()
    
    const searchRegex = new RegExp(searchTerm, 'i')
    
    const [products, industries, courses, jobs] = await Promise.all([
      Product.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { tags: { $in: [searchRegex] } }
        ]
      }).limit(5),
      Industry.find({
        $or: [
          { name: searchRegex },
          { description: searchRegex },
          { services: { $in: [searchRegex] } }
        ]
      }).limit(5),
      TrainingCourse.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex }
        ]
      }).limit(5),
      JobPosting.find({
        isActive: true,
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { skills: { $in: [searchRegex] } }
        ]
      }).limit(5)
    ])

    return {
      products,
      industries,
      courses,
      jobs
    }
  }
}