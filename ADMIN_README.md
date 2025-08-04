# Admin System Documentation

This document explains the admin functionality for the welding industry website.

## Overview

The admin system allows authorized users to manage job postings and training services for the public website. It includes:

- **Secure Authentication**: Admin-only login with session management
- **Job Management**: Create, edit, and delete job postings
- **Training Management**: Create, edit, and delete training services
- **Route Protection**: Middleware ensures only authenticated admins can access admin pages
- **Data Persistence**: JSON file-based storage with automatic initialization

## Admin Credentials

**Email**: `admin@weldingcompany.com`  
**Password**: `admin123`

> **Note**: In production, these credentials should be moved to environment variables.

## Admin Routes

### Authentication
- `/login` - Admin login page
- `/api/admin-login` - Login API endpoint
- `/api/admin-logout` - Logout API endpoint

### Dashboard
- `/admin/dashboard` - Main admin dashboard with statistics and quick actions

### Job Management
- `/admin/jobs` - List all job postings
- `/admin/jobs/new` - Create new job posting
- `/admin/jobs/[id]/edit` - Edit existing job posting

### Training Management
- `/admin/trainings` - List all training services
- `/admin/trainings/new` - Create new training service
- `/admin/trainings/[id]/edit` - Edit existing training service

## API Endpoints

### Jobs API
- `GET /api/admin/jobs` - Get all jobs
- `POST /api/admin/jobs` - Create new job
- `GET /api/admin/jobs/[id]` - Get specific job
- `PUT /api/admin/jobs/[id]` - Update job
- `DELETE /api/admin/jobs/[id]` - Delete job

### Trainings API
- `GET /api/admin/trainings` - Get all trainings
- `POST /api/admin/trainings` - Create new training
- `GET /api/admin/trainings/[id]` - Get specific training
- `PUT /api/admin/trainings/[id]` - Update training
- `DELETE /api/admin/trainings/[id]` - Delete training

## Data Structure

### Job Object
```json
{
  "id": 1,
  "title": "Sales Engineer",
  "department": "Sales",
  "location": "Ahmedabad / Field",
  "type": "Full-time",
  "experience": "2+ years",
  "description": "Drive sales growth in industrial roller markets...",
  "requirements": ["Diploma/Degree in Engineering", "2+ years sales experience"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Training Object
```json
{
  "id": 1,
  "name": "Installation & Commissioning",
  "duration": "On-site",
  "level": "Technical",
  "description": "Professional installation supervision...",
  "topics": ["Roller Installation", "Alignment Procedures"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Security Features

### Route Protection
The middleware (`middleware.js`) protects all admin routes:
- Checks for valid admin session cookie
- Redirects unauthenticated users to login
- Protects both admin pages and API endpoints

### Session Management
- Uses HTTP-only cookies for session storage
- 24-hour session duration
- Secure cookie settings for production

## Data Storage

### File Structure
```
data/
├── jobs.json      # Job postings data
└── trainings.json # Training services data
```

### Automatic Initialization
The data store automatically:
- Creates the `data/` directory if it doesn't exist
- Initializes JSON files with sample data if they don't exist
- Handles file read/write operations with error handling

## Public Pages Integration

### Careers Page (`/careers`)
- Fetches job data from `/api/admin/jobs`
- Displays all active job postings
- Maintains existing UI design

### Training Page (`/training`)
- Fetches training data from `/api/admin/trainings`
- Displays all available training services
- Maintains existing UI design

## Usage Instructions

### 1. Access Admin Panel
1. Navigate to `/login`
2. Enter admin credentials
3. You'll be redirected to `/admin/dashboard`

### 2. Manage Jobs
1. Go to `/admin/jobs`
2. Click "Add New Job" to create a job posting
3. Fill in all required fields (title, department, location)
4. Add job requirements as needed
5. Click "Create Job" to save

### 3. Manage Training Services
1. Go to `/admin/trainings`
2. Click "Add New Training" to create a training service
3. Fill in all required fields (name, duration, level)
4. Add key topics as needed
5. Click "Create Training" to save

### 4. Edit Content
- Click the edit icon (pencil) next to any job or training
- Modify the fields as needed
- Click "Update" to save changes

### 5. Delete Content
- Click the delete icon (trash) next to any job or training
- Confirm the deletion
- The item will be permanently removed

## Development Notes

### Environment Variables
For production, consider adding:
```env
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Database Integration
The current implementation uses JSON files for simplicity. For production, consider:
- PostgreSQL or MongoDB for data storage
- User authentication with NextAuth.js or similar
- Role-based access control for multiple admins

### Security Enhancements
- Implement rate limiting on login attempts
- Add CSRF protection
- Use environment variables for all credentials
- Implement proper password hashing
- Add audit logging for admin actions

## Troubleshooting

### Common Issues

1. **Can't access admin pages**
   - Ensure you're logged in with correct credentials
   - Check browser cookies are enabled
   - Clear browser cache if needed

2. **Data not saving**
   - Check file permissions on `data/` directory
   - Ensure the application has write access
   - Check console for error messages

3. **Public pages not showing data**
   - Verify API endpoints are working
   - Check network requests in browser dev tools
   - Ensure data files exist and are valid JSON

### Debug Mode
Add `console.log` statements in the data store functions to debug data operations:
```javascript
// In lib/data-store.js
function writeJobs(jobs) {
  try {
    console.log('Writing jobs:', jobs);
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing jobs file:', error);
    return false;
  }
}
```