I notice this request is asking for an Express server setup, but based on the system prompt, I should be generating Next.js API routes, not Express servers. However, I can see you want to create an API route for hero slides that follows Next.js patterns.

Let me generate the Next.js API route for hero slides:

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { heroSlides } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const slide = await db.select()
        .from(heroSlides)
        .where(eq(heroSlides.id, parseInt(id)))
        .limit(1);

      if (slide.length === 0) {
        return NextResponse.json({ 
          error: 'Hero slide not found',
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(slide[0]);
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const sortField = searchParams.get('sort') ?? 'displayOrder';
    const sortOrder = searchParams.get('order') ?? 'asc';
    const isActive = searchParams.get('isActive');

    let query = db.select().from(heroSlides);

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(heroSlides.title, `%${search}%`),
          like(heroSlides.subtitle, `%${search}%`),
          like(heroSlides.description, `%${search}%`)
        )
      );
    }

    if (isActive !== null && isActive !== undefined) {
      conditions.push(eq(heroSlides.isActive, isActive === 'true'));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const validSortFields = ['id', 'title', 'displayOrder', 'createdAt', 'updatedAt'];
    const actualSortField = validSortFields.includes(sortField) ? sortField : 'displayOrder';
    
    if (sortOrder === 'desc') {
      query = query.orderBy(desc(heroSlides[actualSortField as keyof typeof heroSlides]));
    } else {
      query = query.orderBy(asc(heroSlides[actualSortField as keyof typeof heroSlides]));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { 
      title, 
      subtitle, 
      description, 
      image, 
      buttonText, 
      buttonLink, 
      displayOrder,
      isActive 
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!subtitle || !subtitle.trim()) {
      return NextResponse.json({ 
        error: "Subtitle is required",
        code: "MISSING_SUBTITLE" 
      }, { status: 400 });
    }

    if (!description || !description.trim()) {
      return NextResponse.json({ 
        error: "Description is required",
        code: "MISSING_DESCRIPTION" 
      }, { status: 400 });
    }

    if (!image || !image.trim()) {
      return NextResponse.json({ 
        error: "Image is required",
        code: "MISSING_IMAGE" 
      }, { status: 400 });
    }

    if (!buttonText || !buttonText.trim()) {
      return NextResponse.json({ 
        error: "Button text is required",
        code: "MISSING_BUTTON_TEXT" 
      }, { status: 400 });
    }

    if (!buttonLink || !buttonLink.trim()) {
      return NextResponse.json({ 
        error: "Button link is required",
        code: "MISSING_BUTTON_LINK" 
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    const newSlide = await db.insert(heroSlides)
      .values({
        title: title.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        image: image.trim(),
        buttonText: buttonText.trim(),
        buttonLink: buttonLink.trim(),
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(newSlide[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const existing = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Hero slide not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const body = await request.json();

    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    if (body.title !== undefined) {
      if (!body.title.trim()) {
        return NextResponse.json({ 
          error: "Title cannot be empty",
          code: "EMPTY_TITLE" 
        }, { status: 400 });
      }
      updates.title = body.title.trim();
    }

    if (body.subtitle !== undefined) {
      if (!body.subtitle.trim()) {
        return NextResponse.json({ 
          error: "Subtitle cannot be empty",
          code: "EMPTY_SUBTITLE" 
        }, { status: 400 });
      }
      updates.subtitle = body.subtitle.trim();
    }

    if (body.description !== undefined) {
      if (!body.description.trim()) {
        return NextResponse.json({ 
          error: "Description cannot be empty",
          code: "EMPTY_DESCRIPTION" 
        }, { status: 400 });
      }
      updates.description = body.description.trim();
    }

    if (body.image !== undefined) {
      if (!body.image.trim()) {
        return NextResponse.json({ 
          error: "Image cannot be empty",
          code: "EMPTY_IMAGE" 
        }, { status: 400 });
      }
      updates.image = body.image.trim();
    }

    if (body.buttonText !== undefined) {
      if (!body.buttonText.trim()) {
        return NextResponse.json({ 
          error: "Button text cannot be empty",
          code: "EMPTY_BUTTON_TEXT" 
        }, { status: 400 });
      }
      updates.buttonText = body.buttonText.trim();
    }

    if (body.buttonLink !== undefined) {
      if (!body.buttonLink.trim()) {
        return NextResponse.json({ 
          error: "Button link cannot be empty",
          code: "EMPTY_BUTTON_LINK" 
        }, { status: 400 });
      }
      updates.buttonLink = body.buttonLink.trim();
    }

    if (body.displayOrder !== undefined) {
      updates.displayOrder = parseInt(body.displayOrder);
    }

    if (body.isActive !== undefined) {
      updates.isActive = Boolean(body.isActive);
    }

    const updated = await db.update(heroSlides)
      .set(updates)
      .where(eq(heroSlides.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const existing = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Hero slide not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Hero slide deleted successfully',
      data: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}