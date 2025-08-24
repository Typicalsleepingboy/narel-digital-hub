import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discount?: {
    enabled: boolean;
    value: number;
  };
  description: string;
  image: string;
  rating?: number;
}

const ProductCard = ({ name, price, discount, description, image, rating = 4.8 }: ProductCardProps) => {
  const discountedPrice = discount?.enabled ? price - (price * discount.value / 100) : price;
  
  return (
    <div className="bg-card rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount?.enabled && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            -{discount.value}%
          </Badge>
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-display font-semibold text-lg text-card-foreground line-clamp-2">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">•</span>
          <span className="text-sm text-muted-foreground">Digital Product</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                Rp{discountedPrice.toLocaleString('id-ID')}
              </span>
              {discount?.enabled && (
                <span className="text-sm text-muted-foreground line-through">
                  Rp{price.toLocaleString('id-ID')}
                </span>
              )}
            </div>
          </div>
          
          <Button variant="accent" size="sm" className="group">
            <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;