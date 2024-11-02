import React from 'react'

import EsewaIcon from "@/../public/icons/esewa-icon.png"
import KhaltiIcon from "@/../public/icons/khalti-icon.png"
import ImePayIcon from "@/../public/icons/imepay-icon.png"
import Logo from "@/../public/logoCircle.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,
} from "@/components/ui/card"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import RefreshTransaction from "@/components/parts/RefreshTransaction"

const page = async ({params}) => {


  const result = await fetch(`${process.env.DOMAIN}/api/dashboard/${params.id}/history`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}, {cache: "no-store"});

const response = await result.json();
console.log(response)


const transactions = response.data.transactions || [];



const statusColor = (status)=>{
  switch (status.toUpperCase()) {
    case "COMPLETE":
      return "bg-green-100"
      break;
  
    case "COMPLETED":
      return "bg-green-100"
      break;

    case "CANCELLED":
      return "bg-red-100"
      break;
    
    default:
      return "bg-gray-100"
      break;
  }
}



  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 xl:px-24">
                <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center border-b mb-4">
              <div className="grid gap-2">
                <CardTitle>History</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>

              <div className="ml-auto ">
                <p className='text-gray-500 font-medium'>{response.data.updatedAt || "---"}</p>
              </div>
            </CardHeader>

            <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-accent">
                  <TableHead>Customer</TableHead>
                  <TableHead>
                    Vendor
                  </TableHead>
                  <TableHead>
                    Status
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Transaction code
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>

                {
                  transactions.length==0?
                  <p className="text-center text-2xl text-gray-600 font-bold mt-16">No transactions</p>
                  :
                  transactions.map((item, index)=>{
                    return(
                      <TableRow key={index} className="hover:bg-accent">
                      <TableCell>
                        <div className="font-medium">{item.mobile}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                        {item.date.substr(0,10)+ " (" + item.date.substr(11,5)+")"}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {
                          item.vendor=="khalti"
                          ?<Image src={KhaltiIcon} alt="rupee api khalti" className="h-5 w-5" />
                          :item.vendor=="esewa"
                          ?<Image src={EsewaIcon} alt="rupee api khalti" className="h-5 w-5" />
                          :item.vendor=="imepay"
                          ?<Image src={ImePayIcon} alt="rupee api khalti" className="h-5 w-5" />
                          :""
                        }
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className={`text-xs ${statusColor(item.status)}`} variant="secondary">
                          {item.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.transactionCode}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {item.totalAmount}
                      </TableCell>
                    </TableRow>
                    )
                  })
                }

              </TableBody>


            </Table>
            </CardContent>
          </Card>
    </main>
  )
}

export default page