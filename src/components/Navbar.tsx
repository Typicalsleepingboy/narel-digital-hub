import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/narellogo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the navbar height to offset the scroll position
      const navbarHeight = 64; // 16 * 4 = 64px (h-16 in Tailwind)
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      // Use window.scrollTo for better control over smooth scrolling
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    closeMenu();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={logo}
            alt="NareL Digital Logo" 
            className="w-10 h-10 object-contain"
          />
          <div className="font-display text-2xl font-bold text-primary">
            NareL <span className="text-accent">Digital</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#home" 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => handleSmoothScroll(e, 'home')}
          >
            Home
          </a>
          <a 
            href="#products" 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => handleSmoothScroll(e, 'products')}
          >
            Products
          </a>
          <a 
            href="#terms" 
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={(e) => handleSmoothScroll(e, 'terms')}
          >
            Terms
          </a>
        </div>

        {/* Desktop Discord Button */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            type="button" variant="accent" size="sm"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'https://discord.gg/narelid';
            }}
          >
            Go To Discord
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="#home" 
              className="block text-foreground hover:text-primary transition-colors py-2 cursor-pointer"
              onClick={(e) => handleSmoothScroll(e, 'home')}
            >
              Home
            </a>
            <a 
              href="#products" 
              className="block text-foreground hover:text-primary transition-colors py-2 cursor-pointer"
              onClick={(e) => handleSmoothScroll(e, 'products')}
            >
              Products
            </a>
            <a 
              href="#terms" 
              className="block text-foreground hover:text-primary transition-colors py-2 cursor-pointer"
              onClick={(e) => handleSmoothScroll(e, 'terms')}
            >
              Terms
            </a>
            <div className="pt-2 border-t border-border">
              <Button
                type="button" 
                variant="accent" 
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'https://discord.gg/narelid';
                  closeMenu();
                }}
              >
                Go To Discord
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;