"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"


const DashboardNavLinks = () => {

    const pathname = usePathname();
    const url = pathname.split("/");
    const projectName = url[2];
    // console.log(pathname, url[2]);
    

    const navLinks= [
        {name: "Dashboard", href: `/dashboard/${projectName}`},
        {name: "Transactions", href: `/dashboard/${projectName}/transactions`},
        {name: "Insights", href: `/dashboard/${projectName}/insights`},
        {name: "KYC", href: `/dashboard/${projectName}/kyc`},
        {name: "Settings", href: `/dashboard/${projectName}/settings`},
        {name: "Settlement", href: `/dashboard/${projectName}/settlement`},
    ]
    

  return (
    <div className=" px-8 border-b ">
        <div className="flex gap-1 items-center">
            {
                navLinks.map((link)=>{

                    const isActive = pathname == link.href;

                    return(
                        <Link href={link.href} key={link.href} className={isActive?"border-b-2 border-purple-600 py-2":"py-2"}>
                            <Button className="h-8 hover:bg-slate-100 size-sm" variant="ghost">{link.name}</Button>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default DashboardNavLinks