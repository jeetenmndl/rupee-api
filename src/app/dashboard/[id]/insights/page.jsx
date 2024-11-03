
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DollarSign, CreditCard, Banknote, HandCoins, Coins, ArrowLeftRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import VendorChart from "@/components/sections/VendorChart"


export default async function UpdatedInsightsDashboard({params}) {


  const result = await fetch(`${process.env.DOMAIN}/api/dashboard/${params.id}/insights`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}, {cache: "no-store"});

const response = await result.json();
console.log(response.data.vendorStats)

const overallData = {
  totalRevenue: response.data.totalProjectRevenue || 0,
  successfulTransactions: response.data.totalTransactionCount || 0,
  averageTransactionValue: response.data.totalProjectRevenue/response.data.totalTransactionCount || 0,
  gatewayCharge: response.data.totalProjectRevenue*3/100 || 0,
  rupeeCharge: response.data.totalProjectRevenue*1/100 || 0,
}

  
  return (
    <div className="container px-2 lg:px-24 py-8 space-y-8">

      {/* Overall Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">रु {overallData.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallData.successfulTransactions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Transaction Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">रु {overallData.averageTransactionValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gateway Charges</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">रु {overallData.gatewayCharge.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rupee API charge</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">रु {overallData.rupeeCharge}</div>
          </CardContent>
        </Card>
      </div>


      <VendorChart vendorData={response.data.vendorStats || []}  />


      {/* Vendor Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Vendor</TableHead>
                <TableHead className="font-semibold">Revenue</TableHead>
                <TableHead className="font-semibold">Avg Transaction Value</TableHead>
                <TableHead className="font-semibold">Successful Transactions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.data.vendorStats.map((vendor) => (
                <TableRow key={vendor.vendor}>
                  <TableCell className="font-medium">{vendor.vendor.toUpperCase()}</TableCell>
                  <TableCell>रु {vendor.totalRevenue.toLocaleString()}</TableCell>
                  <TableCell>रु {vendor.avgTransactionValue}</TableCell>
                  <TableCell>{vendor.transactionCount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </div>
  )
}