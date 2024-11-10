"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


const VendorChart = ({vendorData}) => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Vendor Metrics</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Revenue</CardTitle>
          </CardHeader>
          <CardContent className="px-0 xl:px-2">
            <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--chart-1))" } }} className="h-[200px]">
                <BarChart data={vendorData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="vendor" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="totalRevenue" radius={[0, 4, 4, 0]} fill="var(--color-revenue)" />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Avg Transaction Value</CardTitle>
          </CardHeader>
          <CardContent className="px-0 xl:px-2">
            <ChartContainer config={{ avgTransactionValue: { label: "Avg Transaction Value", color: "hsl(var(--chart-2))" } }} className="h-[200px]">
                <BarChart data={vendorData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="vendor" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avgTransactionValue" radius={[0, 4, 4, 0]} fill="var(--color-avgTransactionValue)" />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Successful Transactions</CardTitle>
          </CardHeader>
          <CardContent className="px-0 xl:px-2">
            <ChartContainer config={{ successfulTransactions: { label: "Successful Transactions", color: "hsl(var(--chart-3))" } }} className="h-[200px]">
                <BarChart data={vendorData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="vendor" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="transactionCount" radius={[0, 4, 4, 0]} fill="var(--color-successfulTransactions)" />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
  )
}

export default VendorChart