import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const results = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.displayOrder))
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
    const { name, slug, displayOrder, imageUrl } = body;

    // Validate required fields
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { error: 'Slug is required', code: 'MISSING_SLUG' },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug.trim()))
      .limit(1);

    if (existingCategory.length > 0) {
      return NextResponse.json(
        { error: 'Slug must be unique', code: 'DUPLICATE_SLUG' },
        { status: 400 }
      );
    }

    // Create new category
    const newCategory = await db
      .insert(categories)
      .values({
        name: name.trim(),
        slug: slug.trim(),
        displayOrder: displayOrder ?? 0,
        imageUrl: imageUrl ? imageUrl.trim() : null,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newCategory[0], { status: 201 });
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, slug, displayOrder, imageUrl } = body;

    // Check if category exists
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json(
        { error: 'Category not found', code: 'CATEGORY_NOT_FOUND' },
        { status: 404 }
      );
    }

    // If slug is being updated, check uniqueness
    if (slug && slug.trim() !== existingCategory[0].slug) {
      const duplicateSlug = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, slug.trim()))
        .limit(1);

      if (duplicateSlug.length > 0) {
        return NextResponse.json(
          { error: 'Slug must be unique', code: 'DUPLICATE_SLUG' },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updateData: {
      name?: string;
      slug?: string;
      displayOrder?: number;
      imageUrl?: string | null;
    } = {};

    if (name !== undefined) {
      if (name.trim() === '') {
        return NextResponse.json(
          { error: 'Name cannot be empty', code: 'INVALID_NAME' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    if (slug !== undefined) {
      if (slug.trim() === '') {
        return NextResponse.json(
          { error: 'Slug cannot be empty', code: 'INVALID_SLUG' },
          { status: 400 }
        );
      }
      updateData.slug = slug.trim();
    }

    if (displayOrder !== undefined) {
      updateData.displayOrder = displayOrder;
    }

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl ? imageUrl.trim() : null;
    }

    // Update category
    const updated = await db
      .update(categories)
      .set(updateData)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)))
      .limit(1);

    if (existingCategory.length === 0) {
      return NextResponse.json(
        { error: 'Category not found', code: 'CATEGORY_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete category
    const deleted = await db
      .delete(categories)
      .where(eq(categories.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Category deleted successfully',
        category: deleted[0],
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