import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/db/index.js';
import { heroSlides } from './src/db/schema.js';
import { eq, asc } from 'drizzle-orm';

const app = express();
const PORT = 3001;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`${req.method} ${req.path} - ${res.statusCode}`);
    return originalSend.call(this, data);
  };
  next();
});

// Field transformation helpers
function dbToApi(dbRecord: any) {
  return {
    id: dbRecord.id,
    title: dbRecord.title,
    subtitle: dbRecord.subtitle,
    description: dbRecord.description,
    image: dbRecord.image,
    buttonText: dbRecord.button_text,
    buttonLink: dbRecord.button_link,
    displayOrder: dbRecord.display_order,
    isActive: Boolean(dbRecord.is_active),
    createdAt: dbRecord.created_at,
    updatedAt: dbRecord.updated_at
  };
}

function apiToDb(apiData: any) {
  const result: any = {};
  if (apiData.title !== undefined) result.title = apiData.title;
  if (apiData.subtitle !== undefined) result.subtitle = apiData.subtitle;
  if (apiData.description !== undefined) result.description = apiData.description;
  if (apiData.image !== undefined) result.image = apiData.image;
  if (apiData.buttonText !== undefined) result.button_text = apiData.buttonText;
  if (apiData.buttonLink !== undefined) result.button_link = apiData.buttonLink;
  if (apiData.displayOrder !== undefined) result.display_order = apiData.displayOrder;
  if (apiData.isActive !== undefined) result.is_active = apiData.isActive;
  return result;
}

// GET /api/hero-slides - List slides or get single slide by ID
app.get('/api/hero-slides', async (req: Request, res: Response) => {
  try {
    const { id, active } = req.query;

    // Single slide by ID
    if (id) {
      const slideId = parseInt(id as string);
      if (isNaN(slideId)) {
        return res.status(400).json({ 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        });
      }

      const result = await db.select()
        .from(heroSlides)
        .where(eq(heroSlides.id, slideId))
        .limit(1);

      if (result.length === 0) {
        return res.status(404).json({ 
          error: 'Slide not found',
          code: 'SLIDE_NOT_FOUND' 
        });
      }

      return res.status(200).json(dbToApi(result[0]));
    }

    // List slides with optional active filter
    let query = db.select().from(heroSlides);

    // Default to active slides only unless explicitly set to false
    if (active !== 'false') {
      query = query.where(eq(heroSlides.isActive, true));
    }

    const results = await query.orderBy(asc(heroSlides.displayOrder));
    
    return res.status(200).json(results.map(dbToApi));
  } catch (error: any) {
    console.error('GET /api/hero-slides error:', error);
    return res.status(500).json({ 
      error: 'Internal server error: ' + error.message 
    });
  }
});

// POST /api/hero-slides - Create new slide
app.post('/api/hero-slides', async (req: Request, res: Response) => {
  try {
    const { title, subtitle, description, image, buttonText, buttonLink, displayOrder, isActive } = req.body;

    // Validate required fields
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ 
        error: 'Title is required and must be a non-empty string',
        code: 'MISSING_TITLE' 
      });
    }

    if (!subtitle || typeof subtitle !== 'string' || !subtitle.trim()) {
      return res.status(400).json({ 
        error: 'Subtitle is required and must be a non-empty string',
        code: 'MISSING_SUBTITLE' 
      });
    }

    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ 
        error: 'Description is required and must be a non-empty string',
        code: 'MISSING_DESCRIPTION' 
      });
    }

    if (!image || typeof image !== 'string' || !image.trim()) {
      return res.status(400).json({ 
        error: 'Image is required and must be a non-empty string',
        code: 'MISSING_IMAGE' 
      });
    }

    if (!buttonText || typeof buttonText !== 'string' || !buttonText.trim()) {
      return res.status(400).json({ 
        error: 'Button text is required and must be a non-empty string',
        code: 'MISSING_BUTTON_TEXT' 
      });
    }

    if (!buttonLink || typeof buttonLink !== 'string' || !buttonLink.trim()) {
      return res.status(400).json({ 
        error: 'Button link is required and must be a non-empty string',
        code: 'MISSING_BUTTON_LINK' 
      });
    }

    const now = new Date().toISOString();

    const insertData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      image: image.trim(),
      button_text: buttonText.trim(),
      button_link: buttonLink.trim(),
      display_order: displayOrder !== undefined ? parseInt(displayOrder) : 0,
      is_active: isActive !== undefined ? Boolean(isActive) : true,
      created_at: now,
      updated_at: now
    };

    const newSlide = await db.insert(heroSlides)
      .values(insertData)
      .returning();

    return res.status(201).json(dbToApi(newSlide[0]));
  } catch (error: any) {
    console.error('POST /api/hero-slides error:', error);
    return res.status(500).json({ 
      error: 'Internal server error: ' + error.message 
    });
  }
});

// PUT /api/hero-slides - Update slide
app.put('/api/hero-slides', async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id || isNaN(parseInt(id as string))) {
      return res.status(400).json({ 
        error: 'Valid ID is required',
        code: 'INVALID_ID' 
      });
    }

    const slideId = parseInt(id as string);

    // Check if slide exists
    const existing = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, slideId))
      .limit(1);

    if (existing.length === 0) {
      return res.status(404).json({ 
        error: 'Slide not found',
        code: 'SLIDE_NOT_FOUND' 
      });
    }

    // Convert camelCase request to snake_case for DB
    const updates = apiToDb(req.body);

    // Validate string fields if provided
    if (updates.title !== undefined && (!updates.title || !updates.title.trim())) {
      return res.status(400).json({ 
        error: 'Title must be a non-empty string',
        code: 'INVALID_TITLE' 
      });
    }

    if (updates.subtitle !== undefined && (!updates.subtitle || !updates.subtitle.trim())) {
      return res.status(400).json({ 
        error: 'Subtitle must be a non-empty string',
        code: 'INVALID_SUBTITLE' 
      });
    }

    if (updates.description !== undefined && (!updates.description || !updates.description.trim())) {
      return res.status(400).json({ 
        error: 'Description must be a non-empty string',
        code: 'INVALID_DESCRIPTION' 
      });
    }

    if (updates.image !== undefined && (!updates.image || !updates.image.trim())) {
      return res.status(400).json({ 
        error: 'Image must be a non-empty string',
        code: 'INVALID_IMAGE' 
      });
    }

    if (updates.button_text !== undefined && (!updates.button_text || !updates.button_text.trim())) {
      return res.status(400).json({ 
        error: 'Button text must be a non-empty string',
        code: 'INVALID_BUTTON_TEXT' 
      });
    }

    if (updates.button_link !== undefined && (!updates.button_link || !updates.button_link.trim())) {
      return res.status(400).json({ 
        error: 'Button link must be a non-empty string',
        code: 'INVALID_BUTTON_LINK' 
      });
    }

    // Sanitize string fields
    if (updates.title) updates.title = updates.title.trim();
    if (updates.subtitle) updates.subtitle = updates.subtitle.trim();
    if (updates.description) updates.description = updates.description.trim();
    if (updates.image) updates.image = updates.image.trim();
    if (updates.button_text) updates.button_text = updates.button_text.trim();
    if (updates.button_link) updates.button_link = updates.button_link.trim();

    // Always update timestamp
    updates.updated_at = new Date().toISOString();

    const updated = await db.update(heroSlides)
      .set(updates)
      .where(eq(heroSlides.id, slideId))
      .returning();

    return res.status(200).json(dbToApi(updated[0]));
  } catch (error: any) {
    console.error('PUT /api/hero-slides error:', error);
    return res.status(500).json({ 
      error: 'Internal server error: ' + error.message 
    });
  }
});

// DELETE /api/hero-slides - Delete slide
app.delete('/api/hero-slides', async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id || isNaN(parseInt(id as string))) {
      return res.status(400).json({ 
        error: 'Valid ID is required',
        code: 'INVALID_ID' 
      });
    }

    const slideId = parseInt(id as string);

    // Check if slide exists
    const existing = await db.select()
      .from(heroSlides)
      .where(eq(heroSlides.id, slideId))
      .limit(1);

    if (existing.length === 0) {
      return res.status(404).json({ 
        error: 'Slide not found',
        code: 'SLIDE_NOT_FOUND' 
      });
    }

    const deleted = await db.delete(heroSlides)
      .where(eq(heroSlides.id, slideId))
      .returning();

    return res.status(200).json({
      message: 'Slide deleted successfully',
      slide: dbToApi(deleted[0])
    });
  } catch (error: any) {
    console.error('DELETE /api/hero-slides error:', error);
    return res.status(500).json({ 
      error: 'Internal server error: ' + error.message 
    });
  }
});

// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(500).json({ 
    error: 'Internal server error: ' + error.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/hero-slides`);
});