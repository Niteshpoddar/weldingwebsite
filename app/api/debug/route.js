import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    return NextResponse.json({
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      },
      cookies: allCookies.map(cookie => ({
        name: cookie.name,
        value: cookie.value,
        path: cookie.path,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        httpOnly: cookie.httpOnly
      })),
      headers: {
        userAgent: 'Available in request object',
        host: 'Available in request object'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
