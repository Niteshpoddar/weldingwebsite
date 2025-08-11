import { NextResponse } from 'next/server'
import cloudinary from '../../../lib/cloudinary.js'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type - focus on PDF for better compatibility
    const allowedTypes = ['application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Only PDF documents are allowed for optimal viewing' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'resumes',
          format: 'pdf',
          public_id: `resume_${Date.now()}`,
          overwrite: true
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return NextResponse.json({
      success: true,
      cloudinaryId: result.public_id,
      url: result.secure_url,
      filename: file.name,
      message: 'File uploaded to Cloudinary successfully'
    })
  } catch (error) {
    console.error('File upload error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'File upload failed'
    if (error.message.includes('CLOUDINARY')) {
      errorMessage = 'Cloudinary configuration error. Please check your credentials.'
    } else if (error.message.includes('validation')) {
      errorMessage = 'Invalid file format or size.'
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
