import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { testimonials } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const featured = searchParams.get('featured');

    let query = db.select().from(testimonials);

    if (featured === 'true') {
      query = query.where(eq(testimonials.isFeatured, true));
    }

    const results = await query
      .orderBy(desc(testimonials.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, content, rating, image, isFeatured } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!role || !role.trim()) {
      return NextResponse.json(
        { error: 'Role is required', code: 'MISSING_ROLE' },
        { status: 400 }
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required', code: 'MISSING_CONTENT' },
        { status: 400 }
      );
    }

    if (!rating) {
      return NextResponse.json(
        { error: 'Rating is required', code: 'MISSING_RATING' },
        { status: 400 }
      );
    }

    if (!image || !image.trim()) {
      return NextResponse.json(
        { error: 'Image URL is required', code: 'MISSING_IMAGE' },
        { status: 400 }
      );
    }

    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5', code: 'INVALID_RATING' },
        { status: 400 }
      );
    }

    const newTestimonial = await db
      .insert(testimonials)
      .values({
        name: name.trim(),
        role: role.trim(),
        content: content.trim(),
        rating: ratingNum,
        image: image.trim(),
        isFeatured: isFeatured !== undefined ? isFeatured : true,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newTestimonial[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existingTestimonial = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, parseInt(id)))
      .limit(1);

    if (existingTestimonial.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, role, content, rating, image, isFeatured } = body;

    const updates: any = {};

    if (name !== undefined) {
      if (!name.trim()) {
        return NextResponse.json(
          { error: 'Name cannot be empty', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updates.name = name.trim();
    }

    if (role !== undefined) {
      if (!role.trim()) {
        return NextResponse.json(
          { error: 'Role cannot be empty', code: 'INVALID_ROLE' },
          { status: 400 }
        );
      }
      updates.role = role.trim();
    }

    if (content !== undefined) {
      if (!content.trim()) {
        return NextResponse.json(
          { error: 'Content cannot be empty', code: 'INVALID_CONTENT' },
          { status: 400 }
        );
      }
      updates.content = content.trim();
    }

    if (rating !== undefined) {
      const ratingNum = parseInt(rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return NextResponse.json(
          { error: 'Rating must be between 1 and 5', code: 'INVALID_RATING' },
          { status: 400 }
        );
      }
      updates.rating = ratingNum;
    }

    if (image !== undefined) {
      if (!image.trim()) {
        return NextResponse.json(
          { error: 'Image URL cannot be empty', code: 'INVALID_IMAGE' },
          { status: 400 }
        );
      }
      updates.image = image.trim();
    }

    if (isFeatured !== undefined) {
      updates.isFeatured = isFeatured;
    }

    const updatedTestimonial = await db
      .update(testimonials)
      .set(updates)
      .where(eq(testimonials.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedTestimonial[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const existingTestimonial = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, parseInt(id)))
      .limit(1);

    if (existingTestimonial.length === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(testimonials)
      .where(eq(testimonials.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Testimonial deleted successfully',
        deleted: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}