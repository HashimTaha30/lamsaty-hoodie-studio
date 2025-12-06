import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Palette, Shirt, Sparkles } from "lucide-react";

const CustomDesignCTA = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
            <Palette size={16} />
            Create Your Unique Style
          </div>

          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-6">
            DESIGN YOUR OWN
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Unleash your creativity! Design your own custom hoodie with our easy-to-use designer tool. 
            Choose colors, add text, upload graphics, and make it truly yours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center mb-4 mx-auto">
                <Palette size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">CHOOSE COLORS</h3>
              <p className="text-muted-foreground text-sm">Pick from our range of premium colors</p>
            </div>

            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4 mx-auto">
                <Sparkles size={24} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">ADD YOUR DESIGN</h3>
              <p className="text-muted-foreground text-sm">Upload images or add custom text</p>
            </div>

            <div className="bg-background/50 rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center mb-4 mx-auto">
                <Shirt size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">ORDER IT</h3>
              <p className="text-muted-foreground text-sm">Get your custom hoodie delivered</p>
            </div>
          </div>

          <Link to="/custom">
            <Button variant="accent" size="xl">
              Start Designing Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CustomDesignCTA;
