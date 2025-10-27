import { Search, ShoppingCart, User, Menu, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      {/* Top Bar */}
      <div className="bg-gradient-hero text-primary-foreground py-2 px-4 text-center text-sm">
        Free shipping over 100 piece of order
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        {/* Mobile Menu Button */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Admin Login</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Logo and Search */}
        <div className="flex items-center justify-between gap-8">
          {/* Search - Desktop */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-xs">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 bg-muted border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Logo - Text Based with Candle Icon and Aesthetic Gradient */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-center justify-center text-center">
            <Flame className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 mb-2 text-primary" />
            <div className="font-serif text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide text-primary">
              Candle Light Gift Shop
            </div>
          </Link>

          {/* Account & Cart - Desktop */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end max-w-xs">
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="gap-2 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm">({getTotalItems()})</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/admin/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-5 w-5" />
                <span className="text-sm">ADMIN</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="lg:hidden mt-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 bg-muted border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block mt-6`}>
          <ul className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 text-sm uppercase tracking-wider">
            <li>
              <Link to="/" className="hover:text-primary transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors duration-300">
                Shop Products
              </Link>
            </li>
            <li>
              <Link to="/story" className="hover:text-primary transition-colors duration-300">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/invitation-stories" className="hover:text-primary transition-colors duration-300">
                Customer Stories
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors duration-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary transition-colors duration-300">
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;