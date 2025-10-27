import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Code, Save, Loader2 } from "lucide-react";
import * as db from "@/lib/database";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [metaPixelCode, setMetaPixelCode] = useState("");
  const [googleAdSenseCode, setGoogleAdSenseCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    loadTrackingCodes();
  }, [navigate]);

  const loadTrackingCodes = async () => {
    setIsLoading(true);
    
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
    
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Save Meta Pixel code
      if (metaPixelCode.trim()) {
        const metaResult = await db.saveTrackingCode('meta_pixel', metaPixelCode);
        if (!metaResult.success) {
          throw new Error('Failed to save Meta Pixel code');
        }
      }
      
      // Save Google AdSense code
      if (googleAdSenseCode.trim()) {
        const adsenseResult = await db.saveTrackingCode('google_adsense', googleAdSenseCode);
        if (!adsenseResult.success) {
          throw new Error('Failed to save Google AdSense code');
        }
      }
      
      toast.success("Settings saved successfully!");
      
      // Reload the page to apply the tracking codes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage tracking codes and integrations</p>
        </div>

        {/* Meta Pixel Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Facebook Meta Pixel
            </CardTitle>
            <CardDescription>
              Add your Facebook Meta Pixel code to track conversions and optimize ads. The code will be automatically injected into the header of your website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="metaPixel" className="block text-sm font-semibold mb-2">
                Meta Pixel Code
              </label>
              <Textarea
                id="metaPixel"
                value={metaPixelCode}
                onChange={(e) => setMetaPixelCode(e.target.value)}
                placeholder={`<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`}
                className="font-mono text-sm min-h-[200px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Paste your complete Meta Pixel code including the &lt;script&gt; tags
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Google AdSense Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Google AdSense
            </CardTitle>
            <CardDescription>
              Add your Google AdSense code to display ads on your website. The code will be automatically injected into the header of your website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="googleAdSense" className="block text-sm font-semibold mb-2">
                Google AdSense Code
              </label>
              <Textarea
                id="googleAdSense"
                value={googleAdSenseCode}
                onChange={(e) => setGoogleAdSenseCode(e.target.value)}
                placeholder={`<!-- Google AdSense Code -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
<!-- End Google AdSense Code -->`}
                className="font-mono text-sm min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Paste your Google AdSense code including the &lt;script&gt; tags
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            variant="gradient"
            size="lg"
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>

        {/* Instructions */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-lg">How it works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>1. Get your tracking codes:</strong> Copy your Meta Pixel ID from Facebook Business Manager and your AdSense code from Google AdSense.
            </p>
            <p>
              <strong>2. Paste the codes:</strong> Paste the complete code snippets (including script tags) into the fields above.
            </p>
            <p>
              <strong>3. Save settings:</strong> Click "Save Settings" to apply the changes. The codes will be automatically injected into your website header.
            </p>
            <p>
              <strong>4. Verify:</strong> Use Facebook Pixel Helper or Google Tag Assistant to verify that the codes are working correctly.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;