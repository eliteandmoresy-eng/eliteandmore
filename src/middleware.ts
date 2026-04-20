import { NextRequest, NextResponse } from 'next/server';

// Middleware is minimal — auth is handled client-side via useSession in AdminLayout
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
