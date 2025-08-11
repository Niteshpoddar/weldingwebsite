import { NextResponse } from 'next/server'
import dbConnect from '../../dbconfig/dbconfig.js'

export async function GET() {
  try {
    console.log('Testing database connection...')
    await dbConnect()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
