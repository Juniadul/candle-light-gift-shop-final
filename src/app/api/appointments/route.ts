import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { appointments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidStatus(status: string): status is typeof VALID_STATUSES[number] {
  return VALID_STATUSES.includes(status as typeof VALID_STATUSES[number]);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const statusFilter = searchParams.get('status');

    let query = db.select().from(appointments).orderBy(desc(appointments.createdAt));

    if (statusFilter) {
      if (!isValidStatus(statusFilter)) {
        return NextResponse.json({
          error: 'Invalid status value',
          code: 'INVALID_STATUS'
        }, { status: 400 });
      }
      query = query.where(eq(appointments.status, statusFilter));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, preferredDate, preferredTime, occasionType, message } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({
        error: 'Name is required and must be a non-empty string',
        code: 'MISSING_NAME'
      }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json({
        error: 'Email is required and must be a non-empty string',
        code: 'MISSING_EMAIL'
      }, { status: 400 });
    }

    if (!isValidEmail(email.trim())) {
      return NextResponse.json({
        error: 'Invalid email format',
        code: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json({
        error: 'Phone is required and must be a non-empty string',
        code: 'MISSING_PHONE'
      }, { status: 400 });
    }

    if (!preferredDate || typeof preferredDate !== 'string' || preferredDate.trim() === '') {
      return NextResponse.json({
        error: 'Preferred date is required and must be a non-empty string',
        code: 'MISSING_PREFERRED_DATE'
      }, { status: 400 });
    }

    if (!preferredTime || typeof preferredTime !== 'string' || preferredTime.trim() === '') {
      return NextResponse.json({
        error: 'Preferred time is required and must be a non-empty string',
        code: 'MISSING_PREFERRED_TIME'
      }, { status: 400 });
    }

    if (!occasionType || typeof occasionType !== 'string' || occasionType.trim() === '') {
      return NextResponse.json({
        error: 'Occasion type is required and must be a non-empty string',
        code: 'MISSING_OCCASION_TYPE'
      }, { status: 400 });
    }

    const newAppointment = await db.insert(appointments).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preferredDate: preferredDate.trim(),
      preferredTime: preferredTime.trim(),
      occasionType: occasionType.trim(),
      message: message ? (typeof message === 'string' ? message.trim() : null) : null,
      status: 'pending',
      createdAt: new Date().toISOString()
    }).returning();

    return NextResponse.json(newAppointment[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({
        error: 'Valid ID is required',
        code: 'INVALID_ID'
      }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status || typeof status !== 'string') {
      return NextResponse.json({
        error: 'Status is required and must be a string',
        code: 'MISSING_STATUS'
      }, { status: 400 });
    }

    if (!isValidStatus(status)) {
      return NextResponse.json({
        error: `Invalid status value. Must be one of: ${VALID_STATUSES.join(', ')}`,
        code: 'INVALID_STATUS'
      }, { status: 400 });
    }

    const existingAppointment = await db.select()
      .from(appointments)
      .where(eq(appointments.id, parseInt(id)))
      .limit(1);

    if (existingAppointment.length === 0) {
      return NextResponse.json({
        error: 'Appointment not found',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    const updated = await db.update(appointments)
      .set({ status })
      .where(eq(appointments.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({
        error: 'Appointment not found',
        code: 'NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}