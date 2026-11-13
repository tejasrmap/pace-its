import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, checkRole } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const department = await prisma.department.findFirst({
      where: {
        OR: [{ id: params.id }, { code: params.id.toUpperCase() }, { slug: params.id.toLowerCase() }],
      },
      include: {
        faculty: { orderBy: { order: 'asc' } },
        courses: true,
        laboratories: true,
      },
    });

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, department });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch department' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN', 'PRINCIPAL', 'HOD'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { name, intake, vision, mission, hodName, hodEmail, hodMessage } = body;

    const existing = await prisma.department.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    const updated = await prisma.department.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(intake !== undefined && { intake }),
        ...(vision !== undefined && { vision }),
        ...(mission !== undefined && { mission }),
        ...(hodName !== undefined && { hodName }),
        ...(hodEmail !== undefined && { hodEmail }),
        ...(hodMessage !== undefined && { hodMessage }),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE',
        entityType: 'Department',
        entityId: updated.id,
        details: JSON.stringify({ code: updated.code, hodName: updated.hodName }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({ success: true, department: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update department' }, { status: 500 });
  }
}
