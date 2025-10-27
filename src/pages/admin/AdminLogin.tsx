import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, Mail, Flame } from "lucide-react";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (in production, use proper backend auth)
    if (credentials.email === "admin@candlelightgiftshop.com" && credentials.password === "Ca112233candle@@") {
      localStorage.setItem("adminToken", "admin-logged-in");
      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md bg-card rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center justify-center mb-4">
            <Flame className="h-16 w-16 text-primary mb-3" />
            <div className="font-serif text-2xl font-bold tracking-wide text-primary">
              Candle Light Gift Shop
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" variant="gradient" size="lg" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;