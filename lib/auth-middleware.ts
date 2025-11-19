import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyToken } from './jwt';

export async function authMiddleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = extractToken(authHeader);

  if (!token) {
    return NextResponse.json(
      { error: 'Missing or invalid authorization header' },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  return { isValid: true, payload };
}
