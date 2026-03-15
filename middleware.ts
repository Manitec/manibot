import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('manibot_auth')
  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!auth && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (auth?.value !== process.env.GATE_PASSWORD && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api/login).*)']
}
