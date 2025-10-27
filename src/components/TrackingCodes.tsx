import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import * as db from "@/lib/database";

const TrackingCodes = () => {
  const [metaPixelCode, setMetaPixelCode] = useState("");
  const [googleAdSenseCode, setGoogleAdSenseCode] = useState("");

  useEffect(() => {
    loadTrackingCodes();
  }, []);

  const loadTrackingCodes = async () => {
    // Load Meta Pixel code
    const metaResult = await db.getTrackingCodeByType('meta_pixel');
    if (metaResult.success && metaResult.data) {
      setMetaPixelCode(metaResult.data.code);
    }
    
    // Load Google AdSense code
    const adsenseResult = await db.getTrackingCodeByType('google_adsense');
    if (adsenseResult.success && adsenseResult.data) {
      setGoogleAdSenseCode(adsenseResult.data.code);
    }
  };

  useEffect(() => {
    // Meta Pixel Code - inject into head
    if (metaPixelCode && metaPixelCode.trim() !== "") {
      // Extract script content from the code
      const scriptMatch = metaPixelCode.match(/<script>([\s\S]*?)<\/script>/);
      if (scriptMatch && scriptMatch[1]) {
        const script = document.createElement("script");
        script.innerHTML = scriptMatch[1];
        document.head.appendChild(script);

        // Add noscript pixel if exists
        const noscriptMatch = metaPixelCode.match(/<noscript>([\s\S]*?)<\/noscript>/);
        if (noscriptMatch && noscriptMatch[1]) {
          const noscript = document.createElement("noscript");
          noscript.innerHTML = noscriptMatch[1];
          document.head.appendChild(noscript);
        }
      }
    }

    // Google AdSense Code - inject into head
    if (googleAdSenseCode && googleAdSenseCode.trim() !== "") {
      const scriptMatch = googleAdSenseCode.match(/<script[^>]*>([\s\S]*?)<\/script>/);
      if (scriptMatch) {
        const script = document.createElement("script");
        
        // Extract attributes
        const srcMatch = googleAdSenseCode.match(/src="([^"]*)"/);
        const clientMatch = googleAdSenseCode.match(/\?client=([^"]*)"/) || googleAdSenseCode.match(/client="([^"]*)"/);
        
        if (srcMatch && srcMatch[1]) {
          script.src = srcMatch[1];
          script.async = true;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
        }
      }
    }
  }, [metaPixelCode, googleAdSenseCode]);

  return (
    <Helmet>
      {/* Meta tags for better SEO */}
      <meta name="description" content="Candle Light Gift Shop - Premium bespoke invitation cards for your special occasions" />
      <meta name="keywords" content="wedding invitations, invitation cards, bespoke invitations, Bangladesh" />
    </Helmet>
  );
};

export default TrackingCodes;