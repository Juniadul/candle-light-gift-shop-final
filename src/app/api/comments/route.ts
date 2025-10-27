import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { comments, stories } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valid status values
const VALID_STATUSES = ['pending', 'approved', 'rejected'] as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const storyId = searchParams.get('storyId');
    const statusFilter = searchParams.get('status');

    // Validate storyId is provided
    if (!storyId || isNaN(parseInt(storyId))) {
      return NextResponse.json(
        { 
          error: 'Valid storyId is required',
          code: 'MISSING_STORY_ID'
        },
        { status: 400 }
      );
    }

    // Verify story exists
    const story = await db
      .select()
      .from(stories)
      .where(eq(stories.id, parseInt(storyId)))
      .limit(1);

    if (story.length === 0) {
      return NextResponse.json(
        { 
          error: 'Story not found',
          code: 'STORY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Build query based on status filter
    let query = db
      .select()
      .from(comments)
      .where(eq(comments.storyId, parseInt(storyId)))
      .orderBy(desc(comments.createdAt));

    // If status=all is not set, only return approved comments (public view)
    if (statusFilter !== 'all') {
      query = db
        .select()
        .from(comments)
        .where(
          and(
            eq(comments.storyId, parseInt(storyId)),
            eq(comments.status, 'approved')
          )
        )
        .orderBy(desc(comments.createdAt));
    }

    const results = await query;

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
    const { storyId, name, email, message } = body;

    // Validate required fields
    if (!storyId) {
      return NextResponse.json(
        { 
          error: 'storyId is required',
          code: 'MISSING_STORY_ID'
        },
        { status: 400 }
      );
    }

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { 
          error: 'name is required and cannot be empty',
          code: 'MISSING_NAME'
        },
        { status: 400 }
      );
    }

    if (!email || email.trim() === '') {
      return NextResponse.json(
        { 
          error: 'email is required and cannot be empty',
          code: 'MISSING_EMAIL'
        },
        { status: 400 }
      );
    }

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { 
          error: 'message is required and cannot be empty',
          code: 'MISSING_MESSAGE'
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      );
    }

    // Validate storyId is a valid integer
    if (isNaN(parseInt(storyId))) {
      return NextResponse.json(
        { 
          error: 'storyId must be a valid integer',
          code: 'INVALID_STORY_ID'
        },
        { status: 400 }
      );
    }

    // Verify story exists
    const story = await db
      .select()
      .from(stories)
      .where(eq(stories.id, parseInt(storyId)))
      .limit(1);

    if (story.length === 0) {
      return NextResponse.json(
        { 
          error: 'Story not found',
          code: 'STORY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Create new comment with sanitized inputs
    const newComment = await db
      .insert(comments)
      .values({
        storyId: parseInt(storyId),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newComment[0], { status: 201 });
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

    // Validate ID is provided and valid
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    // Validate status field is provided
    if (!status) {
      return NextResponse.json(
        { 
          error: 'status is required',
          code: 'MISSING_STATUS'
        },
        { status: 400 }
      );
    }

    // Validate status is a valid enum value
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { 
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS'
        },
        { status: 400 }
      );
    }

    // Check if comment exists
    const existingComment = await db
      .select()
      .from(comments)
      .where(eq(comments.id, parseInt(id)))
      .limit(1);

    if (existingComment.length === 0) {
      return NextResponse.json(
        { 
          error: 'Comment not found',
          code: 'COMMENT_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Update comment status
    const updated = await db
      .update(comments)
      .set({
        status: status,
      })
      .where(eq(comments.id, parseInt(id)))
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