import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ChevronDown, Smartphone, Code, Globe, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductVariant {
  id: string;
  variant_name: string;
  price_adjustment: number;
  price: number;
  discount_percentage?: number | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discount?: boolean;
  discount_percentage?: number;
  image: string;
  product_type?: string;
  variants?: ProductVariant[];
}


const ProductCard = ({
  id,
  name,
  price,
  discount,
  discount_percentage,
  image,
  product_type,
  variants = []
}: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants.length > 0 ? variants[0] : null
  );
  const [showVariants, setShowVariants] = useState(false);

  const calculatePrice = () => {
    let basePrice = selectedVariant ? selectedVariant.price || price : price;
    if (discount && discount_percentage) {
      return basePrice - (basePrice * discount_percentage / 100);
    }
    return basePrice;
  };

  const calculateOriginalPrice = () => {
    return selectedVariant ? selectedVariant.price || price : price;
  };

  const getProductTypeInfo = (productType?: string) => {
    switch (productType) {
      case 'premium_app':
        return {
          icon: Smartphone,
          label: 'Premium App',
          color: 'bg-gradient-to-r from-blue-500 to-purple-500'
        };
      case 'digital_service':
        return {
          icon: Globe,
          label: 'Digital Service',
          color: 'bg-gradient-to-r from-green-500 to-teal-500'
        };
      case 'digital_product':
        return {
          icon: Code,
          label: 'Digital Product',
          color: 'bg-gradient-to-r from-orange-500 to-red-500'
        };
      default:
        return {
          icon: Download,
          label: 'Digital Product',
          color: 'bg-gradient-to-r from-gray-500 to-gray-600'
        };
    }
  };

  const finalPrice = calculatePrice();
  const originalPrice = calculateOriginalPrice();

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="bg-card rounded-xl sm:rounded-2xl shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden group">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        {discount && discount_percentage && (
          <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-accent text-accent-foreground text-xs">
            -{discount_percentage}%
          </Badge>
        )}
      </div>
      
      <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
        <div className="space-y-1 sm:space-y-2">
          <h3 className="font-display font-semibold text-sm sm:text-base md:text-lg text-card-foreground line-clamp-2">
            {name}
          </h3>
          {product_type && (
            <div className="flex items-center space-x-1">
              {(() => {
                const typeInfo = getProductTypeInfo(product_type);
                const IconComponent = typeInfo.icon;
                return (
                  <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-white text-xs ${typeInfo.color}`}>
                    <IconComponent className="w-3 h-3" />
                    <span className="font-medium">{typeInfo.label}</span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
        
        {/* Variant Selector */}
        {variants.length > 0 && (
          <div className="relative">
            <div 
              className="border rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
              onClick={() => setShowVariants(!showVariants)}
            >
              <span className="text-xs sm:text-sm font-medium truncate pr-2">
                {selectedVariant?.variant_name || "Select variant"}
              </span>
              <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${showVariants ? 'rotate-180' : ''}`} />
            </div>
            
            {showVariants && (
              <div className="absolute z-10 w-full mt-1 bg-card border rounded-md sm:rounded-lg shadow-lg max-h-32 sm:max-h-48 overflow-y-auto">
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      setSelectedVariant(variant);
                      setShowVariants(false);
                    }}
                  >
                    <span className="text-xs sm:text-sm truncate pr-2">{variant.variant_name}</span>
                    <span className="text-xs text-primary font-medium flex-shrink-0">
                        Rp{variant.price.toLocaleString('id-ID')}
                      </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                Rp{finalPrice.toLocaleString('id-ID')}
              </span>
              {discount && discount_percentage && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  Rp{originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>
          </div>
          
          <Link to={`/product/${id}`} className="block">
            <Button variant="accent" size="sm" className="w-full group text-xs sm:text-sm py-1.5 sm:py-2">
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform mr-1 sm:mr-2" />
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">Details</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;