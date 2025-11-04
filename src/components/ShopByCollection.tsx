import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import * as db from "@/lib/database";

// Fallback image if category has no image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&q=80';

const ShopByCollection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await db.getCategories();
      if (result.success && result.data) {
        // Filter out "All Products" and take first 5 categories
        const filtered = result.data.filter(cat => cat.slug !== 'all-products').slice(0, 5);
        setCategories(filtered);
      }
      setLoading(false);
    };
    
    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-soft">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wide">
            Shop By Collection
          </h2>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gradient-soft">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase tracking-wide">
          Shop By Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {categories.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/products?category=${collection.slug}`}
              className="group flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Circular Image */}
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={collection.imageUrl || FALLBACK_IMAGE}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Title & Description */}
              <h3 className="text-base md:text-lg font-semibold text-center mb-1 group-hover:text-primary transition-colors duration-300">
                {collection.name}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground text-center">
                Browse collection
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;