import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../dbconfig/dbconfig';
import Training from '../../../models/trainingmodels';

export async function GET() {
  try {
    await connectToDatabase();

    const trainings = await Training.find().lean();
    return NextResponse.json(trainings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trainings' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const TrainingData = await request.json();
    const {
    name,
    duration,
    level,
    description,
    topics
  }= TrainingData;
    
    // Validate required fields
    if (!name || !level || !topics || !description || !duration) {
      return NextResponse.json(
        { error: 'name, level,topics, description and duration are required' },
        { status: 400 }
      );
    }


    
    const newTraining = new Training({
    name,
    duration,
    level,
    description,
    topics
  })

    const saveTraining = await newTraining.save()
    
    if (newTraining) {
      return NextResponse.json(saveTraining, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Failed to create Training' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create Training' },
      { status: 500 }
    );
  }
}

