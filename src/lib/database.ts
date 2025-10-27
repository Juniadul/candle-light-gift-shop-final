import { db } from '@/db';
import { products, orders, appointments, testimonials, stories, comments, categories, trackingCodes } from '@/db/schema';
import { eq, desc, and, or, like } from 'drizzle-orm';

// Products API
export const getProducts = async (filters?: { category?: string; search?: string }) => {
  try {
    let query = db.select().from(products);

    const conditions = [];
    if (filters?.category && filters.category !== 'all') {
      conditions.push(eq(products.category, filters.category));
    }
    if (filters?.search) {
      conditions.push(
        or(
          like(products.name, `%${filters.search}%`),
          like(products.description, `%${filters.search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.orderBy(desc(products.createdAt));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load products:', error);
    return { success: false, error: 'Failed to load products' };
  }
};

export const getProductById = async (id: number) => {
  try {
    const product = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return { success: true, data: product[0] };
  } catch (error) {
    console.error('Failed to load product:', error);
    return { success: false, error: 'Failed to load product' };
  }
};

export const createProduct = async (product: {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}) => {
  try {
    const timestamp = new Date().toISOString();
    const newProduct = await db.insert(products).values({
      ...product,
      createdAt: timestamp,
      updatedAt: timestamp,
    }).returning();
    return { success: true, data: newProduct[0] };
  } catch (error) {
    console.error('Failed to create product:', error);
    return { success: false, error: 'Failed to create product' };
  }
};

export const updateProduct = async (id: number, product: Partial<{
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}>) => {
  try {
    const updated = await db.update(products)
      .set({ ...product, updatedAt: new Date().toISOString() })
      .where(eq(products.id, id))
      .returning();
    return { success: true, data: updated[0] };
  } catch (error) {
    console.error('Failed to update product:', error);
    return { success: false, error: 'Failed to update product' };
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await db.delete(products).where(eq(products.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
};

// Orders API
export const getOrders = async () => {
  try {
    const results = await db.select().from(orders).orderBy(desc(orders.createdAt));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load orders:', error);
    return { success: false, error: 'Failed to load orders' };
  }
};

export const getOrderById = async (id: number) => {
  try {
    const result = await db.select().from(orders)
      .where(eq(orders.id, id))
      .limit(1);
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Failed to load order:', error);
    return { success: false, error: 'Failed to load order' };
  }
};

export const getOrdersByEmail = async (email: string) => {
  try {
    const results = await db.select().from(orders)
      .where(eq(orders.customerEmail, email))
      .orderBy(desc(orders.createdAt));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load orders:', error);
    return { success: false, error: 'Failed to load orders' };
  }
};

export const createOrder = async (order: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  notes?: string;
  totalAmount: number;
  items: any[];
}) => {
  try {
    const timestamp = new Date().toISOString();
    const newOrder = await db.insert(orders).values({
      ...order,
      status: 'pending',
      createdAt: timestamp,
      updatedAt: timestamp,
    }).returning();
    return { success: true, data: newOrder[0] };
  } catch (error) {
    console.error('Failed to create order:', error);
    return { success: false, error: 'Failed to create order' };
  }
};

export const updateOrderStatus = async (id: number, status: string) => {
  try {
    const updated = await db.update(orders)
      .set({ status, updatedAt: new Date().toISOString() })
      .where(eq(orders.id, id))
      .returning();
    return { success: true, data: updated[0] };
  } catch (error) {
    console.error('Failed to update order:', error);
    return { success: false, error: 'Failed to update order' };
  }
};

// Appointments API
export const getAppointments = async () => {
  try {
    const results = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load appointments:', error);
    return { success: false, error: 'Failed to load appointments' };
  }
};

export const createAppointment = async (appointment: {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  occasionType: string;
  message?: string;
}) => {
  try {
    const newAppointment = await db.insert(appointments).values({
      ...appointment,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).returning();
    return { success: true, data: newAppointment[0] };
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return { success: false, error: 'Failed to create appointment' };
  }
};

export const updateAppointmentStatus = async (id: number, status: string) => {
  try {
    const updated = await db.update(appointments)
      .set({ status })
      .where(eq(appointments.id, id))
      .returning();
    return { success: true, data: updated[0] };
  } catch (error) {
    console.error('Failed to update appointment:', error);
    return { success: false, error: 'Failed to update appointment' };
  }
};

// Testimonials API
export const getTestimonials = async () => {
  try {
    const results = await db.select().from(testimonials)
      .where(eq(testimonials.isFeatured, true))
      .orderBy(desc(testimonials.createdAt));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    return { success: false, error: 'Failed to load testimonials' };
  }
};

// Stories API
export const getStories = async () => {
  try {
    const results = await db.select().from(stories).orderBy(desc(stories.createdAt));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load stories:', error);
    return { success: false, error: 'Failed to load stories' };
  }
};

export const getStoryById = async (id: number) => {
  try {
    const story = await db.select().from(stories).where(eq(stories.id, id)).limit(1);
    return { success: true, data: story[0] };
  } catch (error) {
    console.error('Failed to load story:', error);
    return { success: false, error: 'Failed to load story' };
  }
};

// Comments API
export const getCommentsByStoryId = async (storyId: number) => {
  try {
    const results = await db.select().from(comments)
      .where(and(eq(comments.storyId, storyId), eq(comments.status, 'approved')))
      .orderBy(desc(comments.createdAt));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load comments:', error);
    return { success: false, error: 'Failed to load comments' };
  }
};

export const createComment = async (comment: {
  storyId: number;
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const newComment = await db.insert(comments).values({
      ...comment,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).returning();
    return { success: true, data: newComment[0] };
  } catch (error) {
    console.error('Failed to create comment:', error);
    return { success: false, error: 'Failed to create comment' };
  }
};

// Categories API
export const getCategories = async () => {
  try {
    const results = await db.select().from(categories).orderBy(categories.displayOrder);
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load categories:', error);
    return { success: false, error: 'Failed to load categories' };
  }
};

// Tracking Codes API
export const getTrackingCodes = async () => {
  try {
    const results = await db.select().from(trackingCodes).where(eq(trackingCodes.isActive, true));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load tracking codes:', error);
    return { success: false, error: 'Failed to load tracking codes' };
  }
};

export const getTrackingCodeByType = async (type: string) => {
  try {
    const result = await db.select().from(trackingCodes)
      .where(and(eq(trackingCodes.type, type), eq(trackingCodes.isActive, true)))
      .limit(1);
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Failed to load tracking code:', error);
    return { success: false, error: 'Failed to load tracking code' };
  }
};

export const saveTrackingCode = async (type: string, code: string) => {
  try {
    const timestamp = new Date().toISOString();
    
    // Check if exists
    const existing = await db.select().from(trackingCodes).where(eq(trackingCodes.type, type)).limit(1);
    
    if (existing.length > 0) {
      const updated = await db.update(trackingCodes)
        .set({ code, isActive: true, updatedAt: timestamp })
        .where(eq(trackingCodes.type, type))
        .returning();
      return { success: true, data: updated[0] };
    } else {
      const newCode = await db.insert(trackingCodes).values({
        type,
        code,
        isActive: true,
        createdAt: timestamp,
        updatedAt: timestamp,
      }).returning();
      return { success: true, data: newCode[0] };
    }
  } catch (error) {
    console.error('Failed to save tracking code:', error);
    return { success: false, error: 'Failed to save tracking code' };
  }
};