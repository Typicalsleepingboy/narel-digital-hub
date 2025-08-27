import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import heroImage from "@/assets/narel.png";

const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16); 
    let frame;

    const updateCount = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    frame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return count;
};

const Hero = () => {
  const products = useCountUp(1000);
  const customers = useCountUp(50000);
  const rating = useCountUp(49, 2000); 

  return (
    <section id="home" className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 sm:space-y-12">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-hero rounded-2xl sm:rounded-3xl opacity-20 blur-3xl"></div>
            <img
              src={heroImage}
              alt="Featured Digital Products"
              className="relative w-full aspect-video object-cover rounded-2xl sm:rounded-3xl shadow-elegant"
            />
          </div>

          {/* Hero Content */}
          <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto px-2">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-center space-x-2 text-accent">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span className="text-sm sm:text-base md:text-lg font-medium">#1 Digital Marketplace in Indonesia</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-tight px-2">
                NareL Digital
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2">
                A leading digital brand established in 2022, providing top-quality digital products and services at affordable prices.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 pt-8 sm:pt-12 md:pt-16">
              <div className="text-center">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-0.5 sm:mb-1 md:mb-2">{products}+ </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-tight">Digital Products</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-0.5 sm:mb-1 md:mb-2">{customers.toLocaleString()}+ </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-tight">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-0.5 sm:mb-1 md:mb-2">{(rating/10).toFixed(1)}★</div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-tight">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
