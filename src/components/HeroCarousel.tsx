import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

// Hero slides - These will ALWAYS display
const HERO_SLIDES: HeroSlide[] = [
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="relative w-full h-[600px] md:h-[650px] lg:h-[750px] overflow-hidden bg-muted">
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
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
              className="w-full h-full object-cover"
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

      {/* Dots Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, index) => (
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
    </section>
  );
};

export default HeroCarousel;