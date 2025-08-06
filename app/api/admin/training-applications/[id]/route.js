import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import TrainingApplication from '../../../../../lib/models/TrainingApplication';

// GET - Fetch a specific training application
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const application = await TrainingApplication.findById(params.id);
    
    if (!application) {
      return NextResponse.json(
        { error: 'Training application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(application);
    
  } catch (error) {
    console.error('Error fetching training application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training application' },
      { status: 500 }
    );
  }
}

// PUT - Update a training application (status, admin notes, etc.)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Find and update the application
    const application = await TrainingApplication.findByIdAndUpdate(
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
        { error: 'Training application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(application);
    
  } catch (error) {
    console.error('Error updating training application:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update training application' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a training application
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const application = await TrainingApplication.findByIdAndDelete(params.id);
    
    if (!application) {
      return NextResponse.json(
        { error: 'Training application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Training application deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting training application:', error);
    return NextResponse.json(
      { error: 'Failed to delete training application' },
      { status: 500 }
    );
  }
}