# Hero Slides Setup Guide

## ✅ Your Hero Slides Are Now Working!

Your homepage now displays **4 beautiful hero slides** that auto-rotate every 5 seconds.

---

## 🎯 How It Works

### **Homepage (Frontend Only)**
- The hero carousel displays slides immediately using built-in fallback data
- **Works perfectly when published** - no backend server needed
- Shows 4 professional slides for your Candlelight Gift Shop

### **Admin Panel (Requires Backend)**
- To edit slides via the admin panel, you need to run the backend server
- Located at: `/admin/hero-slides`

---

## 🚀 Development Setup

### **Option 1: Homepage Only (No Backend Needed)**
```bash
npm run dev
```
- Visit: `http://localhost:5173`
- Hero slides will display using fallback data
- Perfect for frontend development

### **Option 2: Full Setup with Admin Panel**
```bash
npm run dev:all
```
This runs both:
- **Frontend** (Vite): `http://localhost:5173`
- **Backend** (Express): `http://localhost:3001`

Or run them separately:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

---

## 📝 Managing Hero Slides

### **With Backend Running:**
1. Start backend: `npm run server`
2. Go to: `/admin/hero-slides`
3. Add, edit, delete, or reorder slides
4. Changes appear on homepage immediately

### **Without Backend:**
- Homepage uses fallback slides (always works)
- Admin panel will show "Failed to load hero slides"

---

## 🌐 Publishing Your Site

When you publish your site, the hero carousel will **automatically work** using the fallback slides. No backend server needed!

### **Important for Publishing:**
- The hero slides will display correctly
- The admin panel won't work without deploying the backend server separately
- If you want dynamic slide management after publishing, you'll need to:
  1. Deploy the backend server (e.g., to Railway, Render, or Heroku)
  2. Update the `API_BASE` URL in:
     - `src/components/HeroCarousel.tsx`
     - `src/pages/admin/AdminHeroSlides.tsx`

---

## 🎨 Your Current Slides

1. **Premium Collections** - Elegant Wedding Invitations
2. **Special Occasions** - Gifts That Create Memories
3. **Custom Invitations** - Your Story, Beautifully Told
4. **Free Shipping** - Orders Over 100 Pieces

---

## 🔧 Technical Details

### **Backend API Endpoints:**
- `GET /api/hero-slides` - Get active slides
- `GET /api/hero-slides?active=false` - Get all slides
- `POST /api/hero-slides` - Create new slide
- `PUT /api/hero-slides?id={id}` - Update slide
- `DELETE /api/hero-slides?id={id}` - Delete slide

### **Database Table:**
- Table: `hero_slides`
- Located: `src/db/schema.ts`
- Seed file: `src/db/seeds/hero_slides.ts`

---

## ✨ Features

- ✅ Auto-rotating carousel (5-second intervals)
- ✅ Smooth animations and transitions
- ✅ Navigation arrows
- ✅ Dot indicators
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Fallback slides for reliability
- ✅ Admin panel for easy management

---

## 🎉 Ready to Use!

Your hero slides are now live on your homepage! Just refresh your browser to see them in action.

For questions or issues, check the console logs for any errors.
