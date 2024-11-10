import Image from 'next/image'
import Logo from "@/../public/logoCircle.png"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="relative">
        {/* Spinning effect */}
        <div className="absolute -inset-4 rounded-full animate-spin">
          <div className="h-full w-full rounded-full border-8 border-t-main border-l-main border-r-transparent border-b-transparent"></div>
        </div>
        
        {/* White gap */}
        <div className="absolute -inset-2 bg-white rounded-full"></div>
        
        {/* Logo */}
        <div className="relative h-24 w-24">
          <Image
            src={Logo}
            alt="Rupee Logo"
            className="h-full w-full"
            priority
          />
        </div>
      </div>
    </div>
  )
}