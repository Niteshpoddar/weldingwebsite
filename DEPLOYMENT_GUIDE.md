# 🚀 Quick Deployment Guide

## **Step 1: Prepare Your Environment Variables**

Create a `.env.local` file in your project root:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/weldingwebsite
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## **Step 2: Upload to GitHub**

### **Option A: Use the Deployment Script (Recommended)**

**On Mac/Linux:**
```bash
./deploy.sh
```

**On Windows:**
```cmd
deploy.bat
```

### **Option B: Manual Git Commands**

```bash
# Initialize Git (if not done)
git init

# Add your GitHub repository
git remote add origin https://github.com/yourusername/weldingwebsite.git

# Add and commit files
git add .
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

## **Step 3: Deploy to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Add Environment Variables:**
   - `MONGO_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
6. **Click "Deploy"**

## **Step 4: Configure Your Domain (Optional)**

1. **In Vercel dashboard, go to your project**
2. **Click "Settings" → "Domains"**
3. **Add your custom domain**
4. **Update DNS records as instructed**

## **🎯 That's It! Your website is now live!**

---

## **🔧 Troubleshooting**

### **Build Errors**
- Check if all dependencies are installed: `npm install`
- Verify environment variables are correct
- Check console for specific error messages

### **Git Issues**
- Ensure you have Git installed
- Check your GitHub credentials
- Verify repository URL is correct

### **Deployment Issues**
- Check Vercel build logs
- Verify environment variables in Vercel
- Ensure MongoDB and Cloudinary are accessible

## **📞 Need Help?**

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- **Cloudinary**: [cloudinary.com](https://cloudinary.com)

---

**Happy Deploying! 🚀**
