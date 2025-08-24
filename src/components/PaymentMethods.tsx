import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PaymentMethods = () => {
  const paymentMethods = [
    {
      name: "Bank Transfer",
      logo: "https://via.placeholder.com/120x60/3b82f6/ffffff?text=Bank+Transfer",
      description: "Transfer bank lokal"
    },
    {
      name: "GoPay",
      logo: "https://via.placeholder.com/120x60/00aa5b/ffffff?text=GoPay",
      description: "E-wallet GoPay"
    },
    {
      name: "OVO",
      logo: "https://via.placeholder.com/120x60/4c1a85/ffffff?text=OVO",
      description: "E-wallet OVO"
    },
    {
      name: "DANA",
      logo: "https://via.placeholder.com/120x60/118ab2/ffffff?text=DANA",
      description: "E-wallet DANA"
    },
    {
      name: "LinkAja",
      logo: "https://via.placeholder.com/120x60/dc2626/ffffff?text=LinkAja",
      description: "E-wallet LinkAja"
    },
    {
      name: "ShopeePay",
      logo: "https://via.placeholder.com/120x60/f97316/ffffff?text=ShopeePay",
      description: "E-wallet ShopeePay"
    },
    {
      name: "QRIS",
      logo: "https://via.placeholder.com/120x60/059669/ffffff?text=QRIS",
      description: "Scan QR code"
    },
    {
      name: "Indomaret",
      logo: "https://via.placeholder.com/120x60/eab308/ffffff?text=Indomaret",
      description: "Bayar di Indomaret"
    },
    {
      name: "Alfamart",
      logo: "https://via.placeholder.com/120x60/dc2626/ffffff?text=Alfamart",
      description: "Bayar di Alfamart"
    }
  ];

  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Metode Pembayaran
          </h2>
          <p className="text-lg text-muted-foreground">
            Berbagai pilihan pembayaran untuk kemudahan Anda
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {paymentMethods.map((method, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <img
                        src={method.logo}
                        alt={method.name}
                        className="w-24 h-12 object-contain rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold text-sm">{method.name}</h3>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Pembayaran aman dan terpercaya ✓ Proses otomatis 24/7 ✓
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;