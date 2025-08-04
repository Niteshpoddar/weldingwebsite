import { NextResponse } from 'next/server';
import { jobsStore } from '../../../../../lib/data-store';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const job = await jobsStore.getById(new ObjectId(params.id));
    
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
    
    // Validate required fields
    if (!jobData.title || !jobData.department || !jobData.location) {
      return NextResponse.json(
        { error: 'Title, department, and location are required' },
        { status: 400 }
      );
    }
    
    const updatedJob = await jobsStore.update(new ObjectId(params.id), jobData);
    
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
    const success = await jobsStore.delete(new ObjectId(params.id));
    
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