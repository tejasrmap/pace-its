import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, checkRole } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const settings = await prisma.websiteSetting.findMany({
      orderBy: { group: 'asc' },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN'])) {
      return NextResponse.json({ error: 'Unauthorized. Super Admin only.' }, { status: 403 });
    }

    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'key and value are required' }, { status: 400 });
    }

    const updated = await prisma.websiteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE_SETTING',
        entityType: 'WebsiteSetting',
        entityId: updated.id,
        details: JSON.stringify({ key, value }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({ success: true, setting: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}

