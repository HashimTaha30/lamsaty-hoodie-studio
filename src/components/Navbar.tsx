import { Link } from "react-router-dom";
import { Instagram, Phone, Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-display text-3xl tracking-wider text-foreground hover:text-primary transition-colors">
            LAMSATY
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Shop
            </Link>
            <Link to="/custom" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Custom Design
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://www.instagram.com/lamsati_jo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="tel:0790086616" 
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone size={20} />
            </a>
            <Link to="/cart" className="text-foreground/80 hover:text-primary transition-colors">
              <ShoppingCart size={20} />
            </Link>
            <Link to="/admin/login">
              <Button variant="outline" size="sm">
                <User size={16} />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/custom" 
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Design
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <a 
                  href="https://www.instagram.com/lamsati_jo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="tel:0790086616" 
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Phone size={20} />
                </a>
                <Link to="/cart" className="text-foreground/80 hover:text-primary transition-colors">
                  <ShoppingCart size={20} />
                </Link>
              </div>
              <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  <User size={16} />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
