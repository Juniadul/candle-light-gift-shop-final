import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import * as db from "@/lib/database";
import { Product } from "@/lib/supabase";

// Map collection titles to product categories
const categoryMap: Record<string, { category: string; title: string; description: string }> = {
  "floral-elegance": {
    category: "paper",
    title: "Floral Elegance",
    description: "Romantic watercolor designs with beautiful floral patterns"
  },
  "classic-romance": {
    category: "paper",
    title: "Classic Romance",
    description: "Timeless red & blue accents for traditional celebrations"
  },
  "royal-opulence": {
    category: "acrylic",
    title: "Royal Opulence",
    description: "Golden ornate patterns with luxurious details"
  },
  "burgundy-luxe": {
    category: "semi-transparent",
    title: "Burgundy Luxe",
    description: "Sophisticated burgundy designs"
  },
  "purple-majesty": {
    category: "paper",
    title: "Purple Majesty",
    description: "Regal purple designs for elegant celebrations"
  },
  "wedding": {
    category: "paper",
    title: "Wedding Invitations",
    description: "Elegant invitations for your special day"
  },
  "birthday": {
    category: "paper",
    title: "Birthday Invitations",
    description: "Celebrate life's milestones in style"
  },
  "anniversary": {
    category: "acrylic",
    title: "Anniversary Invitations",
    description: "Mark years of love and togetherness"
  },
  "special": {
    category: "semi-transparent",
    title: "Special Events",
    description: "For all your celebration needs"
  },
  "favor-box": {
    category: "favor-box",
    title: "Favor Boxes",
    description: "Elegant gift boxes for your special occasions"
  },
  "gift-envelope": {
    category: "gift-envelope",
    title: "Gift Envelopes",
    description: "Beautiful envelopes for monetary gifts"
  },
  "goody-bag": {
    category: "goody-bag",
    title: "Goody Bags",
    description: "Stylish bags for party favors and gifts"
  },
  "accessories": {
    category: "accessories",
    title: "Wedding Accessories",
    description: "Complete your celebration with beautiful accessories"
  },
  "paper": {
    category: "paper",
    title: "Paper Invitations",
    description: "Classic paper invitations with premium quality"
  },
  "acrylic": {
    category: "acrylic",
    title: "Acrylic Invitations",
    description: "Modern acrylic invitations with elegant designs"
  },
  "semi-transparent": {
    category: "semi-transparent",
    title: "Semi-Transparent Invitations",
    description: "Delicate vellum and frosted designs"
  },
  "dala": {
    category: "dala",
    title: "Dala (Decorative Plates)",
    description: "Traditional decorative plates for ceremonies"
  },
};

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = slug ? categoryMap[slug] : null;

  useEffect(() => {
    loadProducts();
  }, [slug]);

  const loadProducts = async () => {
    setLoading(true);
    const result = await db.getProducts();
    if (result.success && result.data) {
      // Filter products by category
      const filtered = categoryInfo
        ? result.data.filter((p) => p.category === categoryInfo.category)
        : result.data;
      setProducts(filtered);
    } else {
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <Link to="/">
              <Button variant="gradient">Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-white py-16 px-4">
          <div className="container mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              {categoryInfo.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl text-white/90 animate-fade-in">
              {categoryInfo.description}
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">No Products Found</h3>
                <p className="text-muted-foreground mb-6">
                  We're currently updating our collection. Please check back soon!
                </p>
                <Link to="/products">
                  <Button variant="gradient">Browse All Products</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <p className="text-muted-foreground">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden animate-fade-in hover:shadow-xl transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Link to={`/product/${product.id}`}>
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        </div>
                      </Link>
                      <CardContent className="p-5">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-primary">
                            ৳{product.price}
                          </span>
                          <Button
                            variant="gradient"
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="gap-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Category;