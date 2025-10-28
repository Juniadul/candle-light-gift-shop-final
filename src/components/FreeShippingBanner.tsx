import { Truck } from "lucide-react";

const FreeShippingBanner = () => {
  return (
    <div className="bg-gradient-primary text-primary-foreground py-3 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="inline-flex items-center gap-3 mx-8">
            <Truck className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Free Shipping Over 100 Pieces of Order
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeShippingBanner;