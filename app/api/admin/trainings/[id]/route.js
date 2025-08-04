import { NextResponse } from 'next/server';
import { trainingsStore } from '../../../../../lib/data-store';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const training = await trainingsStore.getById(new ObjectId(params.id));
    
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
    
    // Validate required fields
    if (!trainingData.name || !trainingData.duration || !trainingData.level) {
      return NextResponse.json(
        { error: 'Name, duration, and level are required' },
        { status: 400 }
      );
    }
    
    const updatedTraining = await trainingsStore.update(new ObjectId(params.id), trainingData);
    
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
    const success = await trainingsStore.delete(new ObjectId(params.id));
    
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