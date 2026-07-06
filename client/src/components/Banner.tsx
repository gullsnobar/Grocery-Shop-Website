import { TruckIcon, ZapIcon, XIcon } from "lucide-react";
import { useState } from "react";

const Banner = () => {
  const [bannerVisible, setBannerVisible] = useState(() => {
    return sessionStorage.getItem("banner_dismissed") !== "true";
  });

  const dismissBanner = () => {
    sessionStorage.setItem("banner_dismissed", "true");
    setBannerVisible(false);
  };

  return (
    <>
      {bannerVisible && (
        <div className="relative overflow-hidden bg-linear-to-r from-app-green via-emerald to-app-green/80 text-white text-xs sm:text-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 sm:px-6 lg:px-8">
            {/* Free Delivery */}
            <div className="flex items-center gap-2">
              <TruckIcon className="size-4 shrink-0" />
              <span>Free delivery on orders above $30</span>
            </div>

            {/* Divider */}
            <span className="hidden text-white/40 sm:inline">|</span>

            {/* Fast Shipping */}
            <div className="hidden items-center gap-2 sm:flex">
              <ZapIcon className="size-3.5 shrink-0 fill-yellow-400" />
              <span>Fast and reliable shipping</span>
            </div>
          </div>

          <button
            onClick={dismissBanner}
            aria-label="Dismiss banner"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-white/10"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      )}
    </>
  );
};

export default Banner;