import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import * as db from "@/lib/database";
import { Order } from "@/lib/supabase";

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const statusColors = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const UserOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter an order ID or email");
      return;
    }

    setLoading(true);
    setSearched(true);

    // Try searching by order ID first
    let result = await db.getOrderById(searchQuery);
    
    // If not found, try searching by email
    if (!result.success || !result.data) {
      result = await db.getOrdersByEmail(searchQuery);
      if (result.success && result.data && result.data.length > 0) {
        setOrder(result.data[0]); // Show the first order
      } else {
        setOrder(null);
        toast.error("No order found with that ID or email");
      }
    } else {
      setOrder(result.data);
    }

    setLoading(false);
  };

  const StatusIcon = order ? statusIcons[order.status] : Clock;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Enter your order ID or email to check order status
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <Input
                  placeholder="Enter Order ID or Email Address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  disabled={loading}
                  className="gap-2"
                >
                  <Search className="w-5 h-5" />
                  {loading ? "Searching..." : "Track Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Details */}
          {searched && (
            <>
              {order ? (
                <div className="space-y-6">
                  {/* Status Card */}
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <StatusIcon className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                            <h2 className="text-2xl font-bold">
                              Order #{order.id.slice(0, 8).toUpperCase()}
                            </h2>
                            <Badge className={statusColors[order.status]}>
                              {order.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            Order placed on{" "}
                            {order.created_at
                              ? new Date(order.created_at).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                          <p className="text-3xl font-bold text-primary">
                            ৳{order.total_amount}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Progress Timeline */}
                  <Card>
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-xl font-bold mb-6">Order Progress</h3>
                      <div className="space-y-4">
                        {[
                          { status: "pending", label: "Order Placed" },
                          { status: "processing", label: "Processing" },
                          { status: "shipped", label: "Shipped" },
                          { status: "delivered", label: "Delivered" },
                        ].map((step, index) => {
                          const isCompleted =
                            ["pending", "processing", "shipped", "delivered"].indexOf(
                              order.status
                            ) >= index;
                          const isCurrent = order.status === step.status;
                          const Icon = statusIcons[step.status as keyof typeof statusIcons];

                          return (
                            <div key={step.status} className="flex items-center gap-4">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isCompleted || isCurrent
                                    ? "bg-gradient-to-br from-primary to-secondary"
                                    : "bg-muted"
                                }`}
                              >
                                <Icon
                                  className={`w-5 h-5 ${
                                    isCompleted || isCurrent
                                      ? "text-primary-foreground"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`font-semibold ${
                                    isCurrent ? "text-primary" : ""
                                  }`}
                                >
                                  {step.label}
                                </p>
                              </div>
                              {isCompleted && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-4">Customer Details</h3>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Name</p>
                            <p className="font-medium">{order.customer_name}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{order.customer_email}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{order.customer_phone}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-4">Shipping Address</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {order.shipping_address}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Order Items */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-4 bg-muted rounded-lg"
                          >
                            <div>
                              <p className="font-semibold">{item.product_name}</p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity} × ৳{item.price}
                              </p>
                            </div>
                            <p className="font-bold text-primary">
                              ৳{item.price * item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm font-semibold mb-1">Additional Notes</p>
                          <p className="text-sm text-muted-foreground">{order.notes}</p>
                        </div>
                      )}

                      <div className="mt-6 pt-4 border-t flex justify-between items-center">
                        <p className="font-bold text-lg">Total</p>
                        <p className="font-bold text-2xl text-primary">
                          ৳{order.total_amount}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Help Section */}
                  <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold mb-2">Need Help?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        If you have any questions about your order, please contact us
                      </p>
                      <div className="flex gap-3 justify-center flex-wrap">
                        <a href="tel:+8801XXXXXXXXX">
                          <Button variant="outline">Call Us</Button>
                        </a>
                        <a href="mailto:info@savethedate.com.bd">
                          <Button variant="outline">Email Us</Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <XCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Order Not Found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find an order with that ID or email address.
                      Please check and try again.
                    </p>
                    <Button
                      variant="gradient"
                      onClick={() => {
                        setSearched(false);
                        setSearchQuery("");
                      }}
                    >
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Info Card (shown when no search performed) */}
          {!searched && (
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Track Your Order Easily</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Enter your order ID (found in your confirmation email) or the email
                  address you used to place the order to track its status in real-time.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserOrders;