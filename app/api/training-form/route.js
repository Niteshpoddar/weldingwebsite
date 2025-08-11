import { NextResponse } from 'next/server'
import { sendTrainingRegistrationEmail } from '../../../lib/mailer'
import { connectToDatabase } from "../../dbconfig/dbconfig";
import TrainingApplication from '../../models/trainingApplication';
import { writeFile } from 'fs/promises'
import path from 'path'

await connectToDatabase();

export async function POST(req) {
  try {
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const company = formData.get("company");
        const course = formData.get("course");
        const trainingType = formData.get("trainingType");
        const participants = formData.get("participants");
        const message = formData.get("message");
        const resume = formData.get("resume");
    

    // Basic validation
    if (!name || !email || !company || !phone || !course || !trainingType || !participants) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 500 }
      )
    }

    let resumeUrl = null;

    // Handle resume upload
    if (resume) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(resume.type)) {
        return NextResponse.json(
          { success: false, error: 'Resume must be a PDF or Word document' },
          { status: 400 }
        )
      }
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'Resume file size must be less than 5MB' },
          { status: 400 }
        )
      }

      try {
        // Generate unique filename
        const timestamp = Date.now()
        const originalName = resume.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filename = `${timestamp}_${originalName}`
        
        // Save file to public/uploads directory
        const bytes = await resume.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        const filepath = path.join(uploadDir, filename)
        
        await writeFile(filepath, buffer)
        resumeUrl = `/uploads/${filename}`
      } catch (uploadError) {
        console.error('Resume upload error:', uploadError)
        return NextResponse.json(
          { success: false, error: 'Failed to upload resume' },
          { status: 500 }
        )
      }
    }

    // Send email
    const emailResult = await sendTrainingRegistrationEmail({
      name,
      email,
      company,
      phone,
      course,
      trainingType,
      participants,
      message,
      resume
    })

    if (emailResult.success) {
      const newTraining = new TrainingApplication({
        fullName: name,
        email,
        companyName: company,
        phone,
        trainingCourse: course,
        trainingFormat: trainingType,
        numberOfParticipants: participants,
        additionalRequirement: message,
        resumeUrl: resumeUrl
      });

      
      await newTraining.save()
      return NextResponse.json({
        success: true,
        message: 'Training registration submitted successfully'
      })
    } else {
      console.error('Email sending failed:', emailResult.error)
      return NextResponse.json(
        { success: false, error: 'Failed to send registration' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Training form error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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
