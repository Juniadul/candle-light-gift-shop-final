import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Backend API base URL
const API_BASE = 'http://localhost:3001';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  displayOrder: number;
  isActive: boolean;
}

// Fallback slides if API is unavailable
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'Premium Collections',
    subtitle: 'Elegant Wedding Invitations',
    description: 'Discover our exquisite collection of handcrafted wedding invitations and gifts',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    buttonText: 'Shop Collections',
    buttonLink: '/products',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    title: 'Special Occasions',
    subtitle: 'Gifts That Create Memories',
    description: 'From birthdays to anniversaries, find the perfect gift for every celebration',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200',
    buttonText: 'Browse Gifts',
    buttonLink: '/products',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    title: 'Custom Invitations',
    subtitle: 'Your Story, Beautifully Told',
    description: 'Personalized invitations that make your special moments unforgettable',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200',
    buttonText: 'Customize Now',
    buttonLink: '/contact',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    title: 'Free Shipping',
    subtitle: 'Orders Over 100 Pieces',
    description: 'Get free delivery on bulk orders. Perfect for weddings and large events',
    image: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1200',
    buttonText: 'Learn More',
    buttonLink: '/products',
    displayOrder: 4,
    isActive: true,
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/hero-slides`);
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setSlides(data);
          } else {
            // Use fallback if no slides in database
            setSlides(FALLBACK_SLIDES);
          }
        } else {
          // API not available, use fallback
          setSlides(FALLBACK_SLIDES);
        }
      } catch (error) {
        console.log('Using fallback slides (backend may not be running)');
        setSlides(FALLBACK_SLIDES);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  if (loading) {
    return (
      <section className="relative w-full h-[600px] md:h-[650px] lg:h-[750px] bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading slides...</p>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative w-full h-[600px] md:h-[650px] lg:h-[750px] bg-muted flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No slides available</h2>
          <p className="text-muted-foreground">Please add hero slides in the admin panel</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[600px] md:h-[650px] lg:h-[750px] overflow-hidden bg-muted">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover animate-zoom-in"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content - Centered with proper spacing */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 pb-16 md:pb-20">
            <div
              className={`text-center max-w-3xl transition-all duration-700 delay-200 ${
                index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-xs sm:text-sm md:text-base text-white/90 mb-3 md:mb-4 uppercase tracking-[0.2em] font-light">
                {slide.title}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-2xl leading-tight tracking-tight">
                {slide.subtitle}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/95 mb-6 md:mb-10 px-4 drop-shadow-lg leading-relaxed">
                {slide.description}
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="uppercase text-sm sm:text-base font-semibold shadow-2xl hover:scale-105 transition-transform"
                onClick={() => navigate(slide.buttonLink)}
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-white/30 w-10 h-10 sm:w-12 sm:h-12"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-white/30 w-10 h-10 sm:w-12 sm:h-12"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;