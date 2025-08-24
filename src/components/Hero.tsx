import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-digital-products.jpg";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-accent">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium">#1 Digital Marketplace in Indonesia</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                NareL
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Digital</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                A leading digital brand established in 2022, providing top-quality digital products and services at affordable prices.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Digital Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.9★</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-20 blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="Digital Products Showcase"
              className="relative w-full h-auto rounded-3xl shadow-elegant"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;