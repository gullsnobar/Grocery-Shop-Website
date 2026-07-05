import { TruckIcon, ZapIcon, XIcon } from "lucide-react"
import { useState } from "react"

const Banner = () => {

    const [bannerVisible, setBannerVisible] = useState(() =>{
        return sessionStorage.getItem('banner_dismissed') !== 'true'
    })

    const dismissBanner = () => {
        sessionStorage.setItem('banner_dismissed', 'true')
        setBannerVisible(false)
    }

  return (
    <div>
        {bannerVisible && (
            <div className="bg-linear-to-r from-app-green via-emerald to-app-green/80 text-white text-xs sm:text-sm relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex-center gap-6">
                <div>
                    <TruckIcon className="size-4 shrink-0"/>
                    <span>Free delivery on orders above 30$</span>
                </div>
            <span className="hidden sm:inline text-white/40"></span>
            <div className="hidden sm:flex items-center gap-2">
                <ZapIcon className="size-3.5 fill-yellow-400 shrink-0"/>
                <span>Fast and reliable shipping</span>
            </div>
              </div>
              <button
                onClick={dismissBanner}
                aria-label="Dismiss banner"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
              >
                <XIcon className="size-3.5"/>
              </button>
            </div>
        )}
    </div>
  )
}

export default Banner;