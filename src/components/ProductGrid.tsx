import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";

interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  price: number; 
  price_adjustment: number;
  discount_percentage?: number | null; 
  is_available: boolean; 
  created_at: string;
  updated_at: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  discount: boolean;
  discount_percentage?: number;
  description: string | null;
  images: string[] | null;
  created_at: string;
  product_type?: string;
  variants?: ProductVariant[];
}

interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  discount: boolean;
  discount_percentage?: number;
  description: string | null;
  images: string[] | null;
  created_at: string;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Sort by creation date ascending (oldest first) so new products appear at bottom
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (productsError) throw productsError;

      // Fetch variants for each product
      const productsWithVariants = await Promise.all(
        (productsData || []).map(async (product: DatabaseProduct) => {
          const { data: variants, error: variantsError } = await supabase
            .from('product_variants')
            .select('*')
            .eq('product_id', product.id);

          if (variantsError) {
            console.error('Failed to fetch variants:', variantsError);
            return { ...product, variants: [] };
          }

          return { ...product, variants: variants || [] } as Product;
        })
      );

      setProducts(productsWithVariants);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

    const formatProductForCard = (product: Product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    discount_percentage: product.discount_percentage,
    image: product.images && product.images.length > 0
      ? product.images[0]
      : "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&crop=center",
    product_type: product.product_type,
    variants: product.variants || []
  });

  if (isLoading) {
    return (
      <section id="products" className="py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Featured Digital Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of high-quality digital products and services designed to boost your business.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            {/* Loading skeleton */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-card rounded-lg sm:rounded-xl md:rounded-2xl shadow-card overflow-hidden animate-pulse">
                <div className="w-full h-28 sm:h-36 md:h-40 lg:h-48 bg-muted"></div>
                <div className="p-2 sm:p-3 md:p-4 lg:p-6 space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4">
                  <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    <div className="h-3 sm:h-4 md:h-5 lg:h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-2.5 sm:h-3 md:h-4 bg-muted rounded w-full"></div>
                    <div className="h-2.5 sm:h-3 md:h-4 bg-muted rounded w-2/3"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 sm:h-5 md:h-6 lg:h-8 bg-muted rounded w-1/3"></div>
                    <div className="h-4 sm:h-5 md:h-6 lg:h-8 bg-muted rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Featured Digital Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of high-quality digital products and services designed to boost your business.
          </p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...formatProductForCard(product)} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4">📦</div>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-1 sm:mb-2">No Products Yet</h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2 sm:px-4">
              Products added through the admin panel will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;