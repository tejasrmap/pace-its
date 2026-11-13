import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, checkRole } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const section = searchParams.get('section') || '';
    const status = searchParams.get('status') || '';
    const pageNum = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (pageNum - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { canonicalPath: { contains: search } },
      ];
    }
    if (category) {
      where.category = category;
    }
    if (section) {
      where.section = section;
    }
    if (status) {
      where.status = status;
    }

    const [total, pages, categories, sections] = await Promise.all([
      prisma.page.count({ where }),
      prisma.page.findMany({
        where,
        skip,
        take: limit,
        orderBy: { canonicalPath: 'asc' },
        select: {
          id: true,
          canonicalPath: true,
          title: true,
          section: true,
          category: true,
          template: true,
          status: true,
          updatedAt: true,
        },
      }),
      prisma.page.findMany({
        distinct: ['category'],
        select: { category: true },
      }),
      prisma.page.findMany({
        distinct: ['section'],
        select: { section: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      total,
      page: pageNum,
      limit,
      totalPages: Math.ceil(total / limit),
      pages,
      filters: {
        categories: categories.map((c) => c.category).filter(Boolean),
        sections: sections.map((s) => s.section).filter(Boolean),
      },
    });
  } catch (error: any) {
    console.error('Fetch pages error:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || !checkRole(user, ['SUPER_ADMIN', 'CONTENT_EDITOR'])) {
      return NextResponse.json({ error: 'Unauthorized. Required: SUPER_ADMIN or CONTENT_EDITOR' }, { status: 403 });
    }

    const body = await req.json();
    const { canonicalPath, title, section, category, template, fullText, seoTitle, seoDesc } = body;

    if (!canonicalPath || !title) {
      return NextResponse.json({ error: 'canonicalPath and title are required' }, { status: 400 });
    }

    // Ensure path starts with slash
    const formattedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;

    const existing = await prisma.page.findUnique({
      where: { canonicalPath: formattedPath },
    });

    if (existing) {
      return NextResponse.json({ error: 'Page with this canonicalPath already exists.' }, { status: 409 });
    }

    const newPage = await prisma.page.create({
      data: {
        canonicalPath: formattedPath,
        title,
        section: section || 'General',
        category: category || 'General',
        template: template || 'InstitutionalTemplate',
        status: 'PUBLISHED',
        fullText: fullText || '',
        seoTitle: seoTitle || `${title} | PACE ITS`,
        seoDesc: seoDesc || `PACE Institute of Technology & Sciences - ${title}`,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entityType: 'Page',
        entityId: newPage.id,
        details: JSON.stringify({ path: newPage.canonicalPath, title: newPage.title }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json({ success: true, page: newPage }, { status: 201 });
  } catch (error: any) {
    console.error('Create page error:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
