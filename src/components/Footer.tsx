import { Heart, MessageCircle, Instagram } from "lucide-react";
import logo from "@/assets/narellogo.png";

const Footer = () => {
  return (
    <footer className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-card rounded-lg p-8 shadow-card mb-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={logo}
                  alt="NareL Digital Logo" 
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-lg font-display font-semibold text-foreground">NareL Digital</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Marketplace digital terpercaya untuk produk premium Indonesia.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Produk</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Premium Apps</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Digital Product</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Digital Services</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
            <h4 className="font-medium text-foreground">Kontak</h4>
            <div className="flex flex-col space-y-2">
              <a
                href="https://api.whatsapp.com/send/?phone=628992173777&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.instagram.com/narel.idn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href="https://discord.gg/narelid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Discord</span>
              </a>
            </div>
          </div>

          </div>
          
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NareL Digital. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Developed and Partnership with</span>
              <a href="https://discord.gg/eACp5vMzZn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                sleeping.stu
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;