import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Training from '@/lib/models/Training';

// GET /api/training - Get all training courses
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by featured status
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const training = await Training.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Training.countDocuments(query);
    
    return NextResponse.json({
      training,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
    
  } catch (error) {
    console.error('Error fetching training courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training courses' },
      { status: 500 }
    );
  }
}

// POST /api/training - Create a new training course
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'duration', 'price', 'image'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    const training = new Training(body);
    await training.save();
    
    return NextResponse.json(training, { status: 201 });
    
  } catch (error) {
    console.error('Error creating training course:', error);
    return NextResponse.json(
      { error: 'Failed to create training course' },
      { status: 500 }
    );
  }
}