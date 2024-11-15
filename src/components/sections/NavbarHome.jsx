
import Logo from "@/../public/logoCircle.png"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { LayoutDashboard, LogIn } from "lucide-react"
import { SignedOut } from "@clerk/nextjs"
import { SignedIn } from "@clerk/nextjs"
   
  export default function NavbarHome() {
    return (
        
     <nav className="relative">

        {/* top navbar  */}
        <div className="px-20 py-4 flex items-center justify-between">
            
            {/* top left  */}
            <div className="flex items-center gap-2">
                <Image src={Logo} className="h-12 w-auto" alt="Rupee API" />
                <h2 className="text-3xl font-semibold">Rupee API</h2>
            </div>

            {/* top right */}
            <div className="flex items-center gap-10 [&>a]:text-sm [&>a]:text-gray-700  hover:[&>a]:underline hover:[&>a]:text-main">
                <Link href="/docs">Docs</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/">Feedback</Link>

            <SignedOut>
                <Link href="/sign-in">
                    <Button variant="outline" className="bg-main text-white hover:bg-purple-700 hover:text-white group duration-100">Log in <LogIn size={18} className="ml-2" /></Button>
                </Link>
            </SignedOut>

            <SignedIn>
                <Link href="/projects">
                    <Button variant="outline" className="bg-main text-white hover:bg-purple-700 hover:text-white group duration-100">Dashboard <LayoutDashboard size={18} className="ml-2" /></Button>
                </Link>
            </SignedIn>
                
            </div>

        </div>


      
     </nav>
    )
  }