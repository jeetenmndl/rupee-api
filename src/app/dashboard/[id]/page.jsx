import Link from "next/link"
import {Activity,ArrowUpRight,CircleUser,CreditCard,DollarSign,Menu,Package2,RefreshCcw,Search,Users,
} from "lucide-react"
import EsewaIcon from "@/../public/icons/esewa-icon.png"
import KhaltiIcon from "@/../public/icons/khalti-icon.png"
import ImePayIcon from "@/../public/icons/imepay-icon.png"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardHeader,CardTitle,
} from "@/components/ui/card"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import getTransactions from "@/lib/actions/getTransactions"

export default async function Dashboard({params}) {

  const result = await fetch(`${process.env.DOMAIN}/api/dashboard/${params.id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}, {cache: "no-store"});

const response = await result.json();

  console.log(response)

  const transactions = response.data[0].recentTransactions;

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
              <DollarSign className="h-4 w-4 text-muted-foreground group-hover:text-main" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          
          <Card x-chunk="dashboard-01-chunk-1"  className="group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-main" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>


          <Card x-chunk="dashboard-01-chunk-2" className="group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-main" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-3" className="group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground group-hover:text-main" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold group-hover:text-main">+573</div>
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
                        {item.date.substr(0,10)+ " " + item.date.substr(11,5)}
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
                        <Badge className="text-xs" variant="secondary">
                          {item.status}
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
          <Card x-chunk="dashboard-01-chunk-5" className="sticky top-4">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
               
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card>
            </div>

        </div>
      </main>
    </div>
  )
}
