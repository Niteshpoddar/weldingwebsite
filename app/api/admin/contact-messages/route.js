import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/db'
import ContactMessage from '../../../../lib/models/ContactMessage'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Build query
    let query = {}
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (status) {
      query.status = status
    }
    
    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1
    
    // Get total count for pagination
    const total = await ContactMessage.countDocuments(query)
    
    // Get messages with pagination
    const messages = await ContactMessage.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
    
    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  try {
    await dbConnect()
    
    const { id, status, notes, reviewedBy } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      )
    }
    
    const updateData = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (reviewedBy) {
      updateData.reviewedBy = reviewedBy
      updateData.reviewedAt = new Date()
    }
    
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
    
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: message
    })
  } catch (error) {
    console.error('Error updating contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    )
  }
}