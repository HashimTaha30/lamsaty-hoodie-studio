import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import hoodieBlue from "@/assets/hoodie-blue.jpg";
import hoodieBeige from "@/assets/hoodie-beige.jpg";
import hoodieBrown from "@/assets/hoodie-brown.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Royal Blue Classic",
    price: 45,
    image: hoodieBlue,
    color: "Royal Blue",
  },
  {
    id: "2",
    name: "Desert Sand",
    price: 45,
    image: hoodieBeige,
    color: "Beige",
  },
  {
    id: "3",
    name: "Autumn Brown",
    price: 45,
    image: hoodieBrown,
    color: "Brown",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl tracking-wider text-foreground mb-4">
            FEATURED COLLECTION
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Discover our most popular premium hoodies, crafted with the finest materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-accent text-sm font-medium mb-1">{product.color}</p>
                    <h3 className="font-display text-2xl text-foreground tracking-wide">{product.name}</h3>
                    <p className="text-primary text-xl font-semibold mt-2">{product.price} JOD</p>
                  </div>
                  <Button variant="hero" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ShoppingBag size={20} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
