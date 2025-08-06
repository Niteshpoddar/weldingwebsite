import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import JobApplication from '../../../../lib/models/JobApplication';

// GET - Fetch all job applications with filtering and pagination
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const position = searchParams.get('position') || '';
    const department = searchParams.get('department') || '';
    const sortBy = searchParams.get('sortBy') || 'submittedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    // Build query object
    const query = {};
    
    // Search functionality
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by position
    if (position) {
      query.position = { $regex: position, $options: 'i' };
    }
    
    // Filter by department
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const applications = await JobApplication.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await JobApplication.countDocuments(query);
    
    // Get unique values for filters
    const positions = await JobApplication.distinct('position');
    const departments = await JobApplication.distinct('department');
    const statuses = await JobApplication.distinct('status');
    
    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage
      },
      filters: {
        positions,
        departments,
        statuses
      }
    });
    
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job applications' },
      { status: 500 }
    );
  }
}

// POST - Create a new job application (for testing purposes)
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Create new application
    const application = new JobApplication({
      ...body,
      ipAddress: ip,
      userAgent: userAgent
    });
    
    await application.save();
    
    return NextResponse.json(application, { status: 201 });
    
  } catch (error) {
    console.error('Error creating job application:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create job application' },
      { status: 500 }
    );
  }
}