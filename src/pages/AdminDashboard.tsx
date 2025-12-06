import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Package, 
  ShoppingBag, 
  Plus, 
  LogOut, 
  Search,
  Check,
  Clock,
  Truck,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customerName: string;
  phone: string;
  product: string;
  quantity: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  stock: number;
  image?: string;
}

const mockOrders: Order[] = [
  { id: "ORD001", customerName: "Ahmad Ali", phone: "0790123456", product: "Ocean Wave", quantity: 2, total: 30, status: "pending", date: "2024-01-15" },
  { id: "ORD002", customerName: "Sara Hassan", phone: "0791234567", product: "Desert Sand", quantity: 1, total: 15, status: "processing", date: "2024-01-14" },
  { id: "ORD003", customerName: "Omar Khalid", phone: "0792345678", product: "Custom Design", quantity: 1, total: 25, status: "shipped", date: "2024-01-13" },
];

const mockProducts: Product[] = [
  { id: "1", name: "Ocean Wave", price: 15, color: "Navy", stock: 25 },
  { id: "2", name: "Desert Sand", price: 15, color: "Cream", stock: 18 },
  { id: "3", name: "Autumn Rust", price: 15, color: "Rust", stock: 30 },
  { id: "4", name: "Midnight Shadow", price: 15, color: "Charcoal", stock: 42 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: 15, color: "", stock: 0, image: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewProduct({ ...newProduct, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    toast.success(`Order ${orderId} marked as ${status}`);
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.color || newProduct.price <= 0) {
      toast.error("Please fill in all product details");
      return;
    }
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: newProduct.price,
      color: newProduct.color,
      stock: newProduct.stock,
      image: newProduct.image || undefined
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", price: 15, color: "", stock: 0, image: "" });
    setImagePreview(null);
    setShowAddProduct(false);
    toast.success("Product added successfully");
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending": return <Clock size={16} className="text-yellow-500" />;
      case "processing": return <Package size={16} className="text-primary" />;
      case "shipped": return <Truck size={16} className="text-secondary" />;
      case "delivered": return <Check size={16} className="text-green-500" />;
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6">
        <Link to="/" className="font-display text-2xl tracking-wider text-foreground mb-8 block">
          LAMSATY
        </Link>
        <p className="text-muted-foreground text-sm mb-8">Admin Dashboard</p>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "orders" 
                ? "bg-primary text-primary-foreground" 
                : "text-foreground hover:bg-card"
            }`}
          >
            <ShoppingBag size={20} />
            Orders
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "products" 
                ? "bg-primary text-primary-foreground" 
                : "text-foreground hover:bg-card"
            }`}
          >
            <Package size={20} />
            Products
          </button>
        </nav>

        <Button
          variant="outline"
          className="absolute bottom-6 left-6 right-6"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-4xl text-foreground">
              {activeTab === "orders" ? "ORDERS" : "PRODUCTS"}
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              {activeTab === "products" && (
                <Button variant="hero" onClick={() => setShowAddProduct(true)}>
                  <Plus size={18} />
                  Add Product
                </Button>
              )}
            </div>
          </div>

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-card rounded-2xl shadow-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-background/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-background/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{order.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{order.product}</td>
                      <td className="px-6 py-4 text-sm text-primary font-semibold">{order.total} JOD</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className="text-sm capitalize text-foreground">{order.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                          className="bg-background border border-border rounded-md px-3 py-1 text-sm text-foreground"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <>
              {showAddProduct && (
                <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                  <h3 className="font-display text-xl text-foreground mb-4">ADD NEW PRODUCT</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Image Upload */}
                    <div className="md:col-span-2 lg:col-span-1">
                      <Label>Product Image</Label>
                      <label className="block mt-2 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="border-2 border-dashed border-border rounded-xl p-4 h-32 flex flex-col items-center justify-center hover:border-primary transition-colors">
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain rounded" />
                          ) : (
                            <>
                              <Upload className="text-muted-foreground mb-2" size={24} />
                              <span className="text-muted-foreground text-xs text-center">Upload Image</span>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                    <div>
                      <Label>Product Name</Label>
                      <Input
                        placeholder="e.g. Ocean Wave"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Color</Label>
                      <Input
                        placeholder="e.g. Navy"
                        value={newProduct.color}
                        onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Price (JOD)</Label>
                      <Input
                        type="number"
                        placeholder="15"
                        value={newProduct.price || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        placeholder="20"
                        value={newProduct.stock || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="hero" onClick={addProduct}>Add Product</Button>
                    <Button variant="outline" onClick={() => { setShowAddProduct(false); setImagePreview(null); }}>Cancel</Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="w-full h-32 rounded-xl bg-background/50 flex items-center justify-center mb-4 overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <ImageIcon size={48} className="text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-display text-lg text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">{product.color}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-primary font-semibold">{product.price} JOD</span>
                      <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
