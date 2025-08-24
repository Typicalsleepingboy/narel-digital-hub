import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Edit, LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

interface Product {
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
  const [isSignUp, setIsSignUp] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: false,
    discount_percentage: "",
    description: "",
    images: [""]
  });

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        price: parseFloat(formData.price),
        discount: formData.discount,
        discount_percentage: formData.discount ? parseInt(formData.discount_percentage) || 0 : 0,
        description: formData.description,
        images: formData.images.filter(img => img.trim() !== "")
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast({ title: "Success", description: "Product updated successfully" });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast({ title: "Success", description: "Product added successfully" });
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
      price: product.price.toString(),
      discount: product.discount,
      discount_percentage: product.discount_percentage?.toString() || "",
      description: product.description || "",
      images: product.images.length > 0 ? product.images : [""]
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      discount: false,
      discount_percentage: "",
      description: "",
      images: [""]
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isSignUp ? "Create Admin Account" : "Admin Login"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
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
                  minLength={6}
                />
                {isSignUp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                {isSignUp ? "Sign Up" : "Login"}
              </Button>
              <div className="text-center">
              </div>
            </form>
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="discount"
                    checked={formData.discount}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, discount: checked }))}
                  />
                  <Label htmlFor="discount">Has Discount</Label>
                </div>

                {formData.discount && (
                  <div>
                    <Label htmlFor="discount_percentage">Discount Percentage (%)</Label>
                    <Input
                      id="discount_percentage"
                      type="number"
                      min="1"
                      max="99"
                      value={formData.discount_percentage}
                      onChange={(e) => setFormData(prev => ({ ...prev, discount_percentage: e.target.value }))}
                      placeholder="e.g. 20"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
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
                  <Button type="submit">
                    {editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
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