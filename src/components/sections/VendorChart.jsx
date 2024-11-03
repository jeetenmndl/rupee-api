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
                  <YAxis dataKey="vendor" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="totalRevenue" fill="var(--color-revenue)" />
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
                  <YAxis dataKey="vendor" type="category" />
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
                  <YAxis dataKey="vendor" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="transactionCount" fill="var(--color-successfulTransactions)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
  )
}

export default VendorChart