import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { heroSlides } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const active = searchParams.get('active') ?? 'true';

    // Single record by ID
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
          error: 'Slide not found',
          code: "SLIDE_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(slide[0], { status: 200 });
    }

    // List all slides
    let query = db.select().from(heroSlides);

    // Filter by active status
    if (active === 'true') {
      query = query.where(eq(heroSlides.isActive, true));
    }

    // Order by displayOrder ascending
    const slides = await query.orderBy(asc(heroSlides.displayOrder));

    return NextResponse.json(slides, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, description, image, buttonText, buttonLink, displayOrder, isActive } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required and must be a non-empty string",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!subtitle || typeof subtitle !== 'string' || subtitle.trim() === '') {
      return NextResponse.json({ 
        error: "Subtitle is required and must be a non-empty string",
        code: "MISSING_SUBTITLE" 
      }, { status: 400 });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ 
        error: "Description is required and must be a non-empty string",
        code: "MISSING_DESCRIPTION" 
      }, { status: 400 });
    }

    if (!image || typeof image !== 'string' || image.trim() === '') {
      return NextResponse.json({ 
        error: "Image is required and must be a non-empty string",
        code: "MISSING_IMAGE" 
      }, { status: 400 });
    }

    if (!buttonText || typeof buttonText !== 'string' || buttonText.trim() === '') {
      return NextResponse.json({ 
        error: "Button text is required and must be a non-empty string",
        code: "MISSING_BUTTON_TEXT" 
      }, { status: 400 });
    }

    if (!buttonLink || typeof buttonLink !== 'string' || buttonLink.trim() === '') {
      return NextResponse.json({ 
        error: "Button link is required and must be a non-empty string",
        code: "MISSING_BUTTON_LINK" 
      }, { status: 400 });
    }

    // Prepare insert data with defaults
    const now = new Date().toISOString();
    const insertData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: image.trim(),
      buttonText: buttonText.trim(),
      buttonLink: buttonLink.trim(),
      displayOrder: typeof displayOrder === 'number' ? displayOrder : 0,
      isActive: typeof isActive === 'boolean' ? isActive : true,
      createdAt: now,
      updatedAt: now
    };

    const newSlide = await db.insert(heroSlides)
      .values(insertData)
      .returning();

    return NextResponse.json(newSlide[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Slide not found',
        code: "SLIDE_NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const { title, subtitle, description, image, buttonText, buttonLink, displayOrder, isActive } = body;

    // Build update object with only provided fields
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return NextResponse.json({ 
          error: "Title must be a non-empty string",
          code: "INVALID_TITLE" 
        }, { status: 400 });
      }
      updates.title = title.trim();
    }

    if (subtitle !== undefined) {
      if (typeof subtitle !== 'string' || subtitle.trim() === '') {
        return NextResponse.json({ 
          error: "Subtitle must be a non-empty string",
          code: "INVALID_SUBTITLE" 
        }, { status: 400 });
      }
      updates.subtitle = subtitle.trim();
    }

    if (description !== undefined) {
      if (typeof description !== 'string' || description.trim() === '') {
        return NextResponse.json({ 
          error: "Description must be a non-empty string",
          code: "INVALID_DESCRIPTION" 
        }, { status: 400 });
      }
      updates.description = description.trim();
    }

    if (image !== undefined) {
      if (typeof image !== 'string' || image.trim() === '') {
        return NextResponse.json({ 
          error: "Image must be a non-empty string",
          code: "INVALID_IMAGE" 
        }, { status: 400 });
      }
      updates.image = image.trim();
    }

    if (buttonText !== undefined) {
      if (typeof buttonText !== 'string' || buttonText.trim() === '') {
        return NextResponse.json({ 
          error: "Button text must be a non-empty string",
          code: "INVALID_BUTTON_TEXT" 
        }, { status: 400 });
      }
      updates.buttonText = buttonText.trim();
    }

    if (buttonLink !== undefined) {
      if (typeof buttonLink !== 'string' || buttonLink.trim() === '') {
        return NextResponse.json({ 
          error: "Button link must be a non-empty string",
          code: "INVALID_BUTTON_LINK" 
        }, { status: 400 });
      }
      updates.buttonLink = buttonLink.trim();
    }

    if (displayOrder !== undefined) {
      if (typeof displayOrder !== 'number') {
        return NextResponse.json({ 
          error: "Display order must be a number",
          code: "INVALID_DISPLAY_ORDER" 
        }, { status: 400 });
      }
      updates.displayOrder = displayOrder;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== 'boolean') {
        return NextResponse.json({ 
          error: "isActive must be a boolean",
          code: "INVALID_IS_ACTIVE" 
        }, { status: 400 });
      }
      updates.isActive = isActive;
    }

    const updated = await db.update(heroSlides)
      .set(updates)
      .where(eq(heroSlides.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existing = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Slide not found',
        code: "SLIDE_NOT_FOUND" 
      }, { status: 404 });
    }

    const deleted = await db.delete(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Slide deleted successfully',
      slide: deleted[0] 
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}