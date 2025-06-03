import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieName = 'intisafsonjack';
  const cookie = req.cookies.get(cookieName);


   if (!cookie || !cookie.value) {
    if (req.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } 

  return NextResponse.next(); 
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|logo|login).*)',
};

