# Admin Backend System Documentation

## 📋 Overview

This admin backend system provides comprehensive management capabilities for job applications, training registrations, and contact messages from your welding industry website. Built with Next.js App Router, MongoDB/Mongoose, and Tailwind CSS.

## 🏗️ Architecture

### Folder Structure
```
├── app/
│   ├── admin/
│   │   ├── jobs/
│   │   │   └── applications/          # Job applications management
│   │   ├── trainings/
│   │   │   └── applications/          # Training applications management
│   │   └── contact/
│   │       └── messages/              # Contact messages management
│   └── api/admin/
│       ├── job-applications/          # Job applications API
│       ├── training-applications/     # Training applications API
│       └── contact-messages/          # Contact messages API
├── lib/
│   ├── models/                        # MongoDB schemas
│   │   ├── JobApplication.js
│   │   ├── TrainingApplication.js
│   │   └── ContactMessage.js
│   └── mongodb.js                     # Database connection
└── middleware.js                      # Route protection
```

## 🗄️ Database Schemas

### JobApplication Schema
```javascript
{
  // Personal Information
  firstName: String (required),
  lastName: String (required),
  email: String (required, validated),
  phone: String (required, validated),
  
  // Job Details
  position: String (required),
  department: String (required),
  experience: String (enum: ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']),
  education: String (enum: ['High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Other']),
  skills: [String],
  
  // Additional Info
  message: String (max 1000 chars),
  resumeUrl: String,
  
  // Status Management
  status: String (enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired']),
  adminNotes: String (max 500 chars),
  
  // Metadata
  submittedAt: Date (default: now),
  reviewedAt: Date,
  reviewedBy: String,
  
  // Security
  ipAddress: String,
  userAgent: String
}
```

### TrainingApplication Schema
```javascript
{
  // Personal Information
  firstName: String (required),
  lastName: String (required),
  email: String (required, validated),
  phone: String (required, validated),
  
  // Company Information
  companyName: String (required),
  companySize: String (enum: ['1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '500+ employees']),
  
  // Training Details
  trainingProgram: String (required),
  trainingType: String (enum: ['On-site', 'Online', 'Hybrid', 'Workshop', 'Certification']),
  participants: Number (required, min: 1, max: 100),
  
  // Scheduling
  preferredDates: {
    startDate: Date (required),
    endDate: Date (required)
  },
  
  // Additional Info
  specialRequirements: String (max 500 chars),
  objectives: [String],
  
  // Status Management
  status: String (enum: ['pending', 'reviewed', 'confirmed', 'scheduled', 'completed', 'cancelled']),
  adminNotes: String (max 500 chars),
  
  // Scheduling Info
  scheduledDate: Date,
  trainer: String,
  location: String,
  
  // Metadata
  submittedAt: Date (default: now),
  reviewedAt: Date,
  reviewedBy: String,
  
  // Security
  ipAddress: String,
  userAgent: String
}
```

### ContactMessage Schema
```javascript
{
  // Personal Information
  firstName: String (required),
  lastName: String (required),
  email: String (required, validated),
  phone: String (optional, validated),
  
  // Company Information
  companyName: String (optional),
  industry: String (optional),
  
  // Message Details
  subject: String (required, max 200 chars),
  message: String (required, max 2000 chars),
  inquiryType: String (enum: ['General Inquiry', 'Product Information', 'Service Request', 'Quote Request', 'Technical Support', 'Partnership', 'Other']),
  
  // Priority & Status
  priority: String (enum: ['low', 'medium', 'high', 'urgent']),
  status: String (enum: ['new', 'read', 'in-progress', 'resolved', 'closed']),
  
  // Admin Response
  adminResponse: {
    message: String (max 1000 chars),
    respondedAt: Date,
    respondedBy: String
  },
  
  // Follow-up
  followUpRequired: Boolean,
  followUpDate: Date,
  followUpNotes: String (max 500 chars),
  
  // Categorization
  tags: [String],
  
  // Metadata
  submittedAt: Date (default: now),
  readAt: Date,
  resolvedAt: Date,
  resolvedBy: String,
  
  // Security & Tracking
  ipAddress: String,
  userAgent: String,
  referrer: String,
  source: String (enum: ['contact-form', 'email', 'phone', 'social-media', 'other'])
}
```

## 🔌 API Endpoints

### Job Applications
- `GET /api/admin/job-applications` - List all applications with filtering
- `POST /api/admin/job-applications` - Create new application
- `GET /api/admin/job-applications/[id]` - Get specific application
- `PUT /api/admin/job-applications/[id]` - Update application
- `DELETE /api/admin/job-applications/[id]` - Delete application

### Training Applications
- `GET /api/admin/training-applications` - List all applications with filtering
- `POST /api/admin/training-applications` - Create new application
- `GET /api/admin/training-applications/[id]` - Get specific application
- `PUT /api/admin/training-applications/[id]` - Update application
- `DELETE /api/admin/training-applications/[id]` - Delete application

### Contact Messages
- `GET /api/admin/contact-messages` - List all messages with filtering
- `POST /api/admin/contact-messages` - Create new message
- `GET /api/admin/contact-messages/[id]` - Get specific message
- `PUT /api/admin/contact-messages/[id]` - Update message
- `DELETE /api/admin/contact-messages/[id]` - Delete message

## 🔍 Query Parameters

All list endpoints support these query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search across multiple fields
- `status` - Filter by status
- `sortBy` - Sort field (default: submittedAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

### Job Applications Specific Filters
- `position` - Filter by job position
- `department` - Filter by department

### Training Applications Specific Filters
- `trainingProgram` - Filter by training program
- `trainingType` - Filter by training type

### Contact Messages Specific Filters
- `inquiryType` - Filter by inquiry type
- `priority` - Filter by priority level

## 🎨 Admin Pages Features

### Common Features Across All Pages
- ✅ **Responsive Design** - Works on all devices
- ✅ **Advanced Filtering** - Multiple filter options
- ✅ **Search Functionality** - Search across multiple fields
- ✅ **Sorting** - Click column headers to sort
- ✅ **Pagination** - Navigate through large datasets
- ✅ **Status Management** - Quick status updates
- ✅ **Details Modal** - View full application/message details
- ✅ **CSV Export** - Export filtered data to CSV
- ✅ **Delete Functionality** - Remove entries with confirmation
- ✅ **Loading States** - Smooth user experience
- ✅ **Error Handling** - Graceful error management

### Job Applications Page (`/admin/jobs/applications`)
- **Filters**: Status, Position, Department
- **Columns**: Name, Contact, Position, Experience, Status, Submitted Date
- **Quick Actions**: View Details, Mark as Reviewed, Delete
- **Details Modal**: Full application information including skills, education, resume

### Training Applications Page (`/admin/trainings/applications`)
- **Filters**: Status, Training Program, Training Type
- **Columns**: Contact, Company, Training Program, Details (participants/dates), Status, Submitted Date
- **Quick Actions**: View Details, Mark as Reviewed, Delete
- **Details Modal**: Full training request including objectives, special requirements, scheduling

### Contact Messages Page (`/admin/contact/messages`)
- **Filters**: Status, Inquiry Type, Priority
- **Columns**: Contact, Subject, Inquiry Type, Priority, Status, Submitted Date
- **Quick Actions**: View Details, Mark as Read, Delete
- **Priority Indicators**: Visual indicators for urgent messages
- **Details Modal**: Full message with admin response capability

## 🔒 Security Features

### Route Protection
```javascript
// middleware.js
export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const adminSession = request.cookies.get('admin-session');
    if (!adminSession || adminSession.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}
```

### Data Validation
- **MongoDB Schema Validation** - Enforced at database level
- **Input Sanitization** - Automatic trimming and validation
- **Email Validation** - Regex pattern validation
- **Phone Validation** - International phone number support
- **XSS Protection** - Content sanitization

### Security Headers
- **HTTP-Only Cookies** - Session management
- **CSRF Protection** - Built-in Next.js protection
- **IP Tracking** - Store client IP for security
- **User Agent Tracking** - Store browser information

## 📊 Data Management

### Status Workflows

#### Job Applications
```
pending → reviewed → shortlisted → hired
                ↓
            rejected
```

#### Training Applications
```
pending → reviewed → confirmed → scheduled → completed
                ↓
            cancelled
```

#### Contact Messages
```
new → read → in-progress → resolved
    ↓
closed
```

### Priority Levels (Contact Messages)
- **Low** - General inquiries
- **Medium** - Product information requests
- **High** - Service requests, quote requests
- **Urgent** - Technical support, immediate assistance needed

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install mongoose
```

### 2. Set Up Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=secure_password
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Database Connection
```javascript
// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

### 4. Access Admin Pages
- Login at `/login`
- Navigate to admin pages:
  - `/admin/jobs/applications`
  - `/admin/trainings/applications`
  - `/admin/contact/messages`

## 🎯 Best Practices

### Performance
- **Database Indexing** - Optimized queries with proper indexes
- **Pagination** - Limit data transfer with pagination
- **Lazy Loading** - Load data only when needed
- **Caching** - Implement caching for frequently accessed data

### User Experience
- **Loading States** - Show loading indicators during operations
- **Error Handling** - Graceful error messages
- **Confirmation Dialogs** - Confirm destructive actions
- **Keyboard Navigation** - Support keyboard shortcuts

### Data Integrity
- **Validation** - Client and server-side validation
- **Sanitization** - Clean user inputs
- **Audit Trail** - Track changes and timestamps
- **Backup Strategy** - Regular database backups

## 🔧 Customization

### Adding New Fields
1. Update the MongoDB schema
2. Modify the admin page components
3. Update API endpoints
4. Add validation rules

### Custom Filters
1. Add filter state in the page component
2. Update the API endpoint to handle new filters
3. Add filter UI elements
4. Update the query building logic

### Custom Statuses
1. Update the schema enum values
2. Add status colors in the component
3. Update status update logic
4. Add any workflow transitions

## 📈 Monitoring & Analytics

### Built-in Metrics
- **Submission Counts** - Track application/message volumes
- **Response Times** - Monitor admin response times
- **Status Distribution** - Analyze workflow efficiency
- **Search Patterns** - Understand user queries

### Recommended Analytics
- **Google Analytics** - Track page usage
- **Database Monitoring** - Monitor query performance
- **Error Tracking** - Implement error logging
- **User Behavior** - Track admin workflow patterns

## 🛠️ Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check MongoDB connection
npm run dev
# Look for connection errors in console
```

#### Authentication Issues
```bash
# Verify environment variables
echo $MONGODB_URI
echo $ADMIN_EMAIL
echo $ADMIN_PASSWORD
```

#### API Endpoint Issues
```bash
# Test API endpoints
curl http://localhost:3000/api/admin/job-applications
```

### Debug Mode
```javascript
// Enable debug logging
console.log('Debug:', { applications, filters, pagination });
```

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify database connection
3. Test API endpoints directly
4. Review environment variables
5. Check MongoDB Atlas dashboard

## 🔄 Updates & Maintenance

### Regular Tasks
- **Database Backups** - Weekly automated backups
- **Security Updates** - Keep dependencies updated
- **Performance Monitoring** - Monitor query performance
- **User Training** - Train admin users on new features

### Version Control
- **Git Workflow** - Use feature branches
- **Code Reviews** - Review all changes
- **Testing** - Test all new features
- **Documentation** - Keep docs updated

---

This admin backend system provides a robust, scalable solution for managing all customer interactions from your welding industry website. The modular design allows for easy customization and extension as your business grows.