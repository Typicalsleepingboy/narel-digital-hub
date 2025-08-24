import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="font-display text-2xl font-bold text-primary">
            NareL <span className="text-accent">Digital</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="#products" className="text-foreground hover:text-primary transition-colors">
            Products
          </a>
          <a href="#terms" className="text-foreground hover:text-primary transition-colors">
            Terms
          </a>
          <a href="/admin" className="text-foreground hover:text-primary transition-colors">
            Admin
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="accent" size="sm">
            Go to Discord
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;