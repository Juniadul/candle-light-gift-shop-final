import { Heart } from "lucide-react";

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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:opacity-80 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="/collections" className="hover:opacity-80 transition-opacity">
                  Collections
                </a>
              </li>
              <li>
                <a href="/custom" className="hover:opacity-80 transition-opacity">
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Support: 01797414949</li>
              <li>Email: info@candlelightgiftshop.com</li>
              <li>Hours: Mon-Sat 10AM-6PM</li>
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