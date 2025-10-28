import Header from "@/components/Header";
import FreeShippingBanner from "@/components/FreeShippingBanner";
import HeroCarousel from "@/components/HeroCarousel";
import ShopByCollection from "@/components/ShopByCollection";
import ShopByEvent from "@/components/ShopByEvent";
import WeddingAccessories from "@/components/WeddingAccessories";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FreeShippingBanner />
      <main className="flex-1">
        <HeroCarousel />
        <ShopByCollection />
        <ShopByEvent />
        <WeddingAccessories />
        <TrustSection />
        <Testimonials />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;