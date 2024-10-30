"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DollarSign, CreditCard, Banknote, HandCoins, Coins, ArrowLeftRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dummy data
const overallData = {
  totalRevenue: 1234567,
  successfulTransactions: 9876,
  failedTransactions: 234,
  averageTransactionValue: 125,
  completionRate: 97.7,
}

const monthlyGrowthData = [
  { month: "Jan", revenue: 100000, transactions: 800, avgValue: 125 },
  { month: "Feb", revenue: 120000, transactions: 950, avgValue: 126 },
  { month: "Mar", revenue: 90000, transactions: 700, avgValue: 128 },
  { month: "Apr", revenue: 140000, transactions: 1100, avgValue: 127 },
  { month: "May", revenue: 160000, transactions: 1300, avgValue: 123 },
  { month: "Jun", revenue: 180000, transactions: 1500, avgValue: 120 },
]

const vendorData = [
  { name: "Vendor A", revenue: 500000, avgTransactionValue: 100, successfulTransactions: 5000 },
  { name: "Vendor B", revenue: 400000, avgTransactionValue: 80, successfulTransactions: 5000 },
  { name: "Vendor C", revenue: 300000, avgTransactionValue: 150, successfulTransactions: 2000 },
]

export default function UpdatedInsightsDashboard() {
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
            <div className="text-2xl font-bold">${overallData.totalRevenue.toLocaleString()}</div>
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
            <div className="text-2xl font-bold">${overallData.averageTransactionValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gateway Charges</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallData.failedTransactions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rupee API charge</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallData.completionRate}%</div>
          </CardContent>
        </Card>
      </div>


      {/* Vendor Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--chart-1))" } }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendorData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vendor Avg Transaction Value</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ avgTransactionValue: { label: "Avg Transaction Value", color: "hsl(var(--chart-2))" } }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendorData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgTransactionValue" fill="var(--color-avgTransactionValue)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vendor Successful Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ successfulTransactions: { label: "Successful Transactions", color: "hsl(var(--chart-3))" } }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vendorData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="successfulTransactions" fill="var(--color-successfulTransactions)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

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
              {vendorData.map((vendor) => (
                <TableRow key={vendor.name}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>${vendor.revenue.toLocaleString()}</TableCell>
                  <TableCell>${vendor.avgTransactionValue}</TableCell>
                  <TableCell>{vendor.successfulTransactions.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </div>
  )
}