import { NextResponse } from 'next/server';
import { trainingsStore } from '../../../../lib/data-store';

export async function GET() {
  try {
    const trainings = trainingsStore.getAll();
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
    const trainingData = await request.json();
    
    // Validate required fields
    if (!trainingData.name || !trainingData.duration || !trainingData.level) {
      return NextResponse.json(
        { error: 'Name, duration, and level are required' },
        { status: 400 }
      );
    }
    
    const newTraining = trainingsStore.create(trainingData);
    
    if (newTraining) {
      return NextResponse.json(newTraining, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to create training' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create training' },
      { status: 500 }
    );
  }
}