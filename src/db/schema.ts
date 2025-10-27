import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// Products table
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Orders table
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  shippingAddress: text('shipping_address').notNull(),
  notes: text('notes'),
  totalAmount: real('total_amount').notNull(),
  status: text('status').notNull().default('pending'),
  items: text('items', { mode: 'json' }).notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Appointments table
export const appointments = sqliteTable('appointments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  preferredDate: text('preferred_date').notNull(),
  preferredTime: text('preferred_time').notNull(),
  occasionType: text('occasion_type').notNull(),
  message: text('message'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

// Testimonials table
export const testimonials = sqliteTable('testimonials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  role: text('role').notNull(),
  content: text('content').notNull(),
  rating: integer('rating').notNull(),
  image: text('image').notNull(),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
});

// Stories table
export const stories = sqliteTable('stories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  client: text('client').notNull(),
  date: text('date').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  image: text('image').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Comments table
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  storyId: integer('story_id').references(() => stories.id).notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

// Categories table
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: text('created_at').notNull(),
});

// Tracking codes table
export const trackingCodes = sqliteTable('tracking_codes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  type: text('type').notNull().unique(),
  code: text('code').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});