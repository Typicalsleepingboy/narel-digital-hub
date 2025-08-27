import { Card } from "@/components/ui/card";
import { Shield, Clock, RefreshCw, HeartHandshake, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const TermsSection = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const terms = [
    {
      icon: Shield,
      title: "Tentang Order",
      description: "Ketentuan umum untuk semua pemesanan",
      content: [
        "Semua Orderan bersifat NO REFUND",
        "Jika produk (yang bergaransi) bermasalah akan diganti yang baru (replace)",
        "Replacement diberikan jika produk masih dalam masa garansi",
        "Barang yang sudah dibeli tidak bisa dikembalikan",
        "Tanyakan stock terlebih dahulu sebelum order",
        "Selalu menyertakan bukti transfer berupa foto / screenshot",
        "Semua produk memiliki waktu proses paling lama 2x24 Jam",
        "Jika lebih dari 48 Jam, akan di refund",
        "NO RUSH ORDER !"
      ]
    },
    {
      icon: Clock,
      title: "Tentang Produk",
      description: "Aturan penggunaan produk yang dibeli",
      content: [
        "Mohon tidak mengotak-atik akun yang diberikan (jika produk yang dibeli berasal dari akun seller)",
        "Dilarang mengubah payment method / sejenisnya",
        "Jika dirasa ada masalah dengan produknya, bisa hubungi kami, jangan otak-atik sendiri",
        "Mohon ikuti Syarat & Ketentuan yang diberikan saat produk dikirimkan",
        "NGEYEL = GARANSI VOID = NO REF = NO REPLACE"
      ]
    },
    {
      icon: RefreshCw,
      title: "Tentang Garansi",
      description: "Kebijakan garansi dan penggantian produk",
      content: [
        "Garansi bisa dilakukan jika produk masih dalam masa garansi",
        "Proses Garansi 3x24 Jam sejak laporan, (tergantung situasi, kondisi dan toleransi)",
        "NO RUSH !"
      ]
    },
    {
      icon: HeartHandshake,
      title: "Catatan Penting", 
      description: "Hal-hal penting yang harus diperhatikan",
      content: [
        "Membeli = Menerima TOS ini",
        "Kami berhak mencabut garansi anda jika memang dilihat adanya kecurigaan",
        "Melanggar TOS = Garansi hangus, akun di tarik, No Refund!"
      ]
    }
  ];

  return (
    <section id="terms" className="py-16 px-4 ">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-display font-bold text-foreground">
            Syarat & Ketentuan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ketentuan yang jelas dan transparan untuk melindungi pembeli dan penjual.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {terms.map((term, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <term.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-left">{term.title}</h3>
                      <p className="text-muted-foreground text-sm text-left">{term.description}</p>
                    </div>
                  </div>
                  {expandedSection === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                {expandedSection === index && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <ul className="space-y-2">
                      {term.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <Card className="p-8 bg-card">
          <div className="text-center">
            <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
              Informasi Tambahan
            </h3>
            <p className="text-muted-foreground mb-6">
              Dengan melakukan pembelian, Anda otomatis menyetujui seluruh syarat dan ketentuan yang berlaku.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary font-medium">
                ⚠️ Penting: Pelanggaran terhadap syarat dan ketentuan dapat mengakibatkan pembatalan garansi dan tidak ada pengembalian dana.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TermsSection;