import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Gift, Cake, Sparkles } from "lucide-react";

const events = [
  {
    icon: Heart,
    title: "Wedding",
    description: "Elegant invitations for your special day",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
    link: "/category/wedding",
  },
  {
    icon: Cake,
    title: "Birthday",
    description: "Celebrate life's milestones in style",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&q=80",
    link: "/category/birthday",
  },
  {
    icon: Gift,
    title: "Anniversary",
    description: "Mark years of love and togetherness",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80",
    link: "/category/anniversary",
  },
  {
    icon: Sparkles,
    title: "Special Events",
    description: "For all your celebration needs",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&q=80",
    link: "/category/special",
  },
];

const ShopByEvent = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Find Perfect Invitations
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Shop by Event</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Discover beautiful designs tailored for every special occasion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Link key={event.title} to={event.link} className="group">
              <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <event.icon className="w-8 h-8 text-white mb-2" />
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByEvent;