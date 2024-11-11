
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DollarSign, CreditCard, Banknote, HandCoins, Coins, ArrowLeftRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import VendorChart from "@/components/sections/VendorChart"
import DailyChart from "@/components/sections/DailyChart"
import { currentUser } from "@clerk/nextjs/server"
import DailyChartProject from "@/components/sections/DailyChartProject"


export default async function Insights({params}) {

  const user = await currentUser();
  const userID = user.id;


  const result = await fetch(`${process.env.DOMAIN}/api/projects/insights`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({userID: userID })
});

const response = await result.json();
const insights = response.data[0];


  
  return (
    <main className=" px-2 lg:px-24 py-8 space-y-8">

      {/* Daily Chart */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground group-hover:text-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-main">रु {insights.totalRevenue.toLocaleString() || 0}</div>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground group-hover:text-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-main">{insights.totalTransactionCount.toLocaleString() || 0}</div>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Transaction Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-main">रु {insights.totalRevenue/insights.totalTransactionCount || 0}</div>
          </CardContent>
        </Card>
        <Card className="group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground group-hover:text-main" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-main">रु {response.projects.length || 0}</div>
          </CardContent>
        </Card>

      </div>

    <DailyChartProject chartData={insights.transactionsByDate} />


      {/*Daily transaction value */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Revenue and Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Revenue</TableHead>
                <TableHead className="font-semibold">Successful Transactions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insights.transactionsByDate.map((item) => (
                <TableRow key={item.date}>
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>रु {item.revenue.toLocaleString()}</TableCell>
                  <TableCell>{item.transactions.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </main>
  )
}