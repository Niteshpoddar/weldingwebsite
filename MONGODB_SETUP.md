# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your welding industry website.

## Prerequisites

- A MongoDB Atlas account (free tier available)
- Node.js and npm installed
- Your Next.js project ready

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project
4. Build a new cluster (free tier is sufficient for development)

## Step 2: Configure Database Access

1. In your Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create a username and password (save these securely)
4. Set privileges to "Read and write to any database"
5. Click "Add User"

## Step 3: Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add your specific IP addresses

## Step 4: Get Your Connection String

1. Go to "Database" in your Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<dbname>` with your actual values

## Step 5: Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Replace the placeholder with your actual MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/welding-website?retryWrites=true&w=majority
```

## Step 6: Install Dependencies

The MongoDB dependencies are already installed:
- `mongodb` - Official MongoDB driver
- `mongoose` - MongoDB object modeling tool

## Step 7: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the API endpoints:
   - `GET /api/products` - Should return an empty array initially
   - `GET /api/industries` - Should return an empty array initially
   - `GET /api/training` - Should return an empty array initially
   - `GET /api/careers` - Should return an empty array initially

## Step 8: Seed the Database

Run the seed script to populate your database with sample data:

```bash
npm run seed
```

This will create:
- 3 sample products (MIG welder, welding helmet, electrodes)
- 3 sample industries (Automotive, Construction, Oil & Gas)
- 2 sample training courses (Basic Welding, Advanced TIG)
- 2 sample career postings (Senior Engineer, Technician)

## API Endpoints Available

### Products
- `GET /api/products` - Get all products with filtering
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get a specific product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product

### Industries
- `GET /api/industries` - Get all industries with filtering
- `POST /api/industries` - Create a new industry

### Training
- `GET /api/training` - Get all training courses with filtering
- `POST /api/training` - Create a new training course

### Careers
- `GET /api/careers` - Get all job postings with filtering
- `POST /api/careers` - Create a new job posting

## Query Parameters

### Products
- `category` - Filter by product category
- `search` - Search in name, description, or brand
- `limit` - Number of items per page (default: 20)
- `page` - Page number (default: 1)

### Industries
- `featured` - Filter featured industries only
- `limit` - Number of items per page (default: 20)
- `page` - Page number (default: 1)

### Training
- `category` - Filter by training category
- `featured` - Filter featured courses only
- `search` - Search in title or description
- `limit` - Number of items per page (default: 20)
- `page` - Page number (default: 1)

### Careers
- `department` - Filter by department
- `type` - Filter by job type
- `location` - Filter by location
- `active` - Filter active jobs only
- `search` - Search in title, description, or department
- `limit` - Number of items per page (default: 20)
- `page` - Page number (default: 1)

## Data Models

### Product
- `name` - Product name
- `description` - Product description
- `category` - Product category (Welding Equipment, Safety Gear, etc.)
- `price` - Product price
- `sku` - Stock keeping unit (unique)
- `brand` - Product brand
- `images` - Array of image URLs
- `inStock` - Stock availability
- `features` - Array of product features
- `applications` - Array of applications
- `certifications` - Array of certifications
- `specifications` - Map of specifications

### Industry
- `name` - Industry name
- `description` - Industry description
- `icon` - Industry icon
- `services` - Array of services offered
- `caseStudies` - Array of case studies
- `testimonials` - Array of client testimonials
- `featured` - Featured industry flag

### Training
- `title` - Course title
- `description` - Course description
- `category` - Course category
- `duration` - Course duration
- `price` - Course price
- `instructor` - Instructor information
- `schedule` - Array of scheduled sessions
- `curriculum` - Array of course modules
- `prerequisites` - Array of prerequisites
- `certifications` - Array of certifications offered
- `materials` - Array of included materials
- `featured` - Featured course flag

### Career
- `title` - Job title
- `department` - Department
- `location` - Job location
- `type` - Job type (Full-time, Part-time, etc.)
- `description` - Job description
- `responsibilities` - Array of responsibilities
- `requirements` - Array of requirements
- `qualifications` - Qualification details
- `benefits` - Array of benefits
- `salary` - Salary range
- `isRemote` - Remote work flag
- `isActive` - Active job posting flag
- `contactEmail` - Contact email

## Troubleshooting

### Connection Issues
- Verify your connection string is correct
- Check that your IP address is whitelisted
- Ensure your database user has proper permissions

### Environment Variables
- Make sure `.env.local` exists and has the correct `MONGODB_URI`
- Restart your development server after changing environment variables

### Seed Script Issues
- Ensure MongoDB is connected before running the seed script
- Check that all required fields are provided in the seed data

## Production Deployment

For production deployment:

1. Create a production cluster in MongoDB Atlas
2. Set up proper network access (specific IPs only)
3. Create a production database user with appropriate permissions
4. Set environment variables in your hosting platform
5. Consider using connection pooling for better performance

## Security Best Practices

1. Never commit `.env.local` to version control
2. Use strong passwords for database users
3. Limit network access to specific IP addresses in production
4. Regularly rotate database passwords
5. Monitor database access logs
6. Use environment-specific connection strings

## Support

If you encounter issues:
1. Check the MongoDB Atlas documentation
2. Verify your connection string format
3. Test with a simple connection script
4. Check the browser console and server logs for errors