import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import TrackingCodes from "@/components/TrackingCodes";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Category from "@/pages/Category";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Contact from "@/pages/Contact";
import Story from "@/pages/Story";
import InvitationStories from "@/pages/InvitationStories";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import AdminSettings from "@/pages/admin/AdminSettings";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import UserOrders from "@/pages/UserOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import HoverReceiver from "@/visual-edits/VisualEditsMessenger";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <HoverReceiver />
        <Router>
          <CartProvider>
            <TrackingCodes />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/story" element={<Story />} />
              <Route path="/invitation-stories" element={<InvitationStories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track-order" element={<UserOrders />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
          </CartProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;