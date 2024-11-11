"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import getDailyInsights from "@/lib/actions/getDailyInsights"

// const chartData = [
//   { date: "2024-04-01", revenue: 222, transactions: 150 },
//   { date: "2024-04-02", revenue: 97, transactions: 180 },
//   { date: "2024-04-03", revenue: 167, transactions: 120 },
//   { date: "2024-04-04", revenue: 242, transactions: 260 },
//   { date: "2024-04-05", revenue: 373, transactions: 290 },
//   { date: "2024-04-06", revenue: 301, transactions: 340 },
//   { date: "2024-04-07", revenue: 245, transactions: 180 },
//   { date: "2024-04-08", revenue: 409, transactions: 320 },
//   { date: "2024-04-09", revenue: 59, transactions: 110 },
//   { date: "2024-04-10", revenue: 261, transactions: 190 },
//   { date: "2024-04-11", revenue: 327, transactions: 350 },
//   { date: "2024-04-12", revenue: 292, transactions: 210 },
//   { date: "2024-04-13", revenue: 342, transactions: 380 },
//   { date: "2024-04-14", revenue: 137, transactions: 220 },
//   { date: "2024-04-15", revenue: 120, transactions: 170 },
//   { date: "2024-04-16", revenue: 138, transactions: 190 },
//   { date: "2024-04-17", revenue: 446, transactions: 360 },
//   { date: "2024-04-18", revenue: 364, transactions: 410 },
//   { date: "2024-04-19", revenue: 243, transactions: 180 },
//   { date: "2024-04-20", revenue: 89, transactions: 150 },
//   { date: "2024-04-21", revenue: 137, transactions: 200 },
//   { date: "2024-04-22", revenue: 224, transactions: 170 },
//   { date: "2024-04-23", revenue: 138, transactions: 230 },
//   { date: "2024-04-24", revenue: 387, transactions: 290 },
//   { date: "2024-04-25", revenue: 215, transactions: 250 },
//   { date: "2024-04-26", revenue: 75, transactions: 130 },
//   { date: "2024-04-27", revenue: 383, transactions: 420 },
//   { date: "2024-04-28", revenue: 122, transactions: 180 },
//   { date: "2024-04-29", revenue: 315, transactions: 240 },
//   { date: "2024-04-30", revenue: 454, transactions: 380 },
//   { date: "2024-05-01", revenue: 165, transactions: 220 },
//   { date: "2024-05-02", revenue: 293, transactions: 310 },
//   { date: "2024-05-03", revenue: 247, transactions: 190 },
//   { date: "2024-05-04", revenue: 385, transactions: 420 },
//   { date: "2024-05-05", revenue: 481, transactions: 390 },
//   { date: "2024-05-06", revenue: 498, transactions: 520 },
//   { date: "2024-05-07", revenue: 388, transactions: 300 },
//   { date: "2024-05-08", revenue: 149, transactions: 210 },
//   { date: "2024-05-09", revenue: 227, transactions: 180 },
//   { date: "2024-05-10", revenue: 293, transactions: 330 },
//   { date: "2024-05-11", revenue: 335, transactions: 270 },
//   { date: "2024-05-12", revenue: 197, transactions: 240 },
//   { date: "2024-05-13", revenue: 197, transactions: 160 },
//   { date: "2024-05-14", revenue: 448, transactions: 490 },
//   { date: "2024-05-15", revenue: 473, transactions: 380 },
//   { date: "2024-05-16", revenue: 338, transactions: 400 },
//   { date: "2024-05-17", revenue: 499, transactions: 420 },
//   { date: "2024-05-18", revenue: 315, transactions: 350 },
//   { date: "2024-05-19", revenue: 235, transactions: 180 },
//   { date: "2024-05-20", revenue: 177, transactions: 230 },
//   { date: "2024-05-21", revenue: 82, transactions: 140 },
//   { date: "2024-05-22", revenue: 81, transactions: 120 },
//   { date: "2024-05-23", revenue: 252, transactions: 290 },
//   { date: "2024-05-24", revenue: 294, transactions: 220 },
//   { date: "2024-05-25", revenue: 201, transactions: 250 },
//   { date: "2024-05-26", revenue: 213, transactions: 170 },
//   { date: "2024-05-27", revenue: 420, transactions: 460 },
//   { date: "2024-05-28", revenue: 233, transactions: 190 },
//   { date: "2024-05-29", revenue: 78, transactions: 130 },
//   { date: "2024-05-30", revenue: 340, transactions: 280 },
//   { date: "2024-05-31", revenue: 178, transactions: 230 },
//   { date: "2024-06-01", revenue: 178, transactions: 200 },
//   { date: "2024-06-02", revenue: 470, transactions: 410 },
//   { date: "2024-06-03", revenue: 103, transactions: 160 },
//   { date: "2024-06-04", revenue: 439, transactions: 380 },
//   { date: "2024-06-05", revenue: 88, transactions: 140 },
//   { date: "2024-06-06", revenue: 294, transactions: 250 },
//   { date: "2024-06-07", revenue: 323, transactions: 370 },
//   { date: "2024-06-08", revenue: 385, transactions: 320 },
//   { date: "2024-06-09", revenue: 438, transactions: 480 },
//   { date: "2024-06-10", revenue: 155, transactions: 200 },
//   { date: "2024-06-11", revenue: 92, transactions: 150 },
//   { date: "2024-06-12", revenue: 492, transactions: 420 },
//   { date: "2024-06-13", revenue: 81, transactions: 130 },
//   { date: "2024-06-14", revenue: 426, transactions: 380 },
//   { date: "2024-06-15", revenue: 307, transactions: 350 },
//   { date: "2024-06-16", revenue: 371, transactions: 310 },
//   { date: "2024-06-17", revenue: 475, transactions: 520 },
//   { date: "2024-06-18", revenue: 107, transactions: 170 },
//   { date: "2024-06-19", revenue: 341, transactions: 290 },
//   { date: "2024-06-20", revenue: 408, transactions: 450 },
//   { date: "2024-06-21", revenue: 169, transactions: 210 },
//   { date: "2024-06-22", revenue: 317, transactions: 270 },
//   { date: "2024-06-23", revenue: 480, transactions: 530 },
//   { date: "2024-06-24", revenue: 132, transactions: 180 },
//   { date: "2024-06-25", revenue: 141, transactions: 190 },
//   { date: "2024-06-26", revenue: 434, transactions: 380 },
//   { date: "2024-06-27", revenue: 448, transactions: 490 },
//   { date: "2024-06-28", revenue: 149, transactions: 200 },
//   { date: "2024-06-29", revenue: 103, transactions: 160 },
//   { date: "2024-06-30", revenue: 446, transactions: 400 },
// ]

const chartConfig = {
  views: {
    label: " ",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  transactions: {
    label: "Transactions",
    color: "hsl(var(--chart-2))",
  },
}

export default function DailyChart({projectID}) {

  const [activeChart, setActiveChart] =
    React.useState("revenue")


  const [chartData, setChartData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDailyInsights(projectID);
        if (!response.success) throw new Error("Failed to fetch data");
        setChartData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line
  }, []);

  const total = React.useMemo(
    () => ({
      revenue: chartData?.reduce((acc, curr) => acc + curr.revenue, 0),
      transactions: chartData?.reduce((acc, curr) => acc + curr.transactions, 0),
    }),
    [chartData]
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Daily insights</CardTitle>
          <CardDescription>
            Showing total revenue and transactions each day.
          </CardDescription>
        </div>
        <div className="flex">
          {["revenue", "transactions"].map((key) => {
            const chart = key; 
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-gray-100  data-[active=true]:border-main
                data-[active=true]:border-b-2  sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`}  />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
