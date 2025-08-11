import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing',
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Missing',
      MONGO_URL: process.env.MONGO_URL ? 'Set' : 'Missing',
      NODE_ENV: process.env.NODE_ENV
    }

    // Try to import cloudinary
    let cloudinaryStatus = 'Not tested'
    try {
      const cloudinary = await import('../../../lib/cloudinary.js')
      cloudinaryStatus = 'Import successful'
    } catch (error) {
      cloudinaryStatus = `Import failed: ${error.message}`
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      cloudinary: cloudinaryStatus,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
