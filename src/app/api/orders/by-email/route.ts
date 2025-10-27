import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ 
        error: 'Email parameter is required',
        code: 'MISSING_EMAIL' 
      }, { status: 400 });
    }

    const customerOrders = await db.select()
      .from(orders)
      .where(eq(orders.customerEmail, email))
      .orderBy(desc(orders.createdAt));

    return NextResponse.json(customerOrders, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}