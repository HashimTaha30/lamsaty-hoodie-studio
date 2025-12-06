import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroHoodie from "@/assets/hero-hoodie.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroHoodie} 
          alt="Premium Lamsaty Hoodie" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <Sparkles size={16} />
              Premium Streetwear from Jordan
            </span>
          </div>

          <h1 
            className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-foreground mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            LAMSATY
          </h1>

          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Where comfort meets style. Premium quality hoodies crafted for those who dare to stand out.
          </p>

          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/shop">
              <Button variant="hero" size="xl">
                Shop Collection
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/custom">
              <Button variant="outline" size="xl">
                Design Your Own
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
