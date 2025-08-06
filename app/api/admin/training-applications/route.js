import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import TrainingApplication from '../../../../lib/models/TrainingApplication';

// GET - Fetch all training applications with filtering and pagination
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const trainingProgram = searchParams.get('trainingProgram') || '';
    const trainingType = searchParams.get('trainingType') || '';
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
        { companyName: { $regex: search, $options: 'i' } },
        { trainingProgram: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by training program
    if (trainingProgram) {
      query.trainingProgram = { $regex: trainingProgram, $options: 'i' };
    }
    
    // Filter by training type
    if (trainingType) {
      query.trainingType = trainingType;
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const applications = await TrainingApplication.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const total = await TrainingApplication.countDocuments(query);
    
    // Get unique values for filters
    const trainingPrograms = await TrainingApplication.distinct('trainingProgram');
    const trainingTypes = await TrainingApplication.distinct('trainingType');
    const statuses = await TrainingApplication.distinct('status');
    
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
        trainingPrograms,
        trainingTypes,
        statuses
      }
    });
    
  } catch (error) {
    console.error('Error fetching training applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training applications' },
      { status: 500 }
    );
  }
}

// POST - Create a new training application (for testing purposes)
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Create new application
    const application = new TrainingApplication({
      ...body,
      ipAddress: ip,
      userAgent: userAgent
    });
    
    await application.save();
    
    return NextResponse.json(application, { status: 201 });
    
  } catch (error) {
    console.error('Error creating training application:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create training application' },
      { status: 500 }
    );
  }
}