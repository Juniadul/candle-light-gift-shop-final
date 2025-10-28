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
import { Plus, Edit, Trash2, Loader2, MoveUp, MoveDown, Eye, EyeOff } from "lucide-react";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminHeroSlides = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    displayOrder: "0",
    isActive: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
    loadSlides();
  }, [navigate]);

  const loadSlides = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hero-slides?active=false");
      if (response.ok) {
        const data = await response.json();
        setSlides(data);
      } else {
        toast.error("Failed to load hero slides");
      }
    } catch (error) {
      console.error("Failed to load slides:", error);
      toast.error("Failed to load hero slides");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const slideData = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      image: formData.image,
      buttonText: formData.buttonText,
      buttonLink: formData.buttonLink,
      displayOrder: parseInt(formData.displayOrder),
      isActive: formData.isActive,
    };

    try {
      let response;
      if (editingSlide) {
        response = await fetch(`/api/hero-slides?id=${editingSlide.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slideData),
        });
        if (response.ok) {
          toast.success("Hero slide updated successfully!");
        }
      } else {
        response = await fetch("/api/hero-slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slideData),
        });
        if (response.ok) {
          toast.success("Hero slide created successfully!");
        }
      }

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Operation failed");
      }
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error("Operation failed");
    }

    setSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
    loadSlides();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      displayOrder: "0",
      isActive: true,
    });
    setEditingSlide(null);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      displayOrder: slide.displayOrder.toString(),
      isActive: slide.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (slideId: number) => {
    if (!confirm("Are you sure you want to delete this hero slide?")) return;

    try {
      const response = await fetch(`/api/hero-slides?id=${slideId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Hero slide deleted successfully!");
        loadSlides();
      } else {
        toast.error("Failed to delete hero slide");
      }
    } catch (error) {
      console.error("Failed to delete slide:", error);
      toast.error("Failed to delete hero slide");
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    try {
      const response = await fetch(`/api/hero-slides?id=${slide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !slide.isActive }),
      });
      if (response.ok) {
        toast.success(`Slide ${!slide.isActive ? "activated" : "deactivated"} successfully!`);
        loadSlides();
      }
    } catch (error) {
      console.error("Failed to toggle active:", error);
      toast.error("Operation failed");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hero Slides</h1>
            <p className="text-muted-foreground">Manage homepage hero carousel slides</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                Add Hero Slide
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}
                </DialogTitle>
                <DialogDescription>
                  {editingSlide
                    ? "Update the hero slide details below"
                    : "Fill in the details to create a new hero slide"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold mb-2">
                    Title *
                  </label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., THE SUMMER SERENADE '25"
                  />
                </div>

                <div>
                  <label htmlFor="subtitle" className="block text-sm font-semibold mb-2">
                    Subtitle *
                  </label>
                  <Input
                    id="subtitle"
                    required
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, subtitle: e.target.value })
                    }
                    placeholder="e.g., SALE UPTO 80% OFF"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold mb-2">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of the promotion or feature"
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-semibold mb-2">
                    Image URL *
                  </label>
                  <Input
                    id="image"
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="buttonText" className="block text-sm font-semibold mb-2">
                      Button Text *
                    </label>
                    <Input
                      id="buttonText"
                      required
                      value={formData.buttonText}
                      onChange={(e) =>
                        setFormData({ ...formData, buttonText: e.target.value })
                      }
                      placeholder="e.g., Order Now"
                    />
                  </div>

                  <div>
                    <label htmlFor="buttonLink" className="block text-sm font-semibold mb-2">
                      Button Link *
                    </label>
                    <Input
                      id="buttonLink"
                      required
                      value={formData.buttonLink}
                      onChange={(e) =>
                        setFormData({ ...formData, buttonLink: e.target.value })
                      }
                      placeholder="e.g., /products"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="displayOrder" className="block text-sm font-semibold mb-2">
                      Display Order *
                    </label>
                    <Input
                      id="displayOrder"
                      type="number"
                      required
                      value={formData.displayOrder}
                      onChange={(e) =>
                        setFormData({ ...formData, displayOrder: e.target.value })
                      }
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Lower numbers appear first
                    </p>
                  </div>

                  <div>
                    <label htmlFor="isActive" className="block text-sm font-semibold mb-2">
                      Status
                    </label>
                    <select
                      id="isActive"
                      value={formData.isActive ? "true" : "false"}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.value === "true" })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
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
                        {editingSlide ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>{editingSlide ? "Update Slide" : "Create Slide"}</>
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
        ) : slides.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No hero slides yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first hero slide
            </p>
            <Button variant="gradient" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Hero Slide
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Total: {slides.length} {slides.length === 1 ? 'slide' : 'slides'}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {slides.map((slide) => (
                <Card key={slide.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-48 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{slide.title}</h3>
                            <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              slide.isActive 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {slide.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              Order: {slide.displayOrder}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{slide.description}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Button: "{slide.buttonText}" → {slide.buttonLink}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(slide)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleActive(slide)}
                          >
                            {slide.isActive ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-1" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-1" />
                                Activate
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(slide.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
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

export default AdminHeroSlides;
