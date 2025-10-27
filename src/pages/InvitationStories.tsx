import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Star, Loader2 } from "lucide-react";
import * as db from "@/lib/database";

const InvitationStories = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      const result = await db.getStories();
      if (result.success && result.data) {
        setStories(result.data);
      }
      setLoading(false);
    };
    
    loadStories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Customized Invitation Stories
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90 animate-fade-in">
              Real couples, real weddings, and the beautiful invitations that set the tone for their special day. 
              Discover how we brought their unique visions to life.
            </p>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : stories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No stories available yet</p>
              </div>
            ) : (
              <div className="grid gap-12">
                {stories.map((story, index) => (
                  <article
                    key={story.id}
                    className={`grid md:grid-cols-2 gap-8 items-center animate-fade-in ${
                      index % 2 === 1 ? 'md:grid-flow-dense' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <div className="relative rounded-lg overflow-hidden shadow-2xl group">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                      <div className="flex items-center gap-2 text-primary mb-4">
                        <Calendar className="h-5 w-5" />
                        <span className="text-sm font-medium">{story.date}</span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                        {story.title}
                      </h2>
                      
                      <div className="flex items-center gap-2 mb-6">
                        <Heart className="h-5 w-5 text-accent fill-accent" />
                        <p className="text-lg text-muted-foreground">{story.client}</p>
                      </div>
                      
                      <p className="text-lg mb-6 leading-relaxed">
                        {story.excerpt}
                      </p>
                      
                      <div className="prose prose-lg max-w-none mb-6">
                        {story.content.split('\n\n').slice(0, 2).map((paragraph: string, pIndex: number) => (
                          <p key={pIndex} className="mb-4 text-muted-foreground leading-relaxed">
                            {paragraph.trim()}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">5.0 rating</span>
                      </div>
                      
                      <Link to="/products">
                        <Button variant="hero" size="lg">
                          Create Your Story
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-soft py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let us help you design the perfect invitations that reflect your unique love story. 
              Our team is dedicated to bringing your vision to life with premium quality and personalized service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="hero" size="lg">
                  Browse Our Collection
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InvitationStories;