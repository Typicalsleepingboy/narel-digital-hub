import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Download, Heart, Share2, Minus, Plus, ArrowLeft, Smartphone, Code, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

interface Product {
    id: string;
    name: string;
    price: number;
    discount: boolean;
    discount_percentage?: number;
    description: string;
    images: string[];
    created_at: string;
    product_type?: string;
    variants?: ProductVariant[];
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data: productData, error: productError } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (productError) throw productError;

            const { data: variants, error: variantsError } = await supabase
                .from('product_variants')
                .select('*')
                .eq('product_id', id) as { data: ProductVariant[] | null, error: any };

            if (variantsError) throw variantsError;

            if (productData) {
                setProduct({
                    ...productData,
                    variants: variants || []
                } as Product);
            }

            if (variants && variants.length > 0) {
                setSelectedVariant(variants[0]);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDescription = (description: string) => {
        return description
            .split('\n')
            .map((line, index) => {
                // Handle bullet points with »
                if (line.trim().startsWith('»')) {
                    return (
                        <div key={index} className="flex items-start space-x-2 ml-2">
                            <span className="text-primary font-bold mt-0.5">»</span>
                            <span>{line.trim().substring(1).trim()}</span>
                        </div>
                    );
                }

                // Handle bullet points with •
                if (line.trim().startsWith('•')) {
                    return (
                        <div key={index} className="flex items-start space-x-2 ml-2">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span>{line.trim().substring(1).trim()}</span>
                        </div>
                    );
                }

                // Handle section headers (lines ending with :)
                if (line.trim().endsWith(':') && line.trim().length > 1) {
                    return (
                        <div key={index} className="font-semibold text-foreground mt-4 mb-2 first:mt-0">
                            {line.trim()}
                        </div>
                    );
                }

                // Handle empty lines
                if (line.trim() === '') {
                    return <div key={index} className="h-2"></div>;
                }

                // Regular text
                return (
                    <div key={index} className="mb-1">
                        {line}
                    </div>
                );
            });
    };

    const getProductTypeInfo = (productType?: string) => {
        switch (productType) {
            case 'premium_app':
                return {
                    icon: Smartphone,
                    label: 'Premium App',
                    color: 'bg-gradient-to-r from-blue-500 to-purple-500',
                    description: 'Premium aplikasi dengan fitur lengkap'
                };
            case 'digital_service':
                return {
                    icon: Globe,
                    label: 'Digital Service',
                    color: 'bg-gradient-to-r from-green-500 to-teal-500',
                    description: 'Layanan digital profesional'
                };
            case 'digital_product':
                return {
                    icon: Code,
                    label: 'Digital Product',
                    color: 'bg-gradient-to-r from-orange-500 to-red-500',
                    description: 'Produk digital berkualitas tinggi'
                };
            default:
                return {
                    icon: Download,
                    label: 'Digital Product',
                    color: 'bg-gradient-to-r from-gray-500 to-gray-600',
                    description: 'Produk digital'
                };
        }
    };

    const calculatePrice = () => {
        if (!product) return 0;

        let basePrice = selectedVariant ? selectedVariant.price || product.price : product.price;
        const discountPercentage = selectedVariant?.discount_percentage || product.discount_percentage;

        if (discountPercentage) {
            return basePrice - (basePrice * discountPercentage / 100);
        }

        return basePrice;
    };

    const calculateOriginalPrice = () => {
        if (!product) return 0;
        return selectedVariant ? selectedVariant.price || product.price : product.price;
    };

    const calculateVariantPrice = (variant: ProductVariant) => {
        const basePrice = variant.price || product?.price || 0;
        const discountPercentage = variant.discount_percentage || product?.discount_percentage;
        
        if (discountPercentage) {
            return basePrice - (basePrice * discountPercentage / 100);
        }
        
        return basePrice;
    };

    const calculateVariantOriginalPrice = (variant: ProductVariant) => {
        return variant.price || product?.price || 0;
    };

    const handleWhatsAppOrder = () => {
        if (!product) return;

        const productName = product.name;
        const variantText = selectedVariant ? `Variant: ${selectedVariant.variant_name}` : '';
        const quantityText = `Jumlah: ${quantity}`;
        const totalPrice = `Total Harga: Rp ${(calculatePrice() * quantity).toLocaleString('id-ID')}`;
        
        const message = `Halo, saya ingin membeli produk berikut:\n\n*${productName}*\n${variantText ? `${variantText}\n` : ''}${quantityText}\n${totalPrice}\n\nMohon informasi untuk pembayaran. Terima kasih!`;
        
        const whatsappUrl = `https://api.whatsapp.com/send/?phone=628992173777&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
        window.open(whatsappUrl, '_blank');
    };

    useEffect(() => {
    }, [product, selectedVariant]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
                <div className="text-center space-y-4">
                    <div className="text-6xl opacity-50">🔍</div>
                    <h2 className="text-2xl font-bold text-foreground">Product Not Found</h2>
                    <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
                    <Button onClick={() => window.history.back()} variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/10 to-background">
            <Navbar />
            
            <main className="flex-1">
                <div className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-8 pb-4 sm:pb-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-8 overflow-x-auto">
                        <span>Home</span>
                        <span>/</span>
                        <span>Products</span>
                        <span>/</span>
                        <span className="text-foreground font-medium truncate">{product.name}</span>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-16">
                            {/* Product Images Section */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* Main Image */}
                                <div className="relative group">
                                    <div className="aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-muted/20 to-muted/5 p-2 sm:p-4">
                                        <img
                                            src={product.images[selectedImageIndex]}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-xl sm:rounded-2xl transition-all duration-500 group-hover:scale-105"
                                        />

                                        {/* Overlay Badges */}
                                        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 space-y-2">
                                            {product.discount && product.discount_percentage && (
                                                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg text-xs">
                                                    {product.discount_percentage}% OFF
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="absolute top-3 sm:top-6 right-3 sm:right-6 space-y-2">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
                                                onClick={() => setIsWishlisted(!isWishlisted)}
                                            >
                                                <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: product.name,
                                                            text: product.description,
                                                            url: window.location.href
                                                        });
                                                    } else {
                                                        navigator.clipboard.writeText(window.location.href);
                                                    }
                                                }}
                                            >
                                                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Thumbnail Gallery */}
                                <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 px-1">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                                                selectedImageIndex === index
                                                    ? 'ring-2 ring-primary ring-offset-2 scale-105'
                                                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Info Section */}
                            <div className="space-y-8">
                                {/* Header */}
                                <div className="space-y-3 sm:space-y-4">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight break-words">
                                        {product.name}
                                    </h1>

                                    {/* Product Type Badge */}
                                    {product.product_type && (
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                            {(() => {
                                                const typeInfo = getProductTypeInfo(product.product_type);
                                                const IconComponent = typeInfo.icon;
                                                return (
                                                    <div className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-white shadow-lg ${typeInfo.color} w-fit`}>
                                                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        <span className="text-xs sm:text-sm font-medium">{typeInfo.label}</span>
                                                    </div>
                                                );
                                            })()}
                                            <div className="text-xs sm:text-sm text-muted-foreground">
                                                {getProductTypeInfo(product.product_type).description}
                                            </div>
                                        </div>
                                    )}

                                    {/* Formatted Description */}
                                    <div className="text-sm sm:text-base text-muted-foreground leading-relaxed bg-muted/20 rounded-xl p-3 sm:p-4 overflow-hidden">
                                        {formatDescription(product.description)}
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                                        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary break-all">
                                            Rp {calculatePrice().toLocaleString('id-ID')}
                                        </span>
                                        {product.discount && product.discount_percentage && (
                                            <span className="text-lg sm:text-xl text-muted-foreground line-through">
                                                Rp {calculateOriginalPrice().toLocaleString('id-ID')}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground">Inclusive of all taxes</p>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3 rounded-xl bg-muted/30">
                                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        <span className="text-xs sm:text-sm font-medium text-center sm:text-left">Secure</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3 rounded-xl bg-muted/30">
                                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        <span className="text-xs sm:text-sm font-medium text-center sm:text-left">Instant</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3 rounded-xl bg-muted/30">
                                        <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                        <span className="text-xs sm:text-sm font-medium text-center sm:text-left">Digital</span>
                                    </div>
                                </div>

                                {/* Variant Selection */}
                                {product.variants && product.variants.length > 0 && (
                                    <div className="space-y-3 sm:space-y-4 border rounded-xl p-3 sm:p-4">
                                        <label className="text-base sm:text-lg font-semibold">Select Option</label>
                                        <div className="space-y-2">
                                            {product.variants.map((variant) => (
                                                <button
                                                    key={variant.id}
                                                    onClick={() => setSelectedVariant(variant)}
                                                    disabled={!variant.is_available}
                                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 ${
                                                        selectedVariant?.id === variant.id
                                                            ? 'border-primary bg-primary/5'
                                                            : variant.is_available
                                                                ? 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                                                                : 'border-red-200 bg-red-50/50 cursor-not-allowed opacity-60 pointer-events-none'
                                                    }`}
                                                >
                                                    <div className="flex flex-col items-start w-full">
                                                        <div className="flex items-center justify-between w-full">
                                                            <div className="flex items-center space-x-2">
                                                                <span className={`font-medium text-sm sm:text-base ${!variant.is_available ? 'text-red-500 line-through' : ''}`}>
                                                                    {variant.variant_name}
                                                                </span>
                                                                {!variant.is_available && (
                                                                    <Badge variant="destructive" className="text-xs bg-red-500 text-white border-red-500">
                                                                        Sold Out
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            {variant.discount_percentage && variant.is_available && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    -{variant.discount_percentage}%
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className={`text-xs sm:text-sm ${!variant.is_available ? 'text-red-400 line-through' : ''}`}>
                                                            <span className="font-medium text-primary">
                                                                Rp {calculateVariantPrice(variant).toLocaleString('id-ID')}
                                                            </span>
                                                            {(variant.discount_percentage || product.discount_percentage) && (
                                                                <span className="ml-2 text-muted-foreground line-through opacity-70">
                                                                    Rp {calculateVariantOriginalPrice(variant).toLocaleString('id-ID')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div className="space-y-2 sm:space-y-3">
                                    <label className="text-sm sm:text-base font-semibold">Quantity</label>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <div className="flex items-center border-2 border-muted rounded-xl overflow-hidden mx-auto sm:mx-0">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 sm:h-12 w-10 sm:w-12 rounded-none hover:bg-muted"
                                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                disabled={quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </Button>
                                            <div className="w-12 sm:w-16 text-center font-semibold text-sm sm:text-base">{quantity}</div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-10 sm:h-12 w-10 sm:w-12 rounded-none hover:bg-muted"
                                                onClick={() => setQuantity(q => q + 1)}
                                            >
                                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </Button>
                                        </div>
                                        <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
                                            Total: <span className="font-semibold text-primary break-all">
                                                Rp {(calculatePrice() * quantity).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                                    <Button
                                        className={`w-full h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl shadow-xl transition-all duration-300 ${
                                            selectedVariant && !selectedVariant.is_available
                                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                                : 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:shadow-2xl transform hover:scale-[1.02]'
                                        }`}
                                        size="lg"
                                        onClick={handleWhatsAppOrder}
                                        disabled={selectedVariant && !selectedVariant.is_available}
                                    >
                                        {selectedVariant && !selectedVariant.is_available ? 'Not Available' : 'Buy Now'}
                                    </Button>

                                    <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-muted-foreground pt-2">
                                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>Secure Payment Process</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}