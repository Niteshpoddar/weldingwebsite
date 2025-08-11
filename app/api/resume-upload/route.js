import { NextResponse } from 'next/server'
import cloudinary from '../../../lib/cloudinary.js'
import JobApplication from '../../models/jobApplication.js'
import dbConnect from '../../dbconfig/dbconfig.js'

export async function POST(request) {
  try {
    await dbConnect()
    
    const formData = await request.formData()
    const file = formData.get('file')
    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const yearsOfExperience = formData.get('yearsOfExperience')
    const position = formData.get('position')
    const coverLetterText = formData.get('coverLetterText')
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!fullName || !email || !phone || !yearsOfExperience || !position) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
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
    const cloudinaryResult = await new Promise((resolve, reject) => {
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

    // Create job application in database
    const jobApplication = new JobApplication({
      fullName,
      email,
      phone,
      yearsOfExperience,
      position,
      resumeUrl: cloudinaryResult.secure_url,
      coverLetterText: coverLetterText || '',
      status: 'pending'
    })

    await jobApplication.save()

    return NextResponse.json({
      success: true,
      message: 'Resume uploaded and application submitted successfully',
      applicationId: jobApplication._id,
      resumeUrl: cloudinaryResult.secure_url,
      cloudinaryId: cloudinaryResult.public_id
    })
  } catch (error) {
    console.error('Resume upload error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Resume upload failed'
    if (error.message.includes('CLOUDINARY')) {
      errorMessage = 'Cloudinary configuration error. Please check your credentials.'
    } else if (error.message.includes('MongoDB')) {
      errorMessage = 'Database connection error. Please try again.'
    } else if (error.message.includes('validation')) {
      errorMessage = 'Invalid data provided. Please check your form.'
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
