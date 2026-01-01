
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Define the protected zone
  const isAdminZone = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';

  // 2. Public Zone: Check if user is trying to access public areas (not admin)
  if (!isAdminZone) {
    return NextResponse.next();
  }

  // 3. Admin Zone Logic
  
  // Allow access to login page without check
  if (isLoginPage) {
     // Optional: If already logged in, redirect to dashboard? 
     // For now, let's keep it simple as per instructions.
     return NextResponse.next();
  }

  // Check for the admin "login token" (Gatekeeper)
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    // No token? Push to login page
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    // Verify legitimacy of the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret_please_change');
    await jwtVerify(token, secret);
    
    // Token valid? Open the door
    return NextResponse.next();
  } catch (err) {
    // Token invalid/expired? Push to login page
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api/auth (if any other auth routes exist)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public images
    '/admin/:path*', 
    // We can also let it run globally and decide inside, but matcher is efficient.
    // However, the user asked to "monitor the traffic of the entire website".
    // Global middleware is safer to ensure we don't miss anything, 
    // but the logic "If the user wants to go to any page other than /admin -> Allow" 
    // implies we only primarily care about intercepting /admin.
    // Let's match everything to be safe and strictly follow the "monitor entire website" instruction logic.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
