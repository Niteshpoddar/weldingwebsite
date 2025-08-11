# Welding Website - Industrial Roller Manufacturing

A professional website for Gujarat's leading industrial roller manufacturer, built with Next.js, featuring job applications, training programs, and product showcases.

## 🚀 Features

- **Job Applications**: Resume upload with Cloudinary integration
- **Training Programs**: Course registration with document management
- **Contact Forms**: Professional inquiry system
- **Admin Dashboard**: Application management and analytics
- **Responsive Design**: Mobile-optimized interface
- **Cloud Storage**: Secure file management with Cloudinary

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **File Storage**: Cloudinary
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS with custom design system
- **Deployment**: Vercel (recommended) or any hosting platform

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database
- Cloudinary account
- Git

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weldingwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGO_URL=your_mongodb_connection_string
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Admin Authentication (optional)
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=secure_password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Add environment variables
   - Deploy!

### Option 2: Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `.next`
3. **Environment variables**: Same as `.env.local`

### Option 3: Traditional Hosting

1. **Build the project**
   ```bash
   npm run build
   npm run export
   ```

2. **Upload files** to your web server
3. **Configure environment variables** on your server

## 📱 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URL` | MongoDB connection string | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `ADMIN_EMAIL` | Admin login email | ❌ |
| `ADMIN_PASSWORD` | Admin login password | ❌ |

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB Atlas account or use local MongoDB
2. Create a database for your application
3. Get the connection string
4. Add to environment variables

### Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and secret
3. Add to environment variables
4. Configure upload presets if needed

## 📁 Project Structure

```
weldingwebsite/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── careers/           # Careers page
│   ├── training/          # Training page
│   └── ...
├── components/             # React components
├── lib/                   # Utility functions
├── models/                # Database models
├── public/                # Static assets
└── ...
```

## 🚀 Quick Deploy Commands

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all files
git add .

# 3. Initial commit
git commit -m "Initial commit: Welding website"

# 4. Add remote origin (replace with your repo URL)
git remote add origin https://github.com/yourusername/weldingwebsite.git

# 5. Push to GitHub
git push -u origin main

# 6. Deploy to Vercel
# - Go to vercel.com
# - Import from GitHub
# - Add environment variables
# - Deploy!
```

## 🔒 Security Notes

- Never commit `.env.local` files
- Use strong passwords for admin accounts
- Enable MongoDB network access restrictions
- Configure Cloudinary upload restrictions

## 📞 Support

For deployment issues or questions:
1. Check the [Next.js deployment guide](https://nextjs.org/docs/deployment)
2. Review [Vercel documentation](https://vercel.com/docs)
3. Check MongoDB and Cloudinary setup guides

## 🎯 Next Steps After Deployment

1. **Set up custom domain** (if desired)
2. **Configure SSL certificates**
3. **Set up monitoring and analytics**
4. **Configure backup strategies**
5. **Set up CI/CD pipelines**

---

**Happy Deploying! 🚀**
