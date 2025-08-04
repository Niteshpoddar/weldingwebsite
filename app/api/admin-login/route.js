import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Hardcoded admin credentials (in production, use environment variables)
const ADMIN_EMAIL = 'admin@weldingcompany.com';
const ADMIN_PASSWORD = 'admin123';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin-session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}