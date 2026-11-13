import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (user) {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'LOGOUT',
          entityType: 'User',
          entityId: user.id,
          details: JSON.stringify({ email: user.email }),
          ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
        },
      });
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
    response.cookies.delete('pace_admin_token');
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}

