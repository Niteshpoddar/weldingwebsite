import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import JobApplication from '../../../../../lib/models/JobApplication';

// GET - Fetch a specific job application
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const application = await JobApplication.findById(params.id);
    
    if (!application) {
      return NextResponse.json(
        { error: 'Job application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(application);
    
  } catch (error) {
    console.error('Error fetching job application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job application' },
      { status: 500 }
    );
  }
}

// PUT - Update a job application (status, admin notes, etc.)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Find and update the application
    const application = await JobApplication.findByIdAndUpdate(
      params.id,
      {
        ...body,
        // Update reviewedAt if status is being changed
        ...(body.status && body.status !== 'pending' && {
          reviewedAt: new Date(),
          reviewedBy: body.reviewedBy || 'Admin'
        })
      },
      { new: true, runValidators: true }
    );
    
    if (!application) {
      return NextResponse.json(
        { error: 'Job application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(application);
    
  } catch (error) {
    console.error('Error updating job application:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update job application' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a job application
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const application = await JobApplication.findByIdAndDelete(params.id);
    
    if (!application) {
      return NextResponse.json(
        { error: 'Job application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Job application deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting job application:', error);
    return NextResponse.json(
      { error: 'Failed to delete job application' },
      { status: 500 }
    );
  }
}