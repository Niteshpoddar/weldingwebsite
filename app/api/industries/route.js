import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Industry from '@/lib/models/Industry'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit')) || 0

    let query = {}
    if (featured === 'true') query.featured = true

    const industries = await Industry.find(query)
      .limit(limit)
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: industries })
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
    const industry = await Industry.create(body)
    
    return NextResponse.json({ success: true, data: industry }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}