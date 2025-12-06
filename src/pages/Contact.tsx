import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Phone, MapPin, Send, CreditCard, Banknote, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-4">
              CONTACT US
            </h1>
            <p className="text-muted-foreground text-lg">
              Get in touch with us for any inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-display text-2xl text-foreground mb-6">REACH US</h3>
                
                <div className="space-y-6">
                  <a 
                    href="https://www.instagram.com/lamsati_jo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border hover:border-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center">
                      <Instagram size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">Instagram</p>
                      <p className="text-muted-foreground text-sm">@lamsati_jo</p>
                    </div>
                  </a>

                  <a 
                    href="tel:0790086616" 
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border hover:border-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center">
                      <Phone size={24} className="text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">Phone</p>
                      <p className="text-muted-foreground text-sm">0790086616</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border">
                    <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center">
                      <MapPin size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Location</p>
                      <p className="text-muted-foreground text-sm">Amman, Jordan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-display text-2xl text-foreground mb-6">PAYMENT METHODS</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border">
                    <Banknote size={28} className="text-accent" />
                    <span className="text-foreground text-sm font-medium">Cash</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border">
                    <Wallet size={28} className="text-primary" />
                    <span className="text-foreground text-sm font-medium">CliQ</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background/50 border border-border">
                    <CreditCard size={28} className="text-secondary" />
                    <span className="text-foreground text-sm font-medium">Visa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display text-2xl text-foreground mb-6">SEND A MESSAGE</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="contact-name">Your Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input
                    id="contact-phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  <Send size={18} />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
