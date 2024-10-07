
import Logo from "@/../public/logoCircle.png"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { LogIn } from "lucide-react"
   
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
                <Link href="/">Docs</Link>
                <Link href="/">Pricing</Link>
                <Link href="/">Feedback</Link>

                <Link href="/">
                    <Button variant="outline" className="bg-main text-white hover:bg-main hover:text-white hover:underline group duration-1000">Log in <LogIn size={18} className="ml-2 hidden group-hover:block duration-1000" /></Button>
                </Link>
            </div>

        </div>


      
     </nav>
    )
  }