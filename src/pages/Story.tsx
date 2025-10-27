import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Story = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-soft">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              More than 5 years of service, trust & premium quality
            </p>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg mb-8">
                <h2 className="text-3xl font-bold mb-4 text-primary">Welcome to Candle Light Gift Shop</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are Bangladesh's premier destination for bespoke wedding invitations and stationery. 
                  For over 5 years, we've been crafting beautiful, personalized invitations that tell your 
                  unique love story.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our journey began with a simple belief: every wedding deserves invitations as unique and 
                  special as the couple themselves. From elegant paper invitations to modern acrylic designs, 
                  we offer a wide range of options to match your wedding theme and personality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6 shadow-lg">
                  <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                  <p className="text-sm">
                    To create stunning, high-quality wedding stationery that captures the essence of your 
                    special day and leaves a lasting impression on your guests.
                  </p>
                </div>

                <div className="bg-gradient-accent text-accent-foreground rounded-lg p-6 shadow-lg">
                  <h3 className="text-2xl font-bold mb-3">Our Promise</h3>
                  <p className="text-sm">
                    Premium quality materials, exceptional craftsmanship, timely delivery, and 
                    personalized service every step of the way.
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">What Makes Us Special</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-primary">5+</span>
                    </div>
                    <h3 className="font-semibold mb-2">Years of Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      Trusted by hundreds of happy couples
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-secondary">100%</span>
                    </div>
                    <h3 className="font-semibold mb-2">Custom Designs</h3>
                    <p className="text-sm text-muted-foreground">
                      Every invitation is uniquely yours
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-accent">★★★★★</span>
                    </div>
                    <h3 className="font-semibold mb-2">5-Star Service</h3>
                    <p className="text-sm text-muted-foreground">
                      Rated excellent by our clients
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
                <p className="text-muted-foreground mb-8">
                  Let us help you create beautiful invitations for your special day
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/products">
                    <Button variant="gradient" size="lg">
                      Browse Our Collections
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Story;