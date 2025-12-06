import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin, CreditCard, Banknote, Wallet } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl tracking-wider text-foreground mb-4">LAMSATY</h3>
            <p className="text-muted-foreground text-sm">
              Premium streetwear hoodies from Amman, Jordan. Quality meets style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">QUICK LINKS</h4>
            <div className="flex flex-col gap-2">
              <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Shop
              </Link>
              <Link to="/custom" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Custom Design
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">CONTACT</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://www.instagram.com/lamsati_jo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Instagram size={16} />
                @lamsati_jo
              </a>
              <a 
                href="tel:0790086616" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <Phone size={16} />
                0790086616
              </a>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={16} />
                Amman, Jordan
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-4">PAYMENT METHODS</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Banknote size={16} />
                Cash on Delivery
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Wallet size={16} />
                CliQ
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <CreditCard size={16} />
                Visa
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Lamsaty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
