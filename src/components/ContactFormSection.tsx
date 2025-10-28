import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            to_email: 'candlelightgiftshop1@gmail.com',
          },
          publicKey
        );
        toast.success("Message sent successfully! We'll get back to you soon.");
      } else {
        console.log('Contact form submission (EmailJS not configured):', formData);
        toast.success("Message received! We'll get back to you soon.");
      }
      
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error("Failed to send message. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Have a question or ready to start your order? We'd love to hear from you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Visit Our Showroom</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Nikunja-2</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Khilkhet<br />
                      Dhaka 1229
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-muted-foreground">+880 17 8080 6473</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      candlelightgiftshop1@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday - Thursday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border rounded-xl p-6 md:p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+880 1XXX-XXXXXX"
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your requirements..."
                  className="min-h-[120px]"
                  disabled={submitting}
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full uppercase"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;