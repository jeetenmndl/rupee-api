'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Esewa from "@/../public/icons/esewa-icon.png"
import Khalti from "@/../public/icons/khalti-icon.png"
import Imepay from "@/../public/icons/imepay-icon.png"


import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

const HomeToast = () => {

    const [open, setOpen] = useState(true)

//     useEffect(() => {
//     setTimeout(() => {
//         document.addEventListener("scroll",()=>{
//             setOpen(false)
//         })
//     }, 2000);
// }, [])



  return (
    <Card className={open?"w-96 fixed bottom-4 left-4":"hidden"}>
      <CardHeader className="text-sm text-gray-600">
        You can now include esewa, khalti, myPay in your website without any set up cost.
      </CardHeader>
      <CardFooter className="flex items-center justify-between py-0 pb-4">
        <div className="flex items-center gap-3">
          <Image src={Esewa} alt='esewa icon Rupee API' className="h-5 w-5" />
          <Image src={Khalti} alt='esewa icon Rupee API' className="h-5 w-5" />
          <Image src={Imepay} alt='esewa icon Rupee API' className="h-5 w-5" />
        </div>
        <div>
          <Button className="rounded-full text-sm w-20 h-8" onClick={()=>{setOpen(false)}}>Got it</Button>
        </div>
      </CardFooter>
     </Card>
  )
}

export default HomeToast