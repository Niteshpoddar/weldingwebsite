import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['welding-equipment', 'consumables', 'safety-gear', 'accessories']
  },
  description: {
    type: String,
    required: true
  },
  specifications: {
    type: Object,
    default: {}
  },
  price: {
    type: Number,
    required: true
  },
  images: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)