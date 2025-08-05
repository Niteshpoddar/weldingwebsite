import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Product from '@/lib/models/Product'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit')) || 0

    let query = {}
    if (category) query.category = category
    if (featured === 'true') query.featured = true

    const products = await Product.find(query)
      .limit(limit)
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const product = await Product.create(body)
    
    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}