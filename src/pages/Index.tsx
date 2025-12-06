import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomDesignCTA from "@/components/CustomDesignCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <CustomDesignCTA />
      <Footer />
    </main>
  );
};

export default Index;
