import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const accessories = [
  {
    name: "Favor Boxes",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&q=80",
    price: "From ৳150",
    link: "/products?category=favor-box",
  },
  {
    name: "Gift Envelopes",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80",
    price: "From ৳80",
    link: "/products?category=gift-envelope",
  },
  {
    name: "Goody Bags",
    image: "https://images.unsplash.com/photo-1549492423-400259a2e574?w=500&q=80",
    price: "From ৳200",
    link: "/products?category=goody-bag",
  },
  {
    name: "Wedding Accessories",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&q=80",
    price: "From ৳300",
    link: "/products?category=accessories",
  },
];

const WeddingAccessories = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Complete Your Celebration
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Wedding Accessories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Perfectly curated accessories to complement your invitations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accessories.map((item) => (
            <Card
              key={item.name}
              className="group overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={item.link}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <CardContent className="p-5 text-center">
                  <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                  <p className="text-primary font-semibold">{item.price}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button variant="gradient" size="lg" className="uppercase">
              View All Accessories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeddingAccessories;