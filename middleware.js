import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin-session');
    const allCookies = request.cookies.getAll();
    
    // Debug logging
    console.log('=== Middleware Debug ===');
    console.log('Path:', pathname);
    console.log('URL:', request.url);
    console.log('Admin session cookie:', adminSession);
    console.log('All cookies:', allCookies.map(c => ({ name: c.name, value: c.value })));
    console.log('User agent:', request.headers.get('user-agent'));
    console.log('Host:', request.headers.get('host'));
    console.log('========================');
    
    // If no admin session, redirect to login
    if (!adminSession || adminSession.value !== 'authenticated') {
      console.log('❌ No valid session, redirecting to login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    console.log('✅ Valid session, allowing access');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};
