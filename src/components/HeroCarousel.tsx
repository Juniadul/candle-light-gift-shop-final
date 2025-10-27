import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7b1aaac1-5ba6-4562-8163-2e57d18f07b4/generated_images/elegant-luxury-wedding-invitation-showca-8b9570f6-20251009031309.jpg",
    title: "THE SUMMER SERENADE '25",
    subtitle: "SALE UPTO 80% OFF",
    description: "Your Favourite Wedding Invites Now at a Reimagined Price!",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7b1aaac1-5ba6-4562-8163-2e57d18f07b4/generated_images/luxury-acrylic-wedding-invitation-with-r-7dfa9585-20251009031319.jpg",
    title: "ROMANTIC ELEGANCE",
    subtitle: "NEW COLLECTION",
    description: "Discover Our Exquisite Wedding Invitation Designs",
  },
  {
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7b1aaac1-5ba6-4562-8163-2e57d18f07b4/generated_images/premium-wedding-stationery-collection-wi-3cc0687e-20251009031329.jpg",
    title: "LUXURY STATIONERY",
    subtitle: "PREMIUM QUALITY",
    description: "Crafted with Love for Your Special Day",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section className="relative w-full h-[600px] md:h-[650px] lg:h-[750px] overflow-hidden bg-muted">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
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
              <Button variant="hero" size="lg" className="uppercase text-sm sm:text-base font-semibold shadow-2xl hover:scale-105 transition-transform">
                Order Now
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
    </section>
  );
};

export default HeroCarousel;