import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2, Star } from "lucide-react";
import * as db from "@/lib/database";

const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80";

const AdminTestimonials = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: "5",
    image: "",
    isFeatured: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
    loadTestimonials();
  }, [navigate]);

  const loadTestimonials = async () => {
    setLoading(true);
    const result = await db.getAllTestimonials();
    if (result.success && result.data) {
      setTestimonials(result.data);
    } else {
      toast.error(result.error || "Failed to load testimonials");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const testimonialData = {
      name: formData.name,
      role: formData.role,
      content: formData.content,
      rating: parseInt(formData.rating),
      image: formData.image || FALLBACK_AVATAR,
      isFeatured: formData.isFeatured,
    };

    let result;
    if (editingTestimonial) {
      result = await db.updateTestimonial(editingTestimonial.id, testimonialData);
      if (result.success) {
        toast.success("Testimonial updated successfully!");
      }
    } else {
      result = await db.createTestimonial(testimonialData);
      if (result.success) {
        toast.success("Testimonial created successfully!");
      }
    }

    if (!result.success) {
      toast.error(result.error || "Operation failed");
    }

    setSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
    loadTestimonials();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      content: "",
      rating: "5",
      image: "",
      isFeatured: true,
    });
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating.toString(),
      image: testimonial.image,
      isFeatured: testimonial.is_featured,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (testimonialId: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const result = await db.deleteTestimonial(testimonialId);
    if (result.success) {
      toast.success("Testimonial deleted successfully!");
      loadTestimonials();
    } else {
      toast.error(result.error || "Failed to delete testimonial");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
            <p className="text-muted-foreground">Manage customer reviews</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                </DialogTitle>
                <DialogDescription>
                  {editingTestimonial
                    ? "Update the testimonial details below"
                    : "Fill in the details to create a new testimonial"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Customer Name *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Ayesha Rahman"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-semibold mb-2">
                    Occasion/Role *
                  </label>
                  <Input
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g., Wedding Client or Birthday Celebration"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold mb-2">
                    Review Content *
                  </label>
                  <Textarea
                    id="content"
                    required
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="What did the customer say about your service?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="rating" className="block text-sm font-semibold mb-2">
                      Rating *
                    </label>
                    <select
                      id="rating"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="featured" className="block text-sm font-semibold mb-2">
                      Featured
                    </label>
                    <select
                      id="featured"
                      value={formData.isFeatured ? "true" : "false"}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.value === "true" })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-semibold mb-2">
                    Customer Photo URL
                  </label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/photo.jpg (optional)"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_AVATAR;
                      }}
                    />
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="gradient"
                    className="flex-1"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {editingTestimonial ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>{editingTestimonial ? "Update Testimonial" : "Create Testimonial"}</>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No testimonials yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first testimonial
            </p>
            <Button variant="gradient" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Total: {testimonials.length} {testimonials.length === 1 ? 'testimonial' : 'testimonials'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image || FALLBACK_AVATAR}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_AVATAR;
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                      {testimonial.is_featured && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    
                    <p className="text-sm text-muted-foreground italic mb-4 line-clamp-3">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(testimonial)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
