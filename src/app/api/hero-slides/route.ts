import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { heroSlides } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
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
          error: 'Slide not found',
          code: 'SLIDE_NOT_FOUND' 
        }, { status: 404 });
      }
      
      return NextResponse.json(slide[0], { status: 200 });
    }
    
    // List all slides (filtered by active status)
    const active = searchParams.get('active');
    const shouldFilterActive = active !== 'false'; // Default to true
    
    let query = db.select().from(heroSlides);
    
    if (shouldFilterActive) {
      query = query.where(eq(heroSlides.is_active, true));
    }
    
    const slides = await query.orderBy(asc(heroSlides.display_order));
    
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
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }
    
    if (!subtitle || typeof subtitle !== 'string' || subtitle.trim() === '') {
      return NextResponse.json({ 
        error: "Subtitle is required",
        code: "MISSING_SUBTITLE" 
      }, { status: 400 });
    }
    
    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ 
        error: "Description is required",
        code: "MISSING_DESCRIPTION" 
      }, { status: 400 });
    }
    
    if (!image || typeof image !== 'string' || image.trim() === '') {
      return NextResponse.json({ 
        error: "Image URL is required",
        code: "MISSING_IMAGE" 
      }, { status: 400 });
    }
    
    if (!buttonText || typeof buttonText !== 'string' || buttonText.trim() === '') {
      return NextResponse.json({ 
        error: "Button text is required",
        code: "MISSING_BUTTON_TEXT" 
      }, { status: 400 });
    }
    
    if (!buttonLink || typeof buttonLink !== 'string' || buttonLink.trim() === '') {
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
        button_text: buttonText.trim(),
        button_link: buttonLink.trim(),
        display_order: displayOrder !== undefined ? parseInt(displayOrder) : 0,
        is_active: isActive !== undefined ? Boolean(isActive) : true,
        created_at: now,
        updated_at: now
      })
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
        error: 'Slide not found',
        code: 'SLIDE_NOT_FOUND' 
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
    
    // Build update object with only provided fields
    const updates: any = {
      updated_at: new Date().toISOString()
    };
    
    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return NextResponse.json({ 
          error: "Title cannot be empty",
          code: "INVALID_TITLE" 
        }, { status: 400 });
      }
      updates.title = title.trim();
    }
    
    if (subtitle !== undefined) {
      if (typeof subtitle !== 'string' || subtitle.trim() === '') {
        return NextResponse.json({ 
          error: "Subtitle cannot be empty",
          code: "INVALID_SUBTITLE" 
        }, { status: 400 });
      }
      updates.subtitle = subtitle.trim();
    }
    
    if (description !== undefined) {
      if (typeof description !== 'string' || description.trim() === '') {
        return NextResponse.json({ 
          error: "Description cannot be empty",
          code: "INVALID_DESCRIPTION" 
        }, { status: 400 });
      }
      updates.description = description.trim();
    }
    
    if (image !== undefined) {
      if (typeof image !== 'string' || image.trim() === '') {
        return NextResponse.json({ 
          error: "Image URL cannot be empty",
          code: "INVALID_IMAGE" 
        }, { status: 400 });
      }
      updates.image = image.trim();
    }
    
    if (buttonText !== undefined) {
      if (typeof buttonText !== 'string' || buttonText.trim() === '') {
        return NextResponse.json({ 
          error: "Button text cannot be empty",
          code: "INVALID_BUTTON_TEXT" 
        }, { status: 400 });
      }
      updates.button_text = buttonText.trim();
    }
    
    if (buttonLink !== undefined) {
      if (typeof buttonLink !== 'string' || buttonLink.trim() === '') {
        return NextResponse.json({ 
          error: "Button link cannot be empty",
          code: "INVALID_BUTTON_LINK" 
        }, { status: 400 });
      }
      updates.button_link = buttonLink.trim();
    }
    
    if (displayOrder !== undefined) {
      updates.display_order = parseInt(displayOrder);
    }
    
    if (isActive !== undefined) {
      updates.is_active = Boolean(isActive);
    }
    
    const updatedSlide = await db.update(heroSlides)
      .set(updates)
      .where(eq(heroSlides.id, parseInt(id)))
      .returning();
    
    return NextResponse.json(updatedSlide[0], { status: 200 });
    
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
        error: 'Slide not found',
        code: 'SLIDE_NOT_FOUND' 
      }, { status: 404 });
    }
    
    const deletedSlide = await db.delete(heroSlides)
      .where(eq(heroSlides.id, parseInt(id)))
      .returning();
    
    return NextResponse.json({
      message: 'Slide deleted successfully',
      slide: deletedSlide[0]
    }, { status: 200 });
    
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}