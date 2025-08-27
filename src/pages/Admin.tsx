import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Edit, LogIn, LogOut, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductVariant {
  price_adjustment: any;
  id?: string;
  product_id?: string; 
  variant_name: string;
  price: number;
  discount_percentage?: number;
  is_available: boolean;
  [key: string]: any;
}

type VariantValue = string | number | boolean;

interface Product {
  discount_percentage: any;
  discount: any;
  price: any;
  id: string;
  name: string;
  description: string;
  images: string[];
  created_at: string;
  is_available: boolean;
  variants?: ProductVariant[];
}

interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  discount: boolean;
  discount_percentage?: number;
  description: string;
  images: string[];
  created_at: string;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [""],
    productType: "digital_product",
    is_available: true,
    variants: [{ 
      variant_name: "", 
      price: 0,
      discount_percentage: 0,
      is_available: true 
    }] as ProductVariant[]
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Fetch variants for each product
      const productsWithVariants = await Promise.all(
        (productsData || []).map(async (product: DatabaseProduct) => {
          const { data: variants, error: variantsError } = await supabase
            .from('product_variants')
            .select('*')
            .eq('product_id', product.id);

          if (variantsError) throw variantsError;

          return {
            ...product,
            variants: variants || []
          } as unknown as Product;
        })
      );

      setProducts(productsWithVariants);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const handleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: authData.email,
        password: authData.password,
      });

      if (error) throw error;
      
      toast({ title: "Success", description: "Logged in successfully" });
      setAuthData({ email: "", password: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({ title: "Success", description: "Logged out successfully" });
      setProducts([]);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        images: formData.images.filter(img => img.trim() !== ""),
        is_available: formData.is_available,
        price: formData.variants[0]?.price || 0,
        discount: formData.variants[0]?.discount_percentage ? true : false,
        discount_percentage: formData.variants[0]?.discount_percentage || null
      };

      let productId: string;

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        productId = editingProduct.id;

        // Delete existing variants
        await supabase
          .from('product_variants')
          .delete()
          .eq('product_id', productId);

        toast({ title: "Success", description: "Product updated successfully" });
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();

        if (error) throw error;
        toast({ title: "Success", description: "Product added successfully" });
      }

      // Insert variants
      const validVariants = formData.variants.filter(v => v.variant_name.trim() !== "");
      if (validVariants.length > 0) {
        const variantsData = validVariants.map(variant => ({
          product_id: productId,
          variant_name: variant.variant_name,
          price_adjustment: variant.price_adjustment
        }));

        const { error: variantsError } = await supabase
          .from('product_variants')
          .insert(variantsData);

        if (variantsError) throw variantsError;
      }

      resetForm();
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (id: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Product deleted successfully" });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      images: product.images.length > 0 ? product.images : [""],
      productType: "digital_product",
      is_available: product.is_available,
      variants: product.variants && product.variants.length > 0 
        ? product.variants.map(v => ({ 
            id: v.id,
            product_id: v.product_id,
            variant_name: v.variant_name, 
            price: v.price,
            price_adjustment: v.price_adjustment || 0,
            discount_percentage: v.discount_percentage || 0,
            is_available: v.is_available
          }))
        : [{ 
            variant_name: "", 
            price: 0, 
            price_adjustment: 0,
            discount_percentage: 0,
            is_available: true 
          }]
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      images: [""],
      productType: "digital_product",
      is_available: true,
      variants: [{
        variant_name: "",
        price: 0,
        discount_percentage: 0,
        is_available: true,
        price_adjustment: undefined
      }]
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ""]
    }));
  };

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImageField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { 
        variant_name: "", 
        price: 0,
        discount_percentage: 0,
        is_available: true,
        price_adjustment: 0
      }]
    }));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: VariantValue) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={authData.email}
                  onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={authData.password}
                  onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button onClick={handleAuth} className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.email}
            </span>
            <Button onClick={() => window.location.href = "/"} variant="outline">
              Back to Home
            </Button>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button onClick={handleSignOut} variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Product Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="productType">Product Type</Label>
                    <Select
                      value={formData.productType || "digital_product"}
                      onValueChange={(value) => {
                        setFormData(prev => ({ 
                          ...prev, 
                          productType: value,
                          variants: value === "digital_service" ? 
                            [{ 
                              variant_name: "Digital Service", 
                              price_adjustment: 0,
                              price: 0,
                              is_available: true,
                              discount_percentage: 0
                            }] :
                            [{ 
                              variant_name: "", 
                              price_adjustment: 0,
                              price: 0,
                              is_available: true,
                              discount_percentage: 0
                            }]
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium_app">Premium App</SelectItem>
                        <SelectItem value="digital_service">Digital Service</SelectItem>
                        <SelectItem value="digital_product">Digital Product</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Product Variants */}
                <div className="space-y-4">
                  <Label>Product Variants</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    {formData.productType === "digital_service" 
                      ? "Configure service options and platforms"
                      : "Add different options for this product"}
                  </p>
                  {formData.variants.map((variant, index) => (
                    <div key={index} className="space-y-3 border rounded-lg p-4 bg-muted/10">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Variant {index + 1}</h4>
                        {formData.variants.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeVariant(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-3">
                          <div>
                            <Label>Discord Package</Label>
                            <Select
                              value={variant.variant_name}
                              onValueChange={(value) => {
                                updateVariant(index, 'variant_name', value);
                                // Set default price based on package
                                let defaultPrice = 0;
                                switch(value) {
                                  case "Discord Nitro Basic":
                                    defaultPrice = 50000;
                                    break;
                                  case "Discord Nitro Classic":
                                    defaultPrice = 75000;
                                    break;
                                  case "Discord Nitro":
                                    defaultPrice = 100000;
                                    break;
                                  case "Discord Server Boost":
                                    defaultPrice = 85000;
                                    break;
                                }
                                updateVariant(index, 'price', defaultPrice);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Discord package" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Discord Nitro Basic">Discord Nitro Basic</SelectItem>
                                <SelectItem value="Discord Nitro Classic">Discord Nitro Classic</SelectItem>
                                <SelectItem value="Discord Nitro">Discord Nitro</SelectItem>
                                <SelectItem value="Discord Server Boost">Discord Server Boost</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Package Price</Label>
                            <Input
                              type="number"
                              placeholder="Enter price"
                              value={variant.price}
                              onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) || 0)}
                            />
                          </div>

                          <div>
                            <Label>Discount Percentage (%)</Label>
                            <Input
                              type="number"
                              placeholder="Enter discount"
                              min="0"
                              max="100"
                              value={variant.discount_percentage || 0}
                              onChange={(e) => updateVariant(index, 'discount_percentage', parseFloat(e.target.value) || 0)}
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={variant.is_available}
                              onCheckedChange={(checked) => updateVariant(index, 'is_available', checked)}
                            />
                            <Label>Available</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariant}
                    className="mt-2 w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {formData.productType === "digital_service" ? "Service Option" : "Variant"}
                  </Button>
                </div>

                <div>
                  <Label>Images (URLs)</Label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        placeholder="Image URL"
                      />
                      {formData.images.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeImageField(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleSubmit}>
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-primary font-bold">Rp {product.price.toLocaleString()}</p>
                    {product.discount && product.discount_percentage && (
                      <span className="text-sm text-green-600">
                        Discount: {product.discount_percentage}%
                      </span>
                    )}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">Variants:</p>
                        {product.variants.map((variant, i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            • {variant.variant_name} 
                            {variant.price_adjustment !== 0 && (
                              <span className="text-primary">
                                {variant.price_adjustment > 0 ? '+' : ''}
                                {variant.price_adjustment.toLocaleString()}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {product.description && (
                      <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editProduct(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found. Add your first product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;