import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { heroSlides } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

// Helper function to transform database record to camelCase response
function toResponse(dbRecord: any) {
  return {
    id: dbRecord.id,
    title: dbRecord.title,
    subtitle: dbRecord.subtitle,
    description: dbRecord.description,
    image: dbRecord.image,
    buttonText: dbRecord.buttonText,
    buttonLink: dbRecord.buttonLink,
    displayOrder: dbRecord.displayOrder,
    isActive: dbRecord.isActive,
    createdAt: dbRecord.createdAt,
    updatedAt: dbRecord.updatedAt
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const activeParam = searchParams.get('active');
    const activeFilter = activeParam === 'false' ? false : true;

    // Single slide by ID
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

      return NextResponse.json(toResponse(slide[0]), { status: 200 });
    }

    // List of slides filtered by active status
    let query = db.select()
      .from(heroSlides)
      .orderBy(asc(heroSlides.displayOrder));

    if (activeFilter) {
      query = db.select()
        .from(heroSlides)
        .where(eq(heroSlides.isActive, true))
        .orderBy(asc(heroSlides.displayOrder));
    }

    const slides = await query;
    const response = slides.map(toResponse);

    return NextResponse.json(response, { status: 200 });
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

    // Validate required fields
    if (!title || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!subtitle || subtitle.trim() === '') {
      return NextResponse.json({ 
        error: "Subtitle is required",
        code: "MISSING_SUBTITLE" 
      }, { status: 400 });
    }

    if (!description || description.trim() === '') {
      return NextResponse.json({ 
        error: "Description is required",
        code: "MISSING_DESCRIPTION" 
      }, { status: 400 });
    }

    if (!image || image.trim() === '') {
      return NextResponse.json({ 
        error: "Image is required",
        code: "MISSING_IMAGE" 
      }, { status: 400 });
    }

    if (!buttonText || buttonText.trim() === '') {
      return NextResponse.json({ 
        error: "Button text is required",
        code: "MISSING_BUTTON_TEXT" 
      }, { status: 400 });
    }

    if (!buttonLink || buttonLink.trim() === '') {
      return NextResponse.json({ 
        error: "Button link is required",
        code: "MISSING_BUTTON_LINK" 
      }, { status: 400 });
    }

    // Validate displayOrder if provided
    if (displayOrder !== undefined && (isNaN(Number(displayOrder)) || !Number.isInteger(Number(displayOrder)))) {
      return NextResponse.json({ 
        error: "Display order must be a valid integer",
        code: "INVALID_DISPLAY_ORDER" 
      }, { status: 400 });
    }

    // Validate isActive if provided
    if (isActive !== undefined && typeof isActive !== 'boolean') {
      return NextResponse.json({ 
        error: "isActive must be a boolean",
        code: "INVALID_IS_ACTIVE" 
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    // Prepare insert data
    const insertData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: image.trim(),
      buttonText: buttonText.trim(),
      buttonLink: buttonLink.trim(),
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: now,
      updatedAt: now
    };

    const newSlide = await db.insert(heroSlides)
      .values(insertData)
      .returning();

    return NextResponse.json(toResponse(newSlide[0]), { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if slide exists
    const existingSlide = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .limit(1);

    if (existingSlide.length === 0) {
      return NextResponse.json({ 
        error: 'Hero slide not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

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

    // Validate fields if provided
    if (title !== undefined && title.trim() === '') {
      return NextResponse.json({ 
        error: "Title cannot be empty",
        code: "INVALID_TITLE" 
      }, { status: 400 });
    }

    if (subtitle !== undefined && subtitle.trim() === '') {
      return NextResponse.json({ 
        error: "Subtitle cannot be empty",
        code: "INVALID_SUBTITLE" 
      }, { status: 400 });
    }

    if (description !== undefined && description.trim() === '') {
      return NextResponse.json({ 
        error: "Description cannot be empty",
        code: "INVALID_DESCRIPTION" 
      }, { status: 400 });
    }

    if (image !== undefined && image.trim() === '') {
      return NextResponse.json({ 
        error: "Image cannot be empty",
        code: "INVALID_IMAGE" 
      }, { status: 400 });
    }

    if (buttonText !== undefined && buttonText.trim() === '') {
      return NextResponse.json({ 
        error: "Button text cannot be empty",
        code: "INVALID_BUTTON_TEXT" 
      }, { status: 400 });
    }

    if (buttonLink !== undefined && buttonLink.trim() === '') {
      return NextResponse.json({ 
        error: "Button link cannot be empty",
        code: "INVALID_BUTTON_LINK" 
      }, { status: 400 });
    }

    if (displayOrder !== undefined && (isNaN(Number(displayOrder)) || !Number.isInteger(Number(displayOrder)))) {
      return NextResponse.json({ 
        error: "Display order must be a valid integer",
        code: "INVALID_DISPLAY_ORDER" 
      }, { status: 400 });
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') {
      return NextResponse.json({ 
        error: "isActive must be a boolean",
        code: "INVALID_IS_ACTIVE" 
      }, { status: 400 });
    }

    // Prepare update data (only include provided fields)
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    if (title !== undefined) updateData.title = title.trim();
    if (subtitle !== undefined) updateData.subtitle = subtitle.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (image !== undefined) updateData.image = image.trim();
    if (buttonText !== undefined) updateData.buttonText = buttonText.trim();
    if (buttonLink !== undefined) updateData.buttonLink = buttonLink.trim();
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await db.update(heroSlides)
      .set(updateData)
      .where(eq(heroSlides.id, parseInt(id)))
      .returning();

    return NextResponse.json(toResponse(updated[0]), { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if slide exists
    const existingSlide = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .limit(1);

    if (existingSlide.length === 0) {
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
      slide: toResponse(deleted[0])
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}