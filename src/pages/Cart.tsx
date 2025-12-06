import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Banknote, Wallet } from "lucide-react";
import { toast } from "sonner";
import hoodieBlue from "@/assets/hoodie-blue.jpg";
import hoodieBeige from "@/assets/hoodie-beige.jpg";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Royal Blue Classic", price: 45, image: hoodieBlue, quantity: 1, size: "M" },
    { id: "2", name: "Desert Sand", price: 45, image: hoodieBeige, quantity: 2, size: "L" },
  ]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash"
  });

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error("Please fill in all delivery information");
      return;
    }
    toast.success("Order placed successfully! We'll contact you soon.");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-4">
              YOUR CART
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
              <Button variant="hero" className="mt-4" onClick={() => window.location.href = "/shop"}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-card rounded-2xl p-4 shadow-card flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-foreground">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">Size: {item.size}</p>
                      <p className="text-primary font-semibold mt-1">{item.price} JOD</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-foreground font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Summary */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display text-xl text-foreground mb-4">ORDER SUMMARY</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{subtotal} JOD</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping} JOD</span>
                    </div>
                    <div className="border-t border-border my-3" />
                    <div className="flex justify-between text-foreground font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{total} JOD</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display text-xl text-foreground mb-4">DELIVERY INFO</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        placeholder="Your name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="0790086616"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Delivery Address</Label>
                      <Input
                        placeholder="Amman, Jordan"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display text-xl text-foreground mb-4">PAYMENT METHOD</h3>
                  <div className="space-y-2">
                    {[
                      { id: "cash", label: "Cash on Delivery", icon: Banknote },
                      { id: "cliq", label: "CliQ", icon: Wallet },
                      { id: "visa", label: "Visa", icon: CreditCard },
                    ].map(({ id, label, icon: Icon }) => (
                      <label 
                        key={id}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                          customerInfo.paymentMethod === id 
                            ? "border-primary bg-primary/10" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={id}
                          checked={customerInfo.paymentMethod === id}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
                          className="sr-only"
                        />
                        <Icon size={20} className={customerInfo.paymentMethod === id ? "text-primary" : "text-muted-foreground"} />
                        <span className="text-foreground">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="hero" size="xl" className="w-full" onClick={handleCheckout}>
                  Place Order - {total} JOD
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cart;
