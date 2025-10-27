import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ShoppingCart, Heart, Share2, Check, Palette, Type, Image as ImageIcon, Loader2 } from "lucide-react";
import * as db from "@/lib/database";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({
    text: "",
    color: "#6A1B9A",
    font: "Playfair Display",
    additionalNotes: "",
    uploadedImage: null as string | null,
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      const result = await db.getProductById(parseInt(id));
      
      if (result.success && result.data) {
        setProduct(result.data);
        
        // Load related products
        const relatedResult = await db.getProducts({ category: result.data.category });
        if (relatedResult.success && relatedResult.data) {
          const filtered = relatedResult.data.filter(p => p.id !== result.data.id).slice(0, 4);
          setRelatedProducts(filtered);
        }
      } else {
        toast.error('Product not found');
      }
      
      setLoading(false);
    };
    
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      quantity,
      customization: customization.text || customization.uploadedImage ? customization : undefined,
    });
    toast.success("Added to cart!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomization({ ...customization, uploadedImage: reader.result as string });
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
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
      <main className="flex-1 py-8 md:py-12 px-4">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="text-muted-foreground hover:text-primary">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-border shadow-xl">
                <img
                  key={`${product.id}-${product.image}-${product.updated_at || product.created_at}`}
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>
              {customization.uploadedImage && (
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary shadow-lg">
                  <img
                    src={customization.uploadedImage}
                    alt="Uploaded customization"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Product Info & Customization */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {product.category.replace("-", " ").toUpperCase()}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-primary mb-4">৳{product.price}</p>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Customization Options */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Customize Your Card
                  </h3>

                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="text">
                        <Type className="w-4 h-4 mr-2" />
                        Text
                      </TabsTrigger>
                      <TabsTrigger value="color">
                        <Palette className="w-4 h-4 mr-2" />
                        Color
                      </TabsTrigger>
                      <TabsTrigger value="image">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Image
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="text" className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="customText">Custom Text</Label>
                        <Input
                          id="customText"
                          placeholder="e.g., John & Jane"
                          value={customization.text}
                          onChange={(e) =>
                            setCustomization({ ...customization, text: e.target.value })
                          }
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="font">Font Style</Label>
                        <select
                          id="font"
                          value={customization.font}
                          onChange={(e) =>
                            setCustomization({ ...customization, font: e.target.value })
                          }
                          className="w-full mt-2 px-3 py-2 border rounded-md"
                        >
                          <option value="Playfair Display">Playfair Display</option>
                          <option value="Great Vibes">Great Vibes</option>
                          <option value="Cinzel">Cinzel</option>
                          <option value="Cormorant Garamond">Cormorant Garamond</option>
                        </select>
                      </div>
                    </TabsContent>

                    <TabsContent value="color" className="space-y-4 mt-4">
                      <div>
                        <Label>Accent Color</Label>
                        <div className="flex gap-3 mt-3">
                          {["#6A1B9A", "#283593", "#C62828", "#D4AF37", "#000000"].map((color) => (
                            <button
                              key={color}
                              onClick={() => setCustomization({ ...customization, color })}
                              className={`w-10 h-10 rounded-full border-2 transition-all ${
                                customization.color === color
                                  ? "border-foreground scale-110"
                                  : "border-border"
                              }`}
                              style={{ backgroundColor: color }}
                            >
                              {customization.color === color && (
                                <Check className="w-5 h-5 text-white mx-auto" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="image" className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="imageUpload">Upload Custom Design</Label>
                        <Input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Upload your own design or photo (JPG, PNG)
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-4">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requests or instructions..."
                      value={customization.additionalNotes}
                      onChange={(e) =>
                        setCustomization({ ...customization, additionalNotes: e.target.value })
                      }
                      className="mt-2 min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label className="text-base font-semibold">Quantity:</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-9 w-9"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-9 w-9"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="gradient"
                    size="lg"
                    className="flex-1 gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Premium Quality</p>
                    <p className="text-sm text-muted-foreground">High-quality materials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Fast Delivery</p>
                    <p className="text-sm text-muted-foreground">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Customizable</p>
                    <p className="text-sm text-muted-foreground">Fully personalized</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Support</p>
                    <p className="text-sm text-muted-foreground">24/7 assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <img
                          key={`${relatedProduct.id}-${relatedProduct.image}`}
                          src={relatedProduct.image || FALLBACK_IMAGE}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-1">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-primary font-bold">৳{relatedProduct.price}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;