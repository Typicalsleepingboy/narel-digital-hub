import ProductCard from "./ProductCard";

// Sample products data - in real app this would come from MongoDB
const sampleProducts = [
  {
    id: "1",
    name: "Premium WordPress Theme Bundle",
    price: 500000,
    discount: { enabled: true, value: 25 },
    description: "Professional WordPress themes for business and portfolio websites with lifetime updates.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop&crop=center",
    rating: 4.9
  },
  {
    id: "2", 
    name: "Digital Marketing Course",
    price: 750000,
    discount: { enabled: false, value: 0 },
    description: "Complete digital marketing masterclass covering SEO, social media, and content marketing.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center",
    rating: 4.8
  },
  {
    id: "3",
    name: "Mobile App UI Kit",
    price: 300000,
    discount: { enabled: true, value: 30 },
    description: "Modern mobile app UI components and templates for iOS and Android development.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center",
    rating: 4.7
  },
  {
    id: "4",
    name: "Logo Design Package",
    price: 400000,
    discount: { enabled: false, value: 0 },
    description: "Professional logo design service with multiple concepts and unlimited revisions.",
    image: "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=400&h=300&fit=crop&crop=center",
    rating: 4.9
  },
  {
    id: "5",
    name: "E-commerce Website Template",
    price: 600000,
    discount: { enabled: true, value: 20 },
    description: "Responsive e-commerce website template with shopping cart and payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
    rating: 4.6
  },
  {
    id: "6",
    name: "Social Media Graphics Pack",
    price: 250000,
    discount: { enabled: true, value: 40 },
    description: "Collection of social media templates for Instagram, Facebook, and LinkedIn posts.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
    rating: 4.8
  }
];

const ProductGrid = () => {
  return (
    <section id="products" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-display font-bold text-foreground">
            Featured Digital Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of high-quality digital products and services designed to boost your business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-primary hover:text-accent font-medium transition-colors">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;