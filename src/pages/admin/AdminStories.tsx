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
import { Plus, Edit, Trash2, Loader2, Heart, Calendar } from "lucide-react";
import * as db from "@/lib/database";

const AdminStories = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<any | null>(null);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    date: "",
    excerpt: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
    loadStories();
  }, [navigate]);

  const loadStories = async () => {
    setLoading(true);
    const result = await db.getStories();
    if (result.success && result.data) {
      setStories(result.data);
    } else {
      toast.error(result.error || "Failed to load stories");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const storyData = {
      title: formData.title,
      client: formData.client,
      date: formData.date,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
    };

    let result;
    if (editingStory) {
      result = await db.updateStory(editingStory.id, storyData);
      if (result.success) {
        toast.success("Story updated successfully!");
      }
    } else {
      result = await db.createStory(storyData);
      if (result.success) {
        toast.success("Story created successfully!");
      }
    }

    if (!result.success) {
      toast.error(result.error || "Operation failed");
    }

    setSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
    loadStories();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      client: "",
      date: "",
      excerpt: "",
      content: "",
      image: "",
    });
    setEditingStory(null);
  };

  const handleEdit = (story: any) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      client: story.client,
      date: story.date,
      excerpt: story.excerpt,
      content: story.content,
      image: story.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (storyId: number) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    const result = await db.deleteStory(storyId);
    if (result.success) {
      toast.success("Story deleted successfully!");
      loadStories();
    } else {
      toast.error(result.error || "Failed to delete story");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Customer Stories</h1>
            <p className="text-muted-foreground">Manage customized invitation stories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                Add Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingStory ? "Edit Story" : "Add New Story"}
                </DialogTitle>
                <DialogDescription>
                  {editingStory
                    ? "Update the story details below"
                    : "Fill in the details to create a new customer story"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold mb-2">
                    Story Title *
                  </label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., A Romantic Garden Wedding"
                  />
                </div>

                <div>
                  <label htmlFor="client" className="block text-sm font-semibold mb-2">
                    Client Name *
                  </label>
                  <Input
                    id="client"
                    required
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    placeholder="e.g., Ayesha & Karim"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-semibold mb-2">
                    Event Date *
                  </label>
                  <Input
                    id="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="e.g., December 15, 2024"
                  />
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-semibold mb-2">
                    Short Excerpt *
                  </label>
                  <Textarea
                    id="excerpt"
                    required
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="A brief, engaging summary of the story (1-2 sentences)"
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold mb-2">
                    Full Story Content *
                  </label>
                  <Textarea
                    id="content"
                    required
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="The complete story... (use double line breaks for paragraphs)"
                    className="min-h-[200px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Tip: Use double line breaks (press Enter twice) to separate paragraphs
                  </p>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-semibold mb-2">
                    Cover Image URL *
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
                      className="mt-2 w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
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
                        {editingStory ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>{editingStory ? "Update Story" : "Create Story"}</>
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
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first customer story
            </p>
            <Button variant="gradient" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Story
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Total: {stories.length} {stories.length === 1 ? 'story' : 'stories'}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stories.map((story) => (
                <Card key={story.id} className="overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-xl line-clamp-1">{story.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-accent" />
                        <span>{story.client}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{story.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {story.excerpt}
                    </p>
                    
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                      {story.content}
                    </p>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(story)}
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(story.id)}
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

export default AdminStories;
