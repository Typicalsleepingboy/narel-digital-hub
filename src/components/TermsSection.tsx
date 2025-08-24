import { Card } from "@/components/ui/card";
import { Shield, Clock, RefreshCw, HeartHandshake } from "lucide-react";

const TermsSection = () => {
  const terms = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "All payments are processed securely with industry-standard encryption to protect your data."
    },
    {
      icon: Clock,
      title: "Instant Delivery",
      description: "Digital products are delivered immediately after successful payment confirmation."
    },
    {
      icon: RefreshCw,
      title: "30-Day Guarantee",
      description: "Not satisfied? Get a full refund within 30 days of purchase, no questions asked."
    },
    {
      icon: HeartHandshake,
      title: "Lifetime Support", 
      description: "Access to our customer support team for any questions or issues with your purchases."
    }
  ];

  return (
    <section id="terms" className="py-16 px-4 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-display font-bold text-foreground">
            Terms of Service
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent terms that protect both you and our creators.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {terms.map((term, index) => (
            <Card key={index} className="p-6 text-center space-y-4 hover:shadow-card transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <term.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">{term.title}</h3>
              <p className="text-muted-foreground text-sm">{term.description}</p>
            </Card>
          ))}
        </div>
        
        <Card className="p-8 bg-card">
          <div className="prose prose-gray max-w-none">
            <h3 className="text-2xl font-display font-semibold mb-6 text-foreground">
              Complete Terms & Conditions
            </h3>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">1. Product Usage Rights</h4>
                <p>All digital products purchased from NareL Digital come with appropriate usage licenses. You may use products for personal or commercial projects as specified in each product's license terms.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">2. Payment & Refunds</h4>
                <p>We accept major payment methods including credit cards, bank transfers, and digital wallets. Refunds are available within 30 days of purchase for digital products that don't meet your expectations.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">3. Intellectual Property</h4>
                <p>All products sold on our platform respect intellectual property rights. Unauthorized redistribution or resale of purchased products is strictly prohibited.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">4. Customer Support</h4>
                <p>Our support team is available 24/7 to assist with any questions or technical issues. Contact us through our help center or email support.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TermsSection;