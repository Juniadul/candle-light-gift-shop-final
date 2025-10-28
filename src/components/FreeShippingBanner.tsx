import { Truck } from "lucide-react";

const FreeShippingBanner = () => {
  return (
    <div className="bg-gradient-hero text-primary-foreground py-3 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="inline-flex items-center gap-3 text-sm font-medium">
            <Truck className="w-5 h-5 animate-bounce" />
            <span className="tracking-wide">Free Shipping on Orders Over 100 Pieces</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeShippingBanner;
