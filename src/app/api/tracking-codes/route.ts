import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trackingCodes } from '@/db/schema';
import { eq } from 'drizzle-orm';

const VALID_TYPES = ['meta_pixel', 'google_adsense'] as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const active = searchParams.get('active') !== 'false';

    // Get tracking code by type
    if (type) {
      const trackingCode = await db.select()
        .from(trackingCodes)
        .where(eq(trackingCodes.type, type))
        .limit(1);

      if (trackingCode.length === 0) {
        return NextResponse.json(
          { error: 'Tracking code not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(trackingCode[0]);
    }

    // Get all tracking codes, filtered by active status
    let query = db.select().from(trackingCodes);

    if (active) {
      query = query.where(eq(trackingCodes.isActive, true));
    }

    const results = await query;
    return NextResponse.json(results);

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
    const { type, code, isActive } = body;

    // Validate required fields
    if (!type) {
      return NextResponse.json(
        { error: 'Type is required', code: 'MISSING_TYPE' },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required', code: 'MISSING_CODE' },
        { status: 400 }
      );
    }

    // Validate type is valid enum value
    if (!VALID_TYPES.includes(type as any)) {
      return NextResponse.json(
        { 
          error: `Invalid type. Must be one of: ${VALID_TYPES.join(', ')}`,
          code: 'INVALID_TYPE' 
        },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const activeStatus = isActive !== undefined ? isActive : true;

    // Check if tracking code with this type already exists
    const existing = await db.select()
      .from(trackingCodes)
      .where(eq(trackingCodes.type, type))
      .limit(1);

    if (existing.length > 0) {
      // Update existing tracking code
      const updated = await db.update(trackingCodes)
        .set({
          code,
          isActive: activeStatus,
          updatedAt: timestamp
        })
        .where(eq(trackingCodes.type, type))
        .returning();

      return NextResponse.json(updated[0], { status: 200 });
    } else {
      // Create new tracking code
      const newTrackingCode = await db.insert(trackingCodes)
        .values({
          type,
          code,
          isActive: activeStatus,
          createdAt: timestamp,
          updatedAt: timestamp
        })
        .returning();

      return NextResponse.json(newTrackingCode[0], { status: 201 });
    }

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}