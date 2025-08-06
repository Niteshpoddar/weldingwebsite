import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import ContactMessage from '../../../../../lib/models/ContactMessage';

// GET - Fetch a specific contact message
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const message = await ContactMessage.findById(params.id);
    
    if (!message) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(message);
    
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact message' },
      { status: 500 }
    );
  }
}

// PUT - Update a contact message (status, admin response, etc.)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Prepare update object
    const updateData = { ...body };
    
    // Update readAt when status changes to read
    if (body.status === 'read' && !body.readAt) {
      updateData.readAt = new Date();
    }
    
    // Update resolvedAt when status changes to resolved
    if (body.status === 'resolved' && !body.resolvedAt) {
      updateData.resolvedAt = new Date();
    }
    
    // Update admin response timestamp
    if (body.adminResponse && body.adminResponse.message) {
      updateData.adminResponse = {
        ...body.adminResponse,
        respondedAt: new Date(),
        respondedBy: body.adminResponse.respondedBy || 'Admin'
      };
    }
    
    // Find and update the message
    const message = await ContactMessage.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!message) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(message);
    
  } catch (error) {
    console.error('Error updating contact message:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update contact message' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a contact message
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const message = await ContactMessage.findByIdAndDelete(params.id);
    
    if (!message) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Contact message deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact message' },
      { status: 500 }
    );
  }
}