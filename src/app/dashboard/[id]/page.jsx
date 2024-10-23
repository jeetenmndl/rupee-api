import Link from "next/link"
import {Activity,ArrowUpRight,Building,CircleUser,CreditCard,DollarSign,FileText,Menu,Package2,RefreshCcw,Search,Users, Wallet,
} from "lucide-react"
import EsewaIcon from "@/../public/icons/esewa-icon.png"
import KhaltiIcon from "@/../public/icons/khalti-icon.png"
import ImePayIcon from "@/../public/icons/imepay-icon.png"
import Logo from "@/../public/logoCircle.png"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,
} from "@/components/ui/card"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import getTransactions from "@/lib/actions/getTransactions"
import { Separator } from "@/components/ui/separator"

export default async function Dashboard({params}) {

  const result = await fetch(`${process.env.DOMAIN}/api/dashboard/${params.id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}, {cache: "no-store"});

const response = await result.json();

const transactions = response.data[0].recentTransactions;

const vendors = response.data[0].vendorTotals;

let totalRevenue=0;
vendors.forEach(item => {
  totalRevenue= totalRevenue+item.totalVendorAmount;
  
});

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
    <div className="flex min-h-screen w-full flex-col">

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 xl:px-24">

        {/* top 4 cards  */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">


          <Card x-chunk="dashboard-01-chunk-0" className="group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <Image src={Logo} alt="rupee api" className="h-6 w-6" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">र {totalRevenue}
                </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          
          <Card x-chunk="dashboard-01-chunk-1"  className="group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Esewa
              </CardTitle>
              <Image src={EsewaIcon} alt="rupee api esewa" className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">रु  {vendors[0]?vendors[0]?.totalVendorAmount:"0"}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>


          <Card x-chunk="dashboard-01-chunk-2" className="group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">Khalti</CardTitle>
              <Image src={KhaltiIcon} alt="rupee api khalti" className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">रु {vendors[1]?vendors[1]?.totalVendorAmount:"0"}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-3" className="group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Pay</CardTitle>
              <Image src={ImePayIcon} alt="rupee api ime pay" className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">रु {vendors[2]?vendors[2]?.totalVendorAmount:"0"}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>

        </div>


        {/* bottom section  */}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">

          {/* transactions card table */}
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>

              <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCcw size={18} />
              </Button>
              <Button asChild size="sm" className=" gap-1 bg-main hover:bg-purple-800">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              </div>
            </CardHeader>
            <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-accent">
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Vendor
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
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
                  transactions.map((item)=>{
                    return(
                      <TableRow key={item._id} className="hover:bg-accent">
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



          <div className="relative">
          <Card className="w-full max-w-2xl mx-auto sticky top-4">
        <CardHeader>
          <CardTitle className="text-2xl">Settlement Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Total Revenue</span>
            </div>
            <span className="font-bold">${totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Vendor Charges</span>
            </div>
            <span className="font-bold">${(3/100)*totalRevenue}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Platform Charges</span>
            </div>
            <span className="font-bold">${(1/100)*totalRevenue}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Total Receivable</span>
            </div>
            <span className="font-bold text-lg">${(96/100)*totalRevenue}</span>
          </div>
          <Separator />
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Number of Transactions</span>
            </div>
            <span className="font-bold">{}</span>
          </div> */}
        </CardContent>
        <CardFooter>
          <Link href={"/dashboard/"+params.id+"/settlement"} className="w-full"><Button className="w-full bg-main hover:bg-purple-500">Withdraw</Button></Link>
        </CardFooter>
      </Card>
            </div>

        </div>
      </main>
    </div>
  )
}
