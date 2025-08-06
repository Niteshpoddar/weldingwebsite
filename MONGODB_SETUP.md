# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for the welding company admin system.

## Prerequisites

- A MongoDB Atlas account (free tier available)
- Node.js and npm installed
- The application code

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" to create a free account
3. Fill in your details and create an account

## Step 2: Create a Cluster

1. **Choose a Plan:**
   - Select "FREE" tier (M0)
   - Click "Create"

2. **Configure Cluster:**
   - **Cloud Provider:** Choose AWS, Google Cloud, or Azure
   - **Region:** Select a region close to your users
   - **Cluster Name:** Use default or create a custom name
   - Click "Create"

## Step 3: Set Up Database Access

1. **Create Database User:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - **Username:** Create a username (e.g., `admin`)
   - **Password:** Create a strong password
   - **Database User Privileges:** Select "Read and write to any database"
   - Click "Add User"

2. **Note down the credentials:**
   - Username: `admin` (or your chosen username)
   - Password: `your_password`

## Step 4: Set Up Network Access

1. **Configure IP Access:**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses
   - Click "Confirm"

## Step 5: Get Connection String

1. **Get Connection String:**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

2. **Format the Connection String:**
   ```
   mongodb+srv://admin:your_password@cluster0.xxxxx.mongodb.net/welding_company?retryWrites=true&w=majority
   ```

## Step 6: Configure Environment Variables

1. **Create `.env.local` file:**
   ```bash
   touch .env.local
   ```

2. **Add your configuration:**
   ```env
   MONGODB_URI=mongodb+srv://admin:your_password@cluster0.xxxxx.mongodb.net/welding_company?retryWrites=true&w=majority
   ADMIN_EMAIL=admin@weldingcompany.com
   ADMIN_PASSWORD=admin123
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. **Replace placeholders:**
   - Replace `admin` with your database username
   - Replace `your_password` with your database password
   - Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL

## Step 7: Test the Connection

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the API:**
   ```bash
   curl http://localhost:3000/api/admin/jobs
   ```

3. **Check MongoDB Atlas:**
   - Go to your cluster in MongoDB Atlas
   - Click "Browse Collections"
   - You should see a `welding_company` database with `jobs` and `trainings` collections

## Database Schema

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  department: String,
  location: String,
  type: String,
  experience: String,
  description: String,
  requirements: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Trainings Collection
```javascript
{
  _id: ObjectId,
  name: String,
  duration: String,
  level: String,
  description: String,
  topics: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Connection Issues
1. **Check connection string format:**
   - Ensure username and password are URL-encoded
   - Verify the cluster URL is correct

2. **Network access:**
   - Ensure your IP is whitelisted in MongoDB Atlas
   - For development, use "Allow Access from Anywhere"

3. **Database user permissions:**
   - Ensure the database user has "Read and write to any database" privileges

### Data Issues
1. **Collections not created:**
   - The application automatically creates collections when first accessed
   - Check the browser console for any errors

2. **Sample data not loading:**
   - Collections are initialized with sample data when empty
   - Check the application logs for initialization errors

## Security Best Practices

### For Production
1. **Use environment variables:**
   - Never commit `.env.local` to version control
   - Use different credentials for production

2. **Network security:**
   - Whitelist only necessary IP addresses
   - Use VPC peering for enhanced security

3. **Database user:**
   - Create a dedicated user for the application
   - Use the principle of least privilege

4. **Connection string:**
   - Use environment variables for the connection string
   - Rotate passwords regularly

## Monitoring

### MongoDB Atlas Dashboard
- Monitor database performance
- Check connection metrics
- Review query performance

### Application Logs
- Check console logs for database errors
- Monitor API response times
- Track database operation success rates

## Backup and Recovery

### MongoDB Atlas Backups
- Free tier includes daily backups
- Paid tiers offer more frequent backups
- Test restore procedures regularly

### Application Data
- Export data regularly using MongoDB tools
- Keep application backups separate from database backups
- Test recovery procedures

## Scaling Considerations

### Free Tier Limitations
- 512MB storage
- Shared RAM and vCPU
- Limited operations per second

### Upgrading
- Monitor usage in MongoDB Atlas dashboard
- Upgrade when approaching limits
- Consider dedicated clusters for high traffic

## Support Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)