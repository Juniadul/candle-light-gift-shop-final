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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import * as db from "@/lib/database";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
    loadProducts();
    loadCategories();
  }, [navigate]);

  const loadCategories = async () => {
    const result = await db.getCategories();
    if (result.success && result.data) {
      setCategories(result.data);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    const result = await db.getProducts();
    if (result.success && result.data) {
      setProducts(result.data);
    } else {
      toast.error(result.error || "Failed to load products");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || FALLBACK_IMAGE,
    };

    let result;
    if (editingProduct) {
      result = await db.updateProduct(editingProduct.id, productData);
      if (result.success) {
        toast.success("Product updated successfully!");
      }
    } else {
      result = await db.createProduct(productData);
      if (result.success) {
        toast.success("Product created successfully!");
      }
    }

    if (!result.success) {
      toast.error(result.error || "Operation failed");
    }

    setSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
    loadProducts();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setEditingProduct(null);
    setImageKey(0);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
    });
    setImageKey(Date.now());
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const result = await db.deleteProduct(productId);
    if (result.success) {
      toast.success("Product deleted successfully!");
      loadProducts();
    } else {
      toast.error(result.error || "Failed to delete product");
    }
  };

  const handleImageUrlChange = (value: string) => {
    setFormData({ ...formData, image: value });
    setImageKey(Date.now()); // Force image refresh
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient" className="gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
                <DialogDescription>
                  {editingProduct
                    ? "Update the product details below"
                    : "Fill in the details to create a new product"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Product Name *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Elegant Purple Wedding Invitation"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold mb-2"
                  >
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe the product..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold mb-2">
                      Price (৳) *
                    </label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="2500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold mb-2"
                    >
                      Category *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-semibold mb-2">
                    Image URL
                  </label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg (optional)"
                  />
                  {formData.image && (
                    <div className="mt-2 relative">
                      <img
                        key={`preview-${imageKey}`}
                        src={`${formData.image}${formData.image.includes('?') ? '&' : '?'}t=${imageKey}`}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-primary/20"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Preview updates as you type
                      </p>
                    </div>
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
                        {editingProduct ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>{editingProduct ? "Update Product" : "Create Product"}</>
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
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first product
            </p>
            <Button variant="gradient" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                Total: {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">৳{product.price}</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {product.category?.replace("-", " ") || "Uncategorized"}
                      </span>
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

export default AdminProducts;