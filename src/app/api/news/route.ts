import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, checkRole } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN', 'CONTENT_EDITOR'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { title, link, isTicker, isActive, order } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const article = await prisma.newsArticle.create({
      data: {
        title,
        link: link || '',
        isTicker: isTicker ?? true,
        isActive: isActive ?? true,
        order: order || 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE_NEWS',
        entityType: 'NewsArticle',
        entityId: article.id,
        details: JSON.stringify({ title }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news item' }, { status: 500 });
  }
}

