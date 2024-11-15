
import Logo from "@/../public/logoCircle.png"
import Image from "next/image"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"
   
  export default function NavbarDocs() {
    return (
        
     <nav className="relative">

        {/* top navbar  */}
        <div className="px-6 py-4 flex items-center justify-between border-b">
            
            {/* top left  */}
            <div className="flex items-center gap-2">
            <Link href="/"><Image src={Logo} className="h-12 w-auto" alt="Rupee API" /></Link>
            <Link href="/"><h2 className="text-3xl font-bold">Rupee API</h2></Link>

                <div className="flex items-center pl-8 gap-1">
                    <div className="h-5 w-5 rounded-full bg-purple-600"></div>
                    <h3 className="font-medium text-sm">Documentation</h3>
                </div>

            </div>

            {/* top right */}
            <div className="flex items-center gap-6">
                <Link href="/" className="text-sm text-gray-700">Home</Link>
                <Link href="/docs" className="text-sm text-gray-700">Docs</Link>
                <Link href="/" className="text-sm text-gray-700">Feedback</Link>

                <SignedIn>
                    <Link href="/projects">
                        <Button className="bg-main hover:bg-purple-600">
                            Dashboard
                        </Button>
                    </Link>
                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in">
                        <Button className="bg-main hover:bg-purple-600">
                            Log in
                        </Button>
                    </Link>
                </SignedOut>
            </div>

        </div>
      
     </nav>
    )
  }