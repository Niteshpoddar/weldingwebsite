import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // For now, we'll use a simple session check
    // In production, you should implement proper authentication
    const isAuthenticated = request.cookies.get('admin-session')
    
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}