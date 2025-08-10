import { NextResponse } from 'next/server';
import Job from '../../../../models/jobmodels';
import { connectToDatabase } from '../../../../dbconfig/dbconfig';
import mongoose from 'mongoose';

// Helper function to convert string ID to ObjectId or keep as string
function parseId(id) {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    // If it's not a valid ObjectId, treat it as a string ID (for fallback mode)
    return id;
  }
}

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const job = await Job.findOne({ _id : parseId(params.id)});
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const jobData = await request.json();
    const {
        title,
        department,
        location,
        type,
        experience,
        description,
        requirements,
      } = jobData;
      
      // Validate required fields
      if (!title || !department || !location) {
        return NextResponse.json(
          { error: 'Title, department, and location are required' },
          { status: 400 }
        );
      }
      await connectToDatabase();
      const updatedJob = await Job.findOneAndUpdate({ _id : parseId(params.id)},jobData,{ new: true, runValidators: true } );


    
    
    if (updatedJob) {
      return NextResponse.json(updatedJob);
    } else {
      return NextResponse.json(
        { error: 'Job not found or failed to update' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const success = await Job.findOneAndDelete(parseId(params.id));
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Job not found or failed to delete' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
