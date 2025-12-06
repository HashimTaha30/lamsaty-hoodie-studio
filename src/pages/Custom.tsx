import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Type, ShoppingCart, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const hoodieColors = [
  { name: "Black", hex: "#1C1C1C" },
  { name: "Royal Blue", hex: "#2F5EA8" },
  { name: "Light Blue", hex: "#3E6FBF" },
  { name: "Beige", hex: "#D7BA94" },
  { name: "Brown", hex: "#B88A5C" },
];

const Custom = () => {
  const [selectedColor, setSelectedColor] = useState(hoodieColors[0]);
  const [customText, setCustomText] = useState("");
  const [textPosition, setTextPosition] = useState<"front" | "back">("front");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const resetDesign = () => {
    setSelectedColor(hoodieColors[0]);
    setCustomText("");
    setUploadedImage(null);
    setTextPosition("front");
    toast.info("Design reset!");
  };

  const handleOrderSubmit = () => {
    if (!customerName || !customerPhone) {
      toast.error("Please fill in your contact information");
      return;
    }
    toast.success("Custom order submitted! We'll contact you soon.");
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-4">
              CUSTOM DESIGNER
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your unique hoodie design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Area */}
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display text-2xl text-foreground mb-6">PREVIEW</h3>
              <div 
                className="aspect-square rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: selectedColor.hex }}
              >
                {/* Hoodie silhouette representation */}
                <div className="relative w-64 h-72 flex flex-col items-center justify-center">
                  {/* Hood shape */}
                  <div 
                    className="absolute top-0 w-32 h-16 rounded-t-full"
                    style={{ backgroundColor: `${selectedColor.hex}`, filter: "brightness(0.85)" }}
                  />
                  {/* Body */}
                  <div 
                    className="w-48 h-56 rounded-lg flex flex-col items-center justify-center gap-4 mt-8 border-2 border-dashed"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    {uploadedImage && (
                      <img 
                        src={uploadedImage} 
                        alt="Custom design" 
                        className="max-w-24 max-h-24 object-contain"
                      />
                    )}
                    {customText && (
                      <p 
                        className="text-center font-bold px-4 break-words max-w-full"
                        style={{ color: selectedColor.hex === "#1C1C1C" ? "#D7BA94" : "#1C1C1C" }}
                      >
                        {customText}
                      </p>
                    )}
                    {!uploadedImage && !customText && (
                      <p className="text-foreground/30 text-sm">Your design here</p>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-4">
                {textPosition === "front" ? "Front View" : "Back View"}
              </p>
            </div>

            {/* Design Options */}
            <div className="space-y-8">
              {/* Color Selection */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-xl text-foreground mb-4">SELECT COLOR</h3>
                <div className="flex flex-wrap gap-3">
                  {hoodieColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        selectedColor.name === color.name 
                          ? "border-primary scale-110 shadow-glow" 
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mt-3">Selected: {selectedColor.name}</p>
              </div>

              {/* Text Input */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                  <Type size={20} />
                  ADD TEXT
                </h3>
                <Input
                  placeholder="Enter your custom text..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="mb-4"
                  maxLength={50}
                />
                <div className="flex gap-2">
                  <Button
                    variant={textPosition === "front" ? "hero" : "outline"}
                    size="sm"
                    onClick={() => setTextPosition("front")}
                  >
                    Front
                  </Button>
                  <Button
                    variant={textPosition === "back" ? "hero" : "outline"}
                    size="sm"
                    onClick={() => setTextPosition("back")}
                  >
                    Back
                  </Button>
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                  <Upload size={20} />
                  UPLOAD IMAGE
                </h3>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Uploaded" className="max-h-32 mx-auto" />
                    ) : (
                      <>
                        <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                        <p className="text-muted-foreground">Click to upload your design</p>
                        <p className="text-muted-foreground text-xs mt-1">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              {/* Customer Info */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-xl text-foreground mb-4">YOUR INFORMATION</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="0790086616"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requests..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="outline" onClick={resetDesign} className="flex-1">
                  <RotateCcw size={16} />
                  Reset
                </Button>
                <Button variant="hero" onClick={handleOrderSubmit} className="flex-1">
                  <ShoppingCart size={16} />
                  Order Custom Hoodie - 55 JOD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Custom;
