import { Heart, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">CANDLE LIGHT GIFT SHOP</h3>
            <p className="text-sm opacity-90">
              Crafting beautiful bespoke wedding invitations and stationery to make your special day unforgettable.
            </p>
            <div className="mt-4">
              <a
                href="https://www.facebook.com/candlelightgiftshop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                <Facebook className="h-5 w-5" />
                Follow us on Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/story" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:opacity-80 transition-opacity">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/invitation-stories" className="hover:opacity-80 transition-opacity">
                  Customer Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:opacity-80 transition-opacity">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Phone: +880 17 8080 6473</li>
              <li>Email: candlelightgiftshop1@gmail.com</li>
              <li>Address: Nikunja-2, Khilkhet, Dhaka 1229</li>
              <li>Hours: Mon-Sat 10AM-8PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm flex items-center gap-2">
            Made with <Heart className="h-4 w-4 fill-current" /> for your special day
          </p>
          <p className="text-sm opacity-80">
            © 2025 Candle Light Gift Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;