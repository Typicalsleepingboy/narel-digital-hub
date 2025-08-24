import Navbar from "@/components/Navbar";
import Hero from "@/components/home";
import ProductGrid from "@/components/ProductGrid";
import PaymentMethods from "@/components/PaymentMethods";
import TermsSection from "@/components/TermsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductGrid />
      <PaymentMethods />
      <TermsSection />
      <Footer />
    </div>
  );
};

export default Index;
