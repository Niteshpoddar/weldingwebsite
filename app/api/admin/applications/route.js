import { NextResponse } from 'next/server';
import { connectDB } from '../../../dbconfig/dbconfig';
import JobApplication from '../../../models/jobApplication';
import TrainingApplication from '../../../models/trainingApplication';
import ContactQuery from '../../../models/contactQuery';

export async function GET() {
  try {
    await connectDB();

    // Fetch all applications and queries
    const [jobApplications, trainingApplications, contactQueries] = await Promise.all([
      JobApplication.find({}).sort({ appliedAt: -1 }),
      TrainingApplication.find({}).sort({ appliedAt: -1 }),
      ContactQuery.find({}).sort({ submittedAt: -1 })
    ]);

    return NextResponse.json({
      jobApplications,
      trainingApplications,
      contactQueries,
      total: {
        jobs: jobApplications.length,
        trainings: trainingApplications.length,
        contacts: contactQueries.length
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const { type, id, status } = await request.json();

    let result;
    switch (type) {
      case 'job':
        result = await JobApplication.findByIdAndUpdate(
          id, 
          { status }, 
          { new: true }
        );
        break;
      case 'training':
        result = await TrainingApplication.findByIdAndUpdate(
          id, 
          { status }, 
          { new: true }
        );
        break;
      case 'contact':
        result = await ContactQuery.findByIdAndUpdate(
          id, 
          { status }, 
          { new: true }
        );
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid application type' },
          { status: 400 }
        );
    }

    if (!result) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json(
      { error: 'Failed to update application status' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { type, id } = await request.json();

    let result;
    switch (type) {
      case 'job':
        result = await JobApplication.findByIdAndDelete(id);
        break;
      case 'training':
        result = await TrainingApplication.findByIdAndDelete(id);
        break;
      case 'contact':
        result = await ContactQuery.findByIdAndDelete(id);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid application type' },
          { status: 400 }
        );
    }

    if (!result) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
