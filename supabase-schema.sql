-- Save The Date Invitations Database Schema
-- Run this in your Supabase SQL Editor to create the database tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  notes TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  occasion_type TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tracking Codes Table
CREATE TABLE IF NOT EXISTS tracking_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('meta_pixel', 'google_adsense')),
  code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(type, is_active)
);

-- Stories Table
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_tracking_codes_type ON tracking_codes(type);
CREATE INDEX IF NOT EXISTS idx_stories_date ON stories(date);
CREATE INDEX IF NOT EXISTS idx_comments_story_id ON comments(story_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tracking_codes_updated_at BEFORE UPDATE ON tracking_codes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
-- This will help you test the application with some initial data

INSERT INTO products (name, description, price, category, image) VALUES
  ('Elegant Purple Wedding Invitation', 'Beautiful purple invitation with gold foiling', 2500, 'paper', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800'),
  ('Royal Blue Acrylic Invitation', 'Stunning acrylic invitation with royal blue design', 3500, 'acrylic', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'),
  ('Semi-Transparent Invitation Card', 'Modern semi-transparent design with elegant typography', 2800, 'semi-transparent', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800')
ON CONFLICT DO NOTHING;

INSERT INTO stories (title, excerpt, content, image, date) VALUES
  ('Ayesha & Rafiq''s Elegant Wedding Invitation', 'A beautiful blend of traditional and modern design', 'Ayesha and Rafiq wanted something that reflected their love story - traditional yet contemporary. We created a stunning invitation suite with deep purple hues and gold foiling that perfectly captured their vision.', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800', '2024-03-15'),
  ('Sarah & Ahmed''s Royal Blue Reception Cards', 'Sophisticated elegance with royal blue accents', 'For their grand reception, Sarah and Ahmed opted for our signature royal blue collection. The semi-transparent design with gold lettering created an air of sophistication.', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', '2024-02-28')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to stories" ON stories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to approved comments" ON comments FOR SELECT USING (status = 'approved');

-- Create policies for public insert (for orders, appointments, comments)
CREATE POLICY "Allow public insert to orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to comments" ON comments FOR INSERT WITH CHECK (true);

-- Note: For admin operations, you'll need to set up authentication and admin-specific policies
-- or use the service role key (which bypasses RLS) in your admin panel