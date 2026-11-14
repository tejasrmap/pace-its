import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, checkRole } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN', 'ADMISSIONS_OFFICER', 'PRINCIPAL'])) {
      return NextResponse.json({ error: 'Unauthorized to view admission records' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const program = searchParams.get('program') || '';
    const pageNum = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '25', 10);
    const skip = (pageNum - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { applicationNo: { contains: search } },
        { candidateName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (program) {
      where.programType = program;
    }

    const [total, applications, countsByStatus] = await Promise.all([
      prisma.admissionApplication.count({ where }),
      prisma.admissionApplication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.admissionApplication.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
    ]);

    const statusBreakdown = countsByStatus.reduce((acc: any, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      total,
      page: pageNum,
      limit,
      totalPages: Math.ceil(total / limit),
      applications,
      statusBreakdown,
    });
  } catch (error: any) {
    console.error('Fetch applications error:', error);
    return NextResponse.json({ error: 'Failed to fetch admission applications' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN', 'ADMISSIONS_OFFICER', 'PRINCIPAL'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, internalNotes, assignedToId } = body;

    if (!id) {
      return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
    }

    const existing = await prisma.admissionApplication.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const updated = await prisma.admissionApplication.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(internalNotes !== undefined && { internalNotes }),
        ...(assignedToId !== undefined && { assignedToId }),
      },
    });

    // Write audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'ADMISSION_STATUS_UPDATED',
        entityType: 'AdmissionApplication',
        entityId: id,
        details: JSON.stringify({
          applicationNo: existing.applicationNo,
          previousStatus: existing.status,
          newStatus: updated.status,
          updatedBy: user.name,
        }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({
      success: true,
      application: updated,
    });
  } catch (error: any) {
    console.error('Update application error:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

