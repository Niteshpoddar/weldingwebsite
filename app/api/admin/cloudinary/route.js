import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import cloudinary from '../../../lib/cloudinary.js'
import { deleteFromCloudinary, getFileInfo } from '../../../lib/cloudinaryUtils.js'

// Middleware to check admin authentication
const checkAdminAuth = async () => {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('adminToken')
  
  if (!adminToken || !adminToken.value) {
    throw new Error('Unauthorized')
  }
  
  // You can add JWT verification here if needed
  return true
}

// GET - Get file information
export async function GET(request) {
  try {
    await checkAdminAuth()
    
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')
    
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID is required' },
        { status: 400 }
      )
    }
    
    const fileInfo = await getFileInfo(publicId)
    
    return NextResponse.json({
      success: true,
      fileInfo
    })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.error('Error getting file info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get file information' },
      { status: 500 }
    )
  }
}

// DELETE - Delete file from Cloudinary
export async function DELETE(request) {
  try {
    await checkAdminAuth()
    
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')
    
    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID is required' },
        { status: 400 }
      )
    }
    
    const result = await deleteFromCloudinary(publicId)
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
      result
    })
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}

// POST - Search files in Cloudinary
export async function POST(request) {
  try {
    await checkAdminAuth()
    
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'search') {
      const body = await request.json()
      const { query, maxResults = 20 } = body
      
      const result = await cloudinary.search
        .expression(query || 'resource_type:image')
        .max_results(maxResults)
        .execute()
      
      return NextResponse.json({
        success: true,
        resources: result.resources,
        totalCount: result.total_count
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.error('Error searching files:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search files' },
      { status: 500 }
    )
  }
}
