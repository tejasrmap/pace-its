import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, checkRole } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { code: 'asc' },
      include: {
        _count: {
          select: { faculty: true, courses: true, laboratories: true },
        },
      },
    });

    return NextResponse.json({ success: true, departments });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch departments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN', 'PRINCIPAL'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { code, name, slug, type, intake, vision, mission, hodName, hodEmail, hodMessage } = body;

    if (!code || !name || !slug) {
      return NextResponse.json({ error: 'code, name, and slug are required' }, { status: 400 });
    }

    const department = await prisma.department.create({
      data: {
        code: code.toUpperCase().trim(),
        name,
        slug: slug.toLowerCase().trim(),
        type: type || 'UG',
        intake: intake || '',
        vision: vision || '',
        mission: mission || '',
        hodName: hodName || '',
        hodEmail: hodEmail || '',
        hodMessage: hodMessage || '',
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entityType: 'Department',
        entityId: department.id,
        details: JSON.stringify({ code: department.code, name: department.name }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({ success: true, department }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create department: ' + error.message }, { status: 500 });
  }
}

