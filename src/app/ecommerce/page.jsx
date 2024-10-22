'use client'

import { useState } from 'react'
import { Star, Truck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import TshirtImage from "@/../public/tshirtImage.jpg"
import getDomain from '@/lib/getEnv/getDomain'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'



export default function ProductPage() {
  const [size, setSize] = useState('m')
  const [color, setColor] = useState('blue')
  const {toast} = useToast();
  const router = useRouter();
  
  
  
  const onEsewaClick= async ()=>{
    const domain = await getDomain();
      console.log(domain)
      const bodyObject= {
        amount: "100",
        successUrl: `${domain}/ecommerce/paymentSuccess`,
        failureUrl: `${domain}/ecommerce/paymentFailed`,
        orderID: "12345",
        projectID: "670509d289f58cc69c8f5441"
      }


    const result = await fetch(`${domain}/api/esewa/proceedPayment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key':'1141f7db-913a-48e3-97b5-fa369d18de2a',
        },
        body: JSON.stringify(bodyObject)
    });

    const response = await result.json();

    console.log(response)
    if(response.success==true){
      router.push(response.redirectUrl);
    }else{
      toast({
        title: "Oops!!",
        description: response.message,
      })
    }
        
  }

const khaltiClick = async ()=>{
  const domain = await getDomain();
  const bodyObject= {
    amount: "100",
    successUrl: `${domain}/ecommerce/paymentSuccess`,
    failureUrl: `${domain}/ecommerce/paymentFailed`,
    orderID: "12345",
    projectID: "670509d289f58cc69c8f5441"
  }

  const result2 = await fetch(`${domain}/api/khalti/proceedPayment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key':'1141f7db-913a-48e3-97b5-fa369d18de2a',
    },
    body: JSON.stringify(bodyObject)
  });

  const response2 = await result2.json();
  if(response2.success){
    router.push(response2.redirectUrl);
  }
  else{
    toast({
      variant: "destructive",
      title: "Oops!.",
      description: response2.message,
    })
  }
}


  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square relative">
          <Image
            src={TshirtImage}
            alt="Product Image"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Stylish T-Shirt</h1>
          <p className="text-gray-600">
            This comfortable and stylish t-shirt is perfect for everyday wear. Made from 100% cotton, its soft, breathable, and durable.This comfortable and stylish t-shirt is perfect for everyday wear. Made from 100% cotton, its soft, breathable, and durable.
          </p>

          {/* Ratings */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4.0) 120 reviews</span>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <RadioGroup value={size} onValueChange={setSize} className="flex space-x-2">
              {['xs', 's', 'm', 'l', 'xl'].map((s) => (
                <div key={s}>
                  <RadioGroupItem value={s} id={`size-${s}`} className="peer sr-only" />
                  <Label
                    htmlFor={`size-${s}`}
                    className="flex items-center justify-center w-10 h-10 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                  >
                    {s.toUpperCase()}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-2">Color</h3>
            <RadioGroup value={color} onValueChange={setColor} className="flex space-x-2">
              {['blue', 'red', 'green', 'yellow'].map((c) => (
                <div key={c}>
                  <RadioGroupItem value={c} id={`color-${c}`} className="peer sr-only" />
                  <Label
                    htmlFor={`color-${c}`}
                    className={`w-8 h-8 cursor-pointer border-2 peer-data-[state=checked]:border-black`}
                    style={{ backgroundColor: c }}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center space-x-2 text-green-600">
            <Truck className="w-5 h-5" />
            <span>Free delivery on orders over $50</span>
          </div>

          {/* Buying Buttons */}
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Buy Now</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Choose Payment Method</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button className="bg-green-500 hover:bg-green-600" onClick={onEsewaClick}>
                    eSewa
                  </Button>
                  <Button className="bg-purple-800 hover:bg-purple-900" onClick={khaltiClick}>
                    Khalti
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    MyPay
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}