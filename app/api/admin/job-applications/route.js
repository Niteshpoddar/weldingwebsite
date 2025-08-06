import { NextResponse } from 'next/server'
import dbConnect from '../../../../lib/db'
import JobApplication from '../../../../lib/models/JobApplication'

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
        { position: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (status) {
      query.status = status
    }
    
    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1
    
    // Get total count for pagination
    const total = await JobApplication.countDocuments(query)
    
    // Get applications with pagination
    const applications = await JobApplication.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
    
    return NextResponse.json({
      success: true,
      data: applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching job applications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
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
        { success: false, error: 'Application ID is required' },
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
    
    const application = await JobApplication.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
    
    if (!application) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: application
    })
  } catch (error) {
    console.error('Error updating job application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update application' },
      { status: 500 }
    )
  }
}