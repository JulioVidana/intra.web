import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieName = 'intisafsonjack';
  const cookie = req.cookies.get(cookieName);
  const isAuthPage = req.nextUrl.pathname === '/login';

  if (!cookie?.value && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (cookie?.value && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo).*)'],
};

