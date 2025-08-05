import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Career from '@/lib/models/Career';

// GET /api/careers - Get all job postings
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const active = searchParams.get('active');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    
    let query = {};
    
    // Filter by department
    if (department) {
      query.department = department;
    }
    
    // Filter by job type
    if (type) {
      query.type = type;
    }
    
    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Filter by active status
    if (active === 'true') {
      query.isActive = true;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const careers = await Career.find(query)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Career.countDocuments(query);
    
    return NextResponse.json({
      careers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
    
  } catch (error) {
    console.error('Error fetching careers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch careers' },
      { status: 500 }
    );
  }
}

// POST /api/careers - Create a new job posting
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'department', 'location', 'type', 'description', 'responsibilities', 'requirements', 'contactEmail'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    const career = new Career(body);
    await career.save();
    
    return NextResponse.json(career, { status: 201 });
    
  } catch (error) {
    console.error('Error creating career:', error);
    return NextResponse.json(
      { error: 'Failed to create career' },
      { status: 500 }
    );
  }
}