import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { z } from "zod";
import emailjs from '@emailjs/browser';
import * as db from "@/lib/database";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(20),
  preferredDate: z.string().min(1, "Date is required"),
  preferredTime: z.string().min(1, "Time is required"),
  occasionType: z.string().min(1, "Occasion type is required"),
  message: z.string().max(1000).optional(),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    occasionType: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      appointmentSchema.parse(formData);
      
      setSubmitting(true);
      
      // Send email notification using EmailJS
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
              message: `Appointment Request:\nDate: ${formData.preferredDate}\nTime: ${formData.preferredTime}\nOccasion: ${formData.occasionType}\n\n${formData.message || 'No additional message'}`,
              to_email: 'candlelightgiftshop1@gmail.com',
            },
            publicKey
          );
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
      }
      
      // Save to database
      const result = await db.createAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        occasionType: formData.occasionType,
        message: formData.message || undefined
      });
      
      if (result.success) {
        toast.success("Appointment request sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          occasionType: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error(result.error || "Failed to send request. Please try again.");
      }
      
      setSubmitting(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error("Please fix the errors in the form");
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Looking for something unique and customized? Or need a quotation for bulk order? 
            Send us a message, and our expert team will reach you within a day or two!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 shadow-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={errors.name ? "border-destructive" : ""}
                      disabled={submitting}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? "border-destructive" : ""}
                      disabled={submitting}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1234567890"
                    className={errors.phone ? "border-destructive" : ""}
                    disabled={submitting}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className={errors.preferredDate ? "border-destructive" : ""}
                      disabled={submitting}
                    />
                    {errors.preferredDate && (
                      <p className="text-sm text-destructive mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="preferredTime">Preferred Time *</Label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${errors.preferredTime ? "border-destructive" : ""}`}
                      disabled={submitting}
                    >
                      <option value="">Select a time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                    </select>
                    {errors.preferredTime && (
                      <p className="text-sm text-destructive mt-1">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="occasionType">Occasion Type *</Label>
                  <select
                    id="occasionType"
                    name="occasionType"
                    value={formData.occasionType}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${errors.occasionType ? "border-destructive" : ""}`}
                    disabled={submitting}
                  >
                    <option value="">Select occasion</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Durga Puja">Durga Puja</option>
                    <option value="Eid">Eid Salami Card</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.occasionType && (
                    <p className="text-sm text-destructive mt-1">{errors.occasionType}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Your Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    rows={6}
                    className={errors.message ? "border-destructive" : ""}
                    disabled={submitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={submitting}>
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

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="text-sm text-muted-foreground">+880 17 8080 6473</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-sm text-muted-foreground">candlelightgiftshop1@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Visit Our Showroom</p>
                      <p className="text-sm text-muted-foreground">Nikunja-2, Khilkhet<br />Dhaka 1229</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Saturday</span>
                    <span>10AM - 6PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;