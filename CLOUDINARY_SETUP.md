# Cloudinary Setup Guide

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string
```

## 2. Get Cloudinary Credentials

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Replace the placeholder values in your `.env.local` file

## 3. API Endpoints

### Resume Upload with Database Storage
- **POST** `/api/resume-upload`
- Uploads resume to Cloudinary and stores application in database
- Accepts: `file` (PDF only), `fullName`, `email`, `phone`, `yearsOfExperience`, `position`, `coverLetterText`

### Resume Upload Only
- **POST** `/api/resume`
- Uploads resume to Cloudinary only (PDF format preserved)
- Returns Cloudinary URL and ID

## 4. Usage Example

```javascript
// Frontend form submission
const formData = new FormData();
formData.append('file', resumeFile);
formData.append('fullName', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+1234567890');
formData.append('yearsOfExperience', '5');
formData.append('position', 'Software Engineer');
formData.append('coverLetterText', 'I am interested in this position...');

const response = await fetch('/api/resume-upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.resumeUrl); // Cloudinary URL
console.log(result.applicationId); // Database ID
```

## 5. File Management

### Delete Resume
```javascript
import { deleteFromCloudinary } from '../lib/cloudinaryUtils.js';

await deleteFromCloudinary('cloudinary_public_id');
```

### Get File Info
```javascript
import { getFileInfo } from '../lib/cloudinaryUtils.js';

const fileInfo = await getFileInfo('cloudinary_public_id');
```

## 6. Security Features

- File type validation (PDF only for optimal viewing)
- File size limit (5MB max)
- Secure HTTPS URLs from Cloudinary
- Input validation for all form fields
- Error handling and logging

## 7. Database Schema

The resume URL is stored in the `JobApplication` model:

```javascript
resumeUrl: {
  type: String, // Cloudinary secure URL
  required: true,
  trim: true
}
```

## 8. Cloudinary Features

- PDF format preservation (no conversion to images)
- Secure HTTPS delivery
- CDN distribution
- Raw file storage for documents
- Organized folder structure (`resumes/` folder)
