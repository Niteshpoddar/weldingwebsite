import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../dbconfig/dbconfig';
import Job from '../../../models/jobmodels';

export async function GET() {
  try {
    await connectToDatabase();

    const jobs = await Job.find().lean();
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


    
    const newJob = new Job({
            title,
            department,
            location,
            type,
            experience,
            description,
            requirements,
            })

    const saveJob = await newJob.save()
    
    if (newJob) {
      return NextResponse.json(saveJob, { status: 200 });
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

