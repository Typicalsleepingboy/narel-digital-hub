import { Heart, MessageCircle, Instagram, Star, Shield, Zap, Download, Smartphone, Code, Globe, Mail, MapPin, Clock, Award, Users, CheckCircle } from "lucide-react";
import logo from "@/assets/narellogo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-background via-muted/30 to-background border-t border-border">
      {/* Main Footer Content */}
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img
                src={logo}
                alt="NareL Digital Logo"
                className="w-12 h-12 object-contain animate-pulse"
              />
              <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NareL Digital
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              🚀 Your trusted digital marketplace for premium Indonesian products
            </p>
            <div className="flex items-center justify-center space-x-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.9/5 Customer Rating</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center">
                <span className="mr-2">🏢</span> About Us
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NareL Digital is Indonesia's leading digital marketplace, established in 2022.
                We provide premium digital products and services with guaranteed quality.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Money-back Guarantee</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant Digital Delivery</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center">
                <span className="mr-2">📦</span> Our Products
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Smartphone className="w-4 h-4" />
                    <span>Premium Apps</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Code className="w-4 h-4" />
                    <span>Digital Products</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" />
                    <span>Digital Services</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Software Licenses</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center">
                <span className="mr-2">📞</span> Contact & Support
              </h4>
              <div className="space-y-3">
                <a
                  href="https://api.whatsapp.com/send/?phone=628992173777&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted/50"
                >
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium">WhatsApp Support</div>
                    <div className="text-xs">+62 899-217-3777</div>
                  </div>
                </a>

                <a
                  href="https://discord.gg/narelid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted/50"
                >
                  <Heart className="w-5 h-5 text-indigo-500" />
                  <div>
                    <div className="font-medium">Discord Community</div>
                    <div className="text-xs">Join our community</div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/narel.idn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted/50"
                >
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <div>
                    <div className="font-medium">Instagram</div>
                    <div className="text-xs">@narel.idn</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center">
                <span className="mr-2">🏢</span> Business Info
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div>Indonesia 🇮🇩</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Business Hours</div>
                    <div>24/7 Available</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div>support@narel.id</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border py-6 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} NareL Digital. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Developed and Partnership with</span>
              <a href="https://discord.gg/eACp5vMzZn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Sleeping.Stu
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;