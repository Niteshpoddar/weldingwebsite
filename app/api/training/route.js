import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import TrainingCourse from '@/lib/models/TrainingCourse'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit')) || 0

    let query = {}
    if (level) query.level = level
    if (featured === 'true') query.featured = true

    const courses = await TrainingCourse.find(query)
      .limit(limit)
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: courses })
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
    const course = await TrainingCourse.create(body)
    
    return NextResponse.json({ success: true, data: course }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}