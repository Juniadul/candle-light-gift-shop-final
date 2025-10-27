import { Award, Shield, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "More than 5 Years of Service",
    description: "Trusted by thousands of happy couples since 2019",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "We use only the finest materials and printing techniques",
  },
  {
    icon: Award,
    title: "Award-Winning Designs",
    description: "Recognized for excellence in wedding stationery",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "Each invitation is crafted with love and attention to detail",
  },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trust & Premium Quality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            We're committed to making your special moments unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 group-hover:shadow-xl transition-shadow duration-300">
                <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-border py-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              5000+
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Happy Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              5+
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              500+
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Unique Designs
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              99%
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;