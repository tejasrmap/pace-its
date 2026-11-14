import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyPassword, signToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      // Record failed attempt in audit log
      await prisma.auditLog.create({
        data: {
          action: 'LOGIN_FAILED',
          entityType: 'User',
          entityId: user.id,
          details: JSON.stringify({ email: user.email }),
          ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
        },
      });

      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const authPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles.map((r) => r.role.name),
      departmentId: user.departmentId,
    };

    const token = signToken(authPayload);

    // Record successful login in audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN_SUCCESS',
        entityType: 'User',
        entityId: user.id,
        details: JSON.stringify({ roles: authPayload.roles }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    const response = NextResponse.json({
      success: true,
      user: authPayload,
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set('pace_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}

