import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

const VALID_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

function validateEmail(email: string): boolean {
  return email.includes('@') && email.length > 3;
}

function validateStatus(status: string): boolean {
  return VALID_STATUSES.includes(status);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single order by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const order = await db
        .select()
        .from(orders)
        .where(eq(orders.id, parseInt(id)))
        .limit(1);

      if (order.length === 0) {
        return NextResponse.json(
          { error: 'Order not found', code: 'ORDER_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(order[0], { status: 200 });
    }

    // List all orders with filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');

    let query = db.select().from(orders);

    if (status) {
      if (!validateStatus(status)) {
        return NextResponse.json(
          { error: 'Invalid status value', code: 'INVALID_STATUS' },
          { status: 400 }
        );
      }
      query = query.where(eq(orders.status, status));
    }

    const results = await query
      .orderBy(desc(orders.createdAt))
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

    // Validate required fields
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      totalAmount,
      items,
      notes,
    } = body;

    if (!customerName || !customerName.trim()) {
      return NextResponse.json(
        { error: 'Customer name is required', code: 'MISSING_CUSTOMER_NAME' },
        { status: 400 }
      );
    }

    if (!customerEmail || !customerEmail.trim()) {
      return NextResponse.json(
        { error: 'Customer email is required', code: 'MISSING_CUSTOMER_EMAIL' },
        { status: 400 }
      );
    }

    if (!validateEmail(customerEmail.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    if (!customerPhone || !customerPhone.trim()) {
      return NextResponse.json(
        { error: 'Customer phone is required', code: 'MISSING_CUSTOMER_PHONE' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.trim()) {
      return NextResponse.json(
        { error: 'Shipping address is required', code: 'MISSING_SHIPPING_ADDRESS' },
        { status: 400 }
      );
    }

    if (!totalAmount || typeof totalAmount !== 'number' || totalAmount <= 0) {
      return NextResponse.json(
        { error: 'Total amount must be a positive number', code: 'INVALID_TOTAL_AMOUNT' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items array is required and cannot be empty', code: 'MISSING_ITEMS' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      shippingAddress: shippingAddress.trim(),
      notes: notes ? notes.trim() : null,
      totalAmount: totalAmount,
      items: items,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newOrder = await db.insert(orders).values(sanitizedData).returning();

    return NextResponse.json(newOrder[0], { status: 201 });
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

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !status.trim()) {
      return NextResponse.json(
        { error: 'Status is required', code: 'MISSING_STATUS' },
        { status: 400 }
      );
    }

    if (!validateStatus(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS',
        },
        { status: 400 }
      );
    }

    // Check if order exists
    const existingOrder = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(id)))
      .limit(1);

    if (existingOrder.length === 0) {
      return NextResponse.json(
        { error: 'Order not found', code: 'ORDER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const updatedOrder = await db
      .update(orders)
      .set({
        status: status.trim(),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(orders.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedOrder[0], { status: 200 });
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

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if order exists
    const existingOrder = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(id)))
      .limit(1);

    if (existingOrder.length === 0) {
      return NextResponse.json(
        { error: 'Order not found', code: 'ORDER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deletedOrder = await db
      .delete(orders)
      .where(eq(orders.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Order deleted successfully',
        order: deletedOrder[0],
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