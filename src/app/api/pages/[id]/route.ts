import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, checkRole } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const page = await prisma.page.findFirst({
      where: {
        OR: [
          { id: params.id },
          { canonicalPath: params.id.startsWith('/') ? params.id : `/${params.id}` },
        ],
      },
      include: {
        sections: { orderBy: { order: 'asc' } },
        documents: true,
        images: true,
      },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN', 'CONTENT_EDITOR', 'PRINCIPAL'])) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 403 });
    }

    const body = await req.json();
    const { title, section, category, template, status, fullText, seoTitle, seoDesc } = body;

    const existing = await prisma.page.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const updated = await prisma.page.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(section && { section }),
        ...(category && { category }),
        ...(template && { template }),
        ...(status && { status }),
        ...(fullText !== undefined && { fullText }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDesc !== undefined && { seoDesc }),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'UPDATE',
        entityType: 'Page',
        entityId: updated.id,
        details: JSON.stringify({
          previousTitle: existing.title,
          newTitle: updated.title,
          status: updated.status,
        }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({ success: true, page: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN'])) {
      return NextResponse.json({ error: 'Unauthorized. Only SUPER_ADMIN can delete pages.' }, { status: 403 });
    }

    const existing = await prisma.page.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    await prisma.page.delete({
      where: { id: params.id },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'DELETE',
        entityType: 'Page',
        entityId: params.id,
        details: JSON.stringify({ canonicalPath: existing.canonicalPath, title: existing.title }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({ success: true, message: 'Page deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}

