import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Package, Eye, Loader2 } from "lucide-react";
import { Order } from "@/lib/supabase";
import * as db from "@/lib/database";

const statusColors = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    setLoading(true);
    const result = await db.getOrders();
    if (result.success && result.data) {
      setOrders(result.data);
    } else {
      toast.error(result.error || "Failed to load orders");
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    const result = await db.updateOrderStatus(orderId, newStatus);
    if (result.success) {
      toast.success("Order status updated successfully!");
      loadOrders();
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders and shipments</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground">
              Orders will appear here when customers make purchases
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                      <p className="font-mono text-sm">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Customer</p>
                      <p className="font-semibold">{order.customer_name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                      <p className="font-bold text-lg text-primary">
                        ৳{order.total_amount}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          handleStatusChange(order.id, value as Order["status"])
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <Badge className={statusColors.pending}>Pending</Badge>
                          </SelectItem>
                          <SelectItem value="processing">
                            <Badge className={statusColors.processing}>Processing</Badge>
                          </SelectItem>
                          <SelectItem value="shipped">
                            <Badge className={statusColors.shipped}>Shipped</Badge>
                          </SelectItem>
                          <SelectItem value="delivered">
                            <Badge className={statusColors.delivered}>Delivered</Badge>
                          </SelectItem>
                          <SelectItem value="cancelled">
                            <Badge className={statusColors.cancelled}>Cancelled</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewOrderDetails(order)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Order Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order #{selectedOrder?.id.slice(0, 8).toUpperCase()}
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedOrder.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedOrder.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedOrder.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge className={statusColors[selectedOrder.status]}>
                        {selectedOrder.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.shipping_address}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">৳{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.notes}
                    </p>
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      ৳{selectedOrder.total_amount}
                    </p>
                  </div>
                </div>

                {/* Order Date */}
                <div className="text-sm text-muted-foreground">
                  Order placed on{" "}
                  {selectedOrder.created_at
                    ? new Date(selectedOrder.created_at).toLocaleString()
                    : "N/A"}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;