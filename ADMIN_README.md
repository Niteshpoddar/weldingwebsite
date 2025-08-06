# Admin Dashboard for Welding Industry Website

A comprehensive admin dashboard built with Next.js, Tailwind CSS, and MongoDB for managing job applications, training registrations, and contact messages.

## Features

### 🔐 Admin Authentication
- Protected admin routes with middleware
- Simple login system (demo credentials: admin/admin123)
- Session-based authentication

### 📊 Dashboard Overview
- Real-time statistics for all form submissions
- Quick action cards for easy navigation
- Responsive design for mobile and desktop

### 📋 Job Applications Management
- View all job applications submitted via Careers page
- Sort by name, email, position, status, and date
- Search and filter functionality
- Status management (pending, reviewed, shortlisted, rejected, hired)
- Detailed view modal with all application information

### 🎓 Training Applications Management
- Manage training registration requests
- Filter by course, company, and status
- Track participant information
- Status workflow (pending, reviewed, confirmed, cancelled)

### 💬 Contact Messages Management
- View all contact form submissions
- Search by name, email, company, or message content
- Status tracking (unread, read, replied, resolved)
- Full message details in modal view

### 🎨 Modern UI/UX
- Clean, responsive design with Tailwind CSS
- Mobile-friendly interface
- Loading states and error handling
- Intuitive navigation with sidebar

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **UI Components**: Headless UI, Heroicons
- **Database**: MongoDB with Mongoose ODM

## Project Structure

```
├── app/
│   ├── admin/                    # Admin pages
│   │   ├── layout.jsx           # Admin layout wrapper
│   │   ├── page.jsx             # Dashboard overview
│   │   ├── jobs/applications/   # Job applications page
│   │   ├── trainings/applications/ # Training applications page
│   │   └── contact/messages/    # Contact messages page
│   ├── api/
│   │   ├── admin/               # Admin API endpoints
│   │   │   ├── job-applications/
│   │   │   ├── training-applications/
│   │   │   └── contact-messages/
│   │   ├── contact/             # Public contact form API
│   │   ├── job-form/            # Public job application API
│   │   └── training-form/       # Public training form API
│   └── login/                   # Admin login page
├── components/
│   └── admin/                   # Admin-specific components
│       ├── AdminLayout.jsx      # Main admin layout
│       ├── DataTable.jsx        # Reusable data table
│       └── DetailModal.jsx      # Detail view modal
├── lib/
│   ├── db.js                    # MongoDB connection
│   └── models/                  # Mongoose schemas
│       ├── JobApplication.js
│       ├── TrainingRegistration.js
│       └── ContactMessage.js
└── middleware.js                # Route protection
```

## Database Schemas

### JobApplication
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  position: String (required),
  experience: String (required),
  coverLetter: String,
  resume: Object,
  status: String (enum: pending, reviewed, shortlisted, rejected, hired),
  notes: String,
  reviewedBy: String,
  reviewedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### TrainingRegistration
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  company: String (required),
  course: String (required),
  trainingType: String (required),
  participants: String (required),
  message: String,
  status: String (enum: pending, reviewed, confirmed, cancelled),
  notes: String,
  reviewedBy: String,
  reviewedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### ContactMessage
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  company: String,
  message: String (required),
  status: String (enum: unread, read, replied, resolved),
  notes: String,
  reviewedBy: String,
  reviewedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.local.example` to `.env.local` and configure:
```bash
cp .env.local.example .env.local
```

Update the following variables:
- `MONGODB_URI`: Your MongoDB connection string
- `SMTP_*`: Email configuration (if using email functionality)

### 3. Database Setup
Ensure MongoDB is running and accessible. The application will automatically create collections and indexes.

### 4. Run Development Server
```bash
npm run dev
```

### 5. Access Admin Dashboard
- Navigate to `/login`
- Use demo credentials: `admin` / `admin123`
- Access dashboard at `/admin`

## API Endpoints

### Admin Endpoints
- `GET /api/admin/job-applications` - Fetch job applications with pagination/filtering
- `PATCH /api/admin/job-applications` - Update application status
- `GET /api/admin/training-applications` - Fetch training applications
- `PATCH /api/admin/training-applications` - Update training application status
- `GET /api/admin/contact-messages` - Fetch contact messages
- `PATCH /api/admin/contact-messages` - Update message status

### Public Endpoints
- `POST /api/contact` - Submit contact form (saves to DB + sends email)
- `POST /api/job-form` - Submit job application (saves to DB + sends email)
- `POST /api/training-form` - Submit training registration (saves to DB + sends email)

## Features in Detail

### Data Table Component
- **Sorting**: Click column headers to sort
- **Searching**: Real-time search with debouncing
- **Filtering**: Status-based filtering
- **Pagination**: Server-side pagination
- **Status Updates**: Inline status changes
- **Detail View**: Modal with full information

### Security Features
- **Route Protection**: Middleware protects all `/admin/*` routes
- **Session Management**: Cookie-based authentication
- **Input Validation**: Server-side validation for all forms
- **Error Handling**: Comprehensive error handling and logging

### Performance Optimizations
- **Database Indexes**: Optimized queries with proper indexing
- **Pagination**: Server-side pagination to handle large datasets
- **Debounced Search**: Prevents excessive API calls
- **Caching**: MongoDB connection caching

## Customization

### Adding New Status Options
Update the status enums in the respective schema files and update the UI components accordingly.

### Styling
All styling is done with Tailwind CSS. Modify the classes in the components to match your brand colors.

### Authentication
Replace the simple authentication with a proper auth system like NextAuth.js for production use.

## Production Deployment

### Security Considerations
1. **Replace Simple Auth**: Implement proper authentication (NextAuth.js, Auth0, etc.)
2. **Environment Variables**: Use secure environment variables
3. **HTTPS**: Ensure HTTPS in production
4. **Rate Limiting**: Add rate limiting to API endpoints
5. **Input Sanitization**: Add additional input validation

### Performance Optimizations
1. **Database**: Use MongoDB Atlas or similar managed service
2. **Caching**: Implement Redis for session storage
3. **CDN**: Use CDN for static assets
4. **Monitoring**: Add application monitoring

### Additional Features to Consider
1. **Export Functionality**: CSV/Excel export for data
2. **Bulk Actions**: Select multiple items for bulk operations
3. **Email Notifications**: Notify admins of new submissions
4. **Audit Logs**: Track all admin actions
5. **User Management**: Multiple admin users with roles
6. **File Upload**: Resume file storage and management

## Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running and accessible
2. **Environment Variables**: Check all required env vars are set
3. **Port Conflicts**: Ensure port 3000 is available
4. **CORS Issues**: Check API endpoint configurations

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment.

## Support

For issues or questions:
1. Check the console for error messages
2. Verify database connectivity
3. Ensure all dependencies are installed
4. Check environment variable configuration

---

**Note**: This is a demo implementation. For production use, implement proper authentication, security measures, and error handling.