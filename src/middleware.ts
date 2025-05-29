import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieName = 'intisafsonjack';
  const cookie = req.cookies.get(cookieName);

  // Si la cookie no existe o está vacía y la ruta no es '/', redirigir a '/'
   if (!cookie || !cookie.value) {
    if (req.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } 

  return NextResponse.next(); // Permitir el acceso si la cookie está presente
}

// Configurar el middleware para excluir '/' y assets estáticos
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|login).*)', // Excluye '/' y archivos estáticos
};
