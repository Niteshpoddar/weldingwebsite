# MongoDB Atlas Setup Guide for Welding Industry Website

This guide will help you set up MongoDB Atlas and populate your welding industry website with data.

## Prerequisites

- MongoDB Atlas account (free tier available)
- Node.js and npm installed
- Next.js project setup

## Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster:
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region
   - Name your cluster (e.g., "welding-company")

3. Set up database access:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and strong password
   - Set database user privileges to "Read and write to any database"

4. Set up network access:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, you can add "0.0.0.0/0" (allow access from anywhere)
   - For production, use specific IP addresses

## Step 2: Get Connection String

1. Go to "Clusters" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" as driver and version "4.1 or later"
4. Copy the connection string (it looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 3: Configure Environment Variables

1. Update your `.env.local` file with your actual MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/welding-company?retryWrites=true&w=majority
   ```

   Replace:
   - `yourusername` with your database username
   - `yourpassword` with your database password
   - `cluster0.xxxxx` with your actual cluster connection string
   - `welding-company` with your preferred database name

## Step 4: Install Dependencies

The required packages are already installed:
- `mongodb` - MongoDB driver
- `mongoose` - ODM for MongoDB
- `dotenv` - Environment variable loader

## Step 5: Populate Database with Sample Data

Run the seeding script to populate your database with sample welding industry data:

```bash
npm run seed
```

This will create sample data for:
- **Products**: Welding equipment, safety gear, consumables
- **Industries**: Automotive, Construction, Oil & Gas
- **Training Courses**: MIG welding, TIG welding, Inspector certification
- **Job Postings**: Various welding positions

## Step 6: Verify Database Setup

You can verify the setup by:

1. Checking MongoDB Atlas dashboard to see your collections
2. Testing API endpoints:
   ```bash
   # Start your development server
   npm run dev

   # Test endpoints (in another terminal or browser)
   curl http://localhost:3000/api/products
   curl http://localhost:3000/api/industries
   curl http://localhost:3000/api/training
   curl http://localhost:3000/api/jobs
   ```

## Database Schema Overview

### Products Collection
- **Fields**: name, category, description, specifications, price, images, inStock, featured, tags
- **Categories**: welding-equipment, consumables, safety-gear, accessories

### Industries Collection
- **Fields**: name, slug, description, services, applications, image, caseStudies, featured

### Training Courses Collection
- **Fields**: title, slug, description, level, duration, price, curriculum, prerequisites, certification, instructor, schedule, featured

### Job Postings Collection
- **Fields**: title, department, location, type, experience, salary, description, responsibilities, requirements, benefits, skills, isActive, featured

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=welding-equipment` - Filter by category
- `GET /api/products?featured=true` - Get featured products
- `POST /api/products` - Create new product

### Industries
- `GET /api/industries` - Get all industries
- `GET /api/industries?featured=true` - Get featured industries
- `POST /api/industries` - Create new industry

### Training
- `GET /api/training` - Get all courses
- `GET /api/training?level=beginner` - Filter by level
- `GET /api/training?featured=true` - Get featured courses
- `POST /api/training` - Create new course

### Jobs
- `GET /api/jobs` - Get all active jobs
- `GET /api/jobs?department=Engineering` - Filter by department
- `GET /api/jobs?featured=true` - Get featured jobs
- `POST /api/jobs` - Create new job posting

## Using Data in Your Components

Here's how to fetch and use data in your Next.js components:

### Example: Fetching Products

```jsx
// In a page or component
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?featured=true')
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600">${product.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### Example: Server-Side Rendering

```jsx
// For server-side rendering (in pages/ directory)
import { productOperations } from '@/lib/data-operations'

export async function getServerSideProps() {
  try {
    const featuredProducts = await productOperations.getFeatured(6)
    
    return {
      props: {
        products: JSON.parse(JSON.stringify(featuredProducts))
      }
    }
  } catch (error) {
    return {
      props: {
        products: []
      }
    }
  }
}

export default function HomePage({ products }) {
  return (
    <div>
      <h1>Featured Products</h1>
      {/* Render products */}
    </div>
  )
}
```

## Data Management Utilities

Use the provided data operations for common tasks:

```javascript
import { 
  productOperations, 
  industryOperations, 
  trainingOperations, 
  jobOperations 
} from '@/lib/data-operations'

// Examples
const featuredProducts = await productOperations.getFeatured(4)
const weldingEquipment = await productOperations.getByCategory('welding-equipment')
const beginnerCourses = await trainingOperations.getByLevel('beginner')
const engineeringJobs = await jobOperations.getByDepartment('Engineering')
```

## Production Considerations

1. **Security**: 
   - Use specific IP addresses in Network Access for production
   - Create separate database users for different environments
   - Use strong passwords and rotate them regularly

2. **Performance**:
   - Add database indexes for frequently queried fields
   - Use pagination for large result sets
   - Implement caching strategies

3. **Monitoring**:
   - Set up MongoDB Atlas monitoring and alerts
   - Monitor API endpoint performance
   - Log database operations

## Troubleshooting

### Common Issues:

1. **Connection Error**: Check your connection string and network access settings
2. **Authentication Failed**: Verify username/password and database user permissions
3. **No Data**: Run the seed script again or check if the data was created in MongoDB Atlas

### Useful Commands:

```bash
# Re-seed database
npm run seed

# Check MongoDB connection
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.MONGODB_URI)"

# Test database connection
node -e "
require('dotenv').config({path:'.env.local'});
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection failed:', err))
"
```

## Next Steps

1. Customize the data models to match your specific business requirements
2. Add validation and error handling to your API endpoints
3. Implement user authentication and authorization
4. Add search and filtering capabilities
5. Set up automated backups for production data

For questions or issues, refer to the [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/) or [Mongoose Documentation](https://mongoosejs.com/).