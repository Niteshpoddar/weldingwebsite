import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import JobPosting from '@/lib/models/JobPosting'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const type = searchParams.get('type')
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')
    const limit = parseInt(searchParams.get('limit')) || 0

    let query = {}
    if (department) query.department = department
    if (type) query.type = type
    if (featured === 'true') query.featured = true
    if (active !== null) query.isActive = active === 'true'

    const jobs = await JobPosting.find(query)
      .limit(limit)
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: jobs })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const job = await JobPosting.create(body)
    
    return NextResponse.json({ success: true, data: job }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}