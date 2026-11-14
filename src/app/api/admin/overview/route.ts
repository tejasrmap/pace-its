import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parallel metric retrieval
    const [
      totalPages,
      publishedPages,
      totalDepartments,
      totalApplications,
      newApplications,
      contactedApplications,
      underReviewApplications,
      approvedApplications,
      recentApplications,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.page.count(),
      prisma.page.count({ where: { status: 'PUBLISHED' } }),
      prisma.department.count(),
      prisma.admissionApplication.count(),
      prisma.admissionApplication.count({ where: { status: 'NEW' } }),
      prisma.admissionApplication.count({ where: { status: 'CONTACTED' } }),
      prisma.admissionApplication.count({ where: { status: 'UNDER_REVIEW' } }),
      prisma.admissionApplication.count({ where: { status: 'APPROVED' } }),
      prisma.admissionApplication.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      metrics: {
        pages: {
          total: totalPages,
          published: publishedPages,
          draft: totalPages - publishedPages,
        },
        departments: {
          total: totalDepartments,
        },
        admissions: {
          total: totalApplications,
          new: newApplications,
          contacted: contactedApplications,
          underReview: underReviewApplications,
          approved: approvedApplications,
        },
      },
      recentApplications,
      recentAuditLogs,
      system: {
        serverTime: new Date().toISOString(),
        database: 'SQLite (Prisma ORM)',
        environment: process.env.NODE_ENV || 'development',
      },
    });
  } catch (error: any) {
    console.error('Admin overview error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    );
  }
}

