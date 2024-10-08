
import Logo from "@/../public/logoCircle.png"
import Image from "next/image"
import { SignedIn, UserButton, UserProfile } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"
import ProjectNavLinks from "../parts/ProjectNavLinks"
import DashboardNavLinks from "../parts/DashboardNavlinks"
   
  export default function NavbarDashboard() {
    return (
        
     <nav className="relative">

        {/* top navbar  */}
        <div className="px-8 py-4 flex items-center justify-between border-b">
            
            {/* top left  */}
            <div className="flex items-center gap-2">
                <Image src={Logo} className="h-12 w-auto" alt="Rupee API" />
                <h2 className="text-3xl font-bold">Rupee API</h2>

                <div className="flex items-center pl-8 gap-1">
                    <div className="h-5 w-5 rounded-full bg-purple-600"></div>
                    <h3 className="font-medium text-sm">Dashboard</h3>
                </div>

            </div>

            {/* top right */}
            <div className="flex items-center gap-6">
                <Link href="/" className="text-sm text-gray-700">Home</Link>
                <Link href="/" className="text-sm text-gray-700">Docs</Link>
                <Link href="/" className="text-sm text-gray-700">Feedback</Link>

                <SignedIn>
                    <Button variant="outline" size="icon">
                    <UserButton />
                    </Button>
                </SignedIn>
            </div>

        </div>


        <DashboardNavLinks />
      
     </nav>
    )
  }