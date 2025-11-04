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

    const results = await query.orderBy(desc(products.created_at));
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
      created_at: timestamp,
      updated_at: timestamp,
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
      .set({ ...product, updated_at: new Date().toISOString() })
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
    const results = await db.select().from(orders).orderBy(desc(orders.created_at));
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
      .where(eq(orders.customer_email, email))
      .orderBy(desc(orders.created_at));
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
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      shipping_address: order.shippingAddress,
      notes: order.notes,
      total_amount: order.totalAmount,
      items: order.items,
      status: 'pending',
      created_at: timestamp,
      updated_at: timestamp,
    }).returning();
    return { success: true, data: newOrder[0] };
  } catch (error) {
    console.error('Failed to create order:', error);
    return { success: false, error: 'Failed to create order' };
  }
};

export const updateOrderStatus = async (id: number | string, status: string) => {
  try {
    const orderId = typeof id === 'string' ? parseInt(id) : id;
    const updated = await db.update(orders)
      .set({ status, updated_at: new Date().toISOString() })
      .where(eq(orders.id, orderId))
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
    const results = await db.select().from(appointments).orderBy(desc(appointments.created_at));
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
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      preferred_date: appointment.preferredDate,
      preferred_time: appointment.preferredTime,
      occasion_type: appointment.occasionType,
      message: appointment.message,
      status: 'pending',
      created_at: new Date().toISOString(),
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
      .where(eq(testimonials.is_featured, true))
      .orderBy(desc(testimonials.created_at));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    return { success: false, error: 'Failed to load testimonials' };
  }
};

export const getAllTestimonials = async () => {
  try {
    const results = await db.select().from(testimonials)
      .orderBy(desc(testimonials.created_at));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    return { success: false, error: 'Failed to load testimonials' };
  }
};

export const createTestimonial = async (testimonial: {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  isFeatured: boolean;
}) => {
  try {
    const timestamp = new Date().toISOString();
    const newTestimonial = await db.insert(testimonials).values({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image,
      is_featured: testimonial.isFeatured,
      created_at: timestamp,
    }).returning();
    return { success: true, data: newTestimonial[0] };
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    return { success: false, error: 'Failed to create testimonial' };
  }
};

export const updateTestimonial = async (id: number, testimonial: Partial<{
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  isFeatured: boolean;
}>) => {
  try {
    const updateData: any = {};
    if (testimonial.name !== undefined) updateData.name = testimonial.name;
    if (testimonial.role !== undefined) updateData.role = testimonial.role;
    if (testimonial.content !== undefined) updateData.content = testimonial.content;
    if (testimonial.rating !== undefined) updateData.rating = testimonial.rating;
    if (testimonial.image !== undefined) updateData.image = testimonial.image;
    if (testimonial.isFeatured !== undefined) updateData.is_featured = testimonial.isFeatured;

    const updated = await db.update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id))
      .returning();
    return { success: true, data: updated[0] };
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    return { success: false, error: 'Failed to update testimonial' };
  }
};

export const deleteTestimonial = async (id: number) => {
  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    return { success: false, error: 'Failed to delete testimonial' };
  }
};

// Stories API
export const getStories = async () => {
  try {
    const results = await db.select().from(stories).orderBy(desc(stories.created_at));
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

export const createStory = async (story: {
  title: string;
  client: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}) => {
  try {
    const timestamp = new Date().toISOString();
    const newStory = await db.insert(stories).values({
      ...story,
      created_at: timestamp,
      updated_at: timestamp,
    }).returning();
    return { success: true, data: newStory[0] };
  } catch (error) {
    console.error('Failed to create story:', error);
    return { success: false, error: 'Failed to create story' };
  }
};

export const updateStory = async (id: number, story: Partial<{
  title: string;
  client: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}>) => {
  try {
    const updated = await db.update(stories)
      .set({ ...story, updated_at: new Date().toISOString() })
      .where(eq(stories.id, id))
      .returning();
    return { success: true, data: updated[0] };
  } catch (error) {
    console.error('Failed to update story:', error);
    return { success: false, error: 'Failed to update story' };
  }
};

export const deleteStory = async (id: number) => {
  try {
    await db.delete(stories).where(eq(stories.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete story:', error);
    return { success: false, error: 'Failed to delete story' };
  }
};

// Comments API
export const getCommentsByStoryId = async (storyId: number) => {
  try {
    const results = await db.select().from(comments)
      .where(and(eq(comments.story_id, storyId), eq(comments.status, 'approved')))
      .orderBy(desc(comments.created_at));
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
      story_id: comment.storyId,
      name: comment.name,
      email: comment.email,
      message: comment.message,
      status: 'pending',
      created_at: new Date().toISOString(),
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

export const createCategory = async (category: {
  name: string;
  slug: string;
  displayOrder?: number;
  imageUrl?: string;
}) => {
  try {
    const timestamp = new Date().toISOString();
    const newCategory = await db.insert(categories).values({
      name: category.name,
      slug: category.slug,
      displayOrder: category.displayOrder || 0,
      imageUrl: category.imageUrl || null,
      createdAt: timestamp,
    }).returning();
    return { success: true, data: newCategory[0] };
  } catch (error) {
    console.error('Failed to create category:', error);
    return { success: false, error: 'Failed to create category' };
  }
};

export const updateCategory = async (id: number, category: Partial<{
  name: string;
  slug: string;
  displayOrder: number;
  imageUrl: string;
}>) => {
  try {
    const updateData: any = {};
    if (category.name !== undefined) updateData.name = category.name;
    if (category.slug !== undefined) updateData.slug = category.slug;
    if (category.displayOrder !== undefined) updateData.displayOrder = category.displayOrder;
    if (category.imageUrl !== undefined) updateData.imageUrl = category.imageUrl;

    const updated = await db.update(categories)
      .set(updateData)
      .where(eq(categories.id, id))
      .returning();
    return { success: true, data: updated[0] };
  } catch (error) {
    console.error('Failed to update category:', error);
    return { success: false, error: 'Failed to update category' };
  }
};

export const deleteCategory = async (id: number) => {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete category:', error);
    return { success: false, error: 'Failed to delete category' };
  }
};

// Tracking Codes API
export const getTrackingCodes = async () => {
  try {
    const results = await db.select().from(trackingCodes).where(eq(trackingCodes.is_active, true));
    return { success: true, data: results };
  } catch (error) {
    console.error('Failed to load tracking codes:', error);
    return { success: false, error: 'Failed to load tracking codes' };
  }
};

export const getTrackingCodeByType = async (type: string) => {
  try {
    const result = await db.select().from(trackingCodes)
      .where(and(eq(trackingCodes.type, type), eq(trackingCodes.is_active, true)))
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
        .set({ code, is_active: true, updated_at: timestamp })
        .where(eq(trackingCodes.type, type))
        .returning();
      return { success: true, data: updated[0] };
    } else {
      const newCode = await db.insert(trackingCodes).values({
        type,
        code,
        is_active: true,
        created_at: timestamp,
        updated_at: timestamp,
      }).returning();
      return { success: true, data: newCode[0] };
    }
  } catch (error) {
    console.error('Failed to save tracking code:', error);
    return { success: false, error: 'Failed to save tracking code' };
  }
};