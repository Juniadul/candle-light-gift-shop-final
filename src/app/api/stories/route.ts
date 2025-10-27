import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { stories } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single story fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const story = await db
        .select()
        .from(stories)
        .where(eq(stories.id, parseInt(id)))
        .limit(1);

      if (story.length === 0) {
        return NextResponse.json(
          { error: 'Story not found', code: 'STORY_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(story[0], { status: 200 });
    }

    // List stories with pagination and search
    const limit = Math.min(
      parseInt(searchParams.get('limit') ?? '20'),
      100
    );
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(stories);

    if (search) {
      query = query.where(
        or(
          like(stories.title, `%${search}%`),
          like(stories.client, `%${search}%`),
          like(stories.excerpt, `%${search}%`)
        )
      );
    }

    const results = await query
      .orderBy(desc(stories.createdAt))
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
    const { title, client, date, excerpt, content, image } = body;

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (!client || !client.trim()) {
      return NextResponse.json(
        { error: 'Client is required', code: 'MISSING_CLIENT' },
        { status: 400 }
      );
    }

    if (!date || !date.trim()) {
      return NextResponse.json(
        { error: 'Date is required', code: 'MISSING_DATE' },
        { status: 400 }
      );
    }

    if (!excerpt || !excerpt.trim()) {
      return NextResponse.json(
        { error: 'Excerpt is required', code: 'MISSING_EXCERPT' },
        { status: 400 }
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required', code: 'MISSING_CONTENT' },
        { status: 400 }
      );
    }

    if (!image || !image.trim()) {
      return NextResponse.json(
        { error: 'Image is required', code: 'MISSING_IMAGE' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      title: title.trim(),
      client: client.trim(),
      date: date.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      image: image.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newStory = await db
      .insert(stories)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newStory[0], { status: 201 });
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

    const body = await request.json();
    const { title, client, date, excerpt, content, image } = body;

    // Check if story exists
    const existingStory = await db
      .select()
      .from(stories)
      .where(eq(stories.id, parseInt(id)))
      .limit(1);

    if (existingStory.length === 0) {
      return NextResponse.json(
        { error: 'Story not found', code: 'STORY_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Build update object with only provided fields
    const updates: Record<string, string> = {
      updatedAt: new Date().toISOString(),
    };

    if (title !== undefined) {
      if (!title.trim()) {
        return NextResponse.json(
          { error: 'Title cannot be empty', code: 'INVALID_TITLE' },
          { status: 400 }
        );
      }
      updates.title = title.trim();
    }

    if (client !== undefined) {
      if (!client.trim()) {
        return NextResponse.json(
          { error: 'Client cannot be empty', code: 'INVALID_CLIENT' },
          { status: 400 }
        );
      }
      updates.client = client.trim();
    }

    if (date !== undefined) {
      if (!date.trim()) {
        return NextResponse.json(
          { error: 'Date cannot be empty', code: 'INVALID_DATE' },
          { status: 400 }
        );
      }
      updates.date = date.trim();
    }

    if (excerpt !== undefined) {
      if (!excerpt.trim()) {
        return NextResponse.json(
          { error: 'Excerpt cannot be empty', code: 'INVALID_EXCERPT' },
          { status: 400 }
        );
      }
      updates.excerpt = excerpt.trim();
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

    if (image !== undefined) {
      if (!image.trim()) {
        return NextResponse.json(
          { error: 'Image cannot be empty', code: 'INVALID_IMAGE' },
          { status: 400 }
        );
      }
      updates.image = image.trim();
    }

    const updatedStory = await db
      .update(stories)
      .set(updates)
      .where(eq(stories.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedStory[0], { status: 200 });
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

    // Check if story exists
    const existingStory = await db
      .select()
      .from(stories)
      .where(eq(stories.id, parseInt(id)))
      .limit(1);

    if (existingStory.length === 0) {
      return NextResponse.json(
        { error: 'Story not found', code: 'STORY_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deletedStory = await db
      .delete(stories)
      .where(eq(stories.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Story deleted successfully',
        story: deletedStory[0],
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