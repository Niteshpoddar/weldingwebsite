import { NextResponse } from 'next/server';
import { jobsStore } from '../../../../lib/data-store';

export async function GET() {
  try {
    const jobs = await jobsStore.getAll();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const jobData = await request.json();
    
    // Validate required fields
    if (!jobData.title || !jobData.department || !jobData.location) {
      return NextResponse.json(
        { error: 'Title, department, and location are required' },
        { status: 400 }
      );
    }
    
    const newJob = await jobsStore.create(jobData);
    
    if (newJob) {
      return NextResponse.json(newJob, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to create job' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}