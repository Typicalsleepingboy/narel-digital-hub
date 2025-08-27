import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import logo from "@/assets/narellogo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="text-center space-y-8 p-8">
        <div className="relative mx-auto mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-accent/30 animate-spin" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
            <div className="absolute inset-4 flex items-center justify-center bg-card rounded-full shadow-lg">
              <img
                src={logo}
                alt="NareL Digital Logo"
                className="w-16 h-16 object-contain animate-pulse"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-8xl lg:text-9xl font-display font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            onClick={() => window.location.href = '/'}
            className="group px-8 py-3 text-lg font-semibold"
          >
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>
        </div>
        <div className="flex justify-center space-x-2 pt-8">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
