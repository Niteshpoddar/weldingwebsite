import { NextResponse } from 'next/server';
import Training from '../../../../models/trainingmodels';
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
    const training = await Training.findOne({ _id : parseId(params.id)});
    
    if (!training) {
      return NextResponse.json(
        { error: 'Training not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(training);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch training' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const trainingData = await request.json();
    const {
    name,
    duration,
    level,
    description,
    topics
    }  = trainingData;
    
    // Validate required fields
    if (!name || !level || !topics || !description || !duration) {
      return NextResponse.json(
        { error: 'name, level,topics, description and duration are required' },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const updatedTraining = await Training.findOneAndUpdate({ _id : parseId(params.id)},trainingData,{ new: true, runValidators: true } );


    
    
    if (updatedTraining) {
      return NextResponse.json(updatedTraining);
    } else {
      return NextResponse.json(
        { error: 'Training not found or failed to update' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update training' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const success = await Training.findOneAndDelete(parseId(params.id));
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Training not found or failed to delete' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete training' },
      { status: 500 }
    );
  }
}
