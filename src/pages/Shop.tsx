import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter } from "lucide-react";
import hoodieBlue from "@/assets/hoodie-blue.jpg";
import hoodieBeige from "@/assets/hoodie-beige.jpg";
import hoodieBrown from "@/assets/hoodie-brown.jpg";
import heroHoodie from "@/assets/hero-hoodie.jpg";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  sizes: string[];
}

const allProducts: Product[] = [
  { id: "1", name: "Royal Blue Classic", price: 45, image: hoodieBlue, color: "Royal Blue", sizes: ["S", "M", "L", "XL"] },
  { id: "2", name: "Desert Sand", price: 45, image: hoodieBeige, color: "Beige", sizes: ["S", "M", "L", "XL"] },
  { id: "3", name: "Autumn Brown", price: 45, image: hoodieBrown, color: "Brown", sizes: ["S", "M", "L", "XL"] },
  { id: "4", name: "Midnight Black", price: 45, image: heroHoodie, color: "Black", sizes: ["S", "M", "L", "XL", "XXL"] },
];

const Shop = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colors = ["Royal Blue", "Beige", "Brown", "Black"];
  
  const filteredProducts = selectedColor 
    ? allProducts.filter(p => p.color === selectedColor)
    : allProducts;

  const addToCart = (product: Product) => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-4">
              SHOP COLLECTION
            </h1>
            <p className="text-muted-foreground text-lg">
              Premium quality hoodies for every style
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-2 text-foreground">
              <Filter size={20} />
              <span className="font-medium">Filter:</span>
            </div>
            <Button
              variant={selectedColor === null ? "hero" : "outline"}
              size="sm"
              onClick={() => setSelectedColor(null)}
            >
              All
            </Button>
            {colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? "hero" : "outline"}
                size="sm"
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <p className="text-accent text-sm font-medium">{product.color}</p>
                  <h3 className="font-display text-xl text-foreground tracking-wide">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-2 mb-3">
                    {product.sizes.map((size) => (
                      <span key={size} className="text-xs text-muted-foreground border border-border px-2 py-1 rounded">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-primary text-xl font-semibold">{product.price} JOD</p>
                    <Button variant="hero" size="sm" onClick={() => addToCart(product)}>
                      <ShoppingCart size={16} />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Shop;
