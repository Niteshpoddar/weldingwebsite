import { NextResponse } from 'next/server'
import { sendJobApplicationEmail } from '../../../lib/mailer'
import JobApplication from '../../models/jobApplication'
import { connectToDatabase } from "../../dbconfig/dbconfig";

await connectToDatabase();

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const position = formData.get('position')
    const experience = formData.get('experience')
    const coverLetter = formData.get('coverLetter')
    const resume = formData.get('resume')

    // Basic validation
    if (!name || !email || !phone || !position) {
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
        { status: 400 }
      )
    }

    // File validation
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
    }

    // Send email
    const emailResult = await sendJobApplicationEmail({
      name,
      email,
      phone,
      position,
      experience,
      coverLetter,
      resume
    })

    if (emailResult.success) {
      const newJob = new JobApplication({
        fullName: name,
        email,
        phone,
        position,
        yearsOfExperience: experience,
        coverLetterText: coverLetter,
        // resumeUrl: resumeUrl // the URL after upload
      });

      await newJob.save()
      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully'
      })
    } else {
      console.error('Email sending failed:', emailResult.error)
      return NextResponse.json(
        { success: false, error: 'Failed to submit application' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Job form error:', error)
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
