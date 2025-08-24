import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-digital-products.jpg";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-12">
          {/* Large Hero Banner Image */}
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-20 blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="Featured Digital Products"
              className="relative w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-elegant"
            />
          </div>
          
          {/* Hero Content */}
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-accent">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-medium">#1 Digital Marketplace in Indonesia</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight">
                NareL
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Digital</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                A leading digital brand established in 2022, providing top-quality digital products and services at affordable prices.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group px-8 py-3">
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </div>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">1000+</div>
                <div className="text-lg text-muted-foreground">Digital Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">50K+</div>
                <div className="text-lg text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">4.9★</div>
                <div className="text-lg text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;