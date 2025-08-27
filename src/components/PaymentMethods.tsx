import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PaymentMethods = () => {
  const paymentMethods = [
    {
      name: "BCA",
      logo: "https://www.bca.co.id/-/media/Feature/Card/List-Card/Tentang-BCA/Brand-Assets/Logo-BCA/Logo-BCA_Biru.png",
      description: "Bank Central Asia",
    },
    {
      name: "DANA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/200px-Logo_dana_blue.svg.png",
      description: "E-wallet DANA",
    },
    {
      name: "GoPay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/200px-Gopay_logo.svg.png",
      description: "E-wallet GoPay",
    },
    {
      name: "OVO",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/200px-Logo_ovo_purple.svg.png",
      description: "E-wallet OVO",
    },
    {
      name: "ShopeePay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/200px-Shopee.svg.png",
      description: "E-wallet ShopeePay",
    },
    {
      name: "QRIS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/200px-QRIS_logo.svg.png",
      description: "Scan QR code",
    },
    {
      name: "PayPal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png",
      description: "Pembayaran global",
    },
    {
      name: "Crypto",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/200px-Bitcoin.svg.png",
      description: "Cryptocurrency",
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Metode Pembayaran
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berbagai pilihan pembayaran untuk kemudahan dan kenyamanan transaksi Anda
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {paymentMethods.map((method, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card className="h-full border border-gray-200/60 hover:border-red-300 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white">
                    <CardContent className="flex flex-col items-center justify-center p-5 text-center space-y-3">
                      <div className="w-16 h-16 flex items-center justify-center p-2 bg-white rounded-lg">
                        <img
                          src={method.logo}
                          alt={method.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{method.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-red-50 rounded-full py-2 px-4 border border-red-100">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-red-700">
              Pembayaran aman dan terpercaya • Proses otomatis 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;