import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Industry from '@/lib/models/Industry';

// GET /api/industries - Get all industries
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    
    let query = {};
    
    // Filter by featured status
    if (featured === 'true') {
      query.featured = true;
    }
    
    const skip = (page - 1) * limit;
    
    const industries = await Industry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Industry.countDocuments(query);
    
    return NextResponse.json({
      industries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
    
  } catch (error) {
    console.error('Error fetching industries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industries' },
      { status: 500 }
    );
  }
}

// POST /api/industries - Create a new industry
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'icon'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    const industry = new Industry(body);
    await industry.save();
    
    return NextResponse.json(industry, { status: 201 });
    
  } catch (error) {
    console.error('Error creating industry:', error);
    return NextResponse.json(
      { error: 'Failed to create industry' },
      { status: 500 }
    );
  }
}