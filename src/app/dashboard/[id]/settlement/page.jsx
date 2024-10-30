
import { DollarSign, CreditCard, Building, Wallet, FileText, ArrowRight, Download, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'


export default async function SettlementPage({params}) {

  const result = await fetch(`${process.env.DOMAIN}/api/dashboard/${params.id}/settlement`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}, {cache: "no-store"});

const response = await result.json();
console.log(response)

  const settlementData = {
    totalRevenue: response.data.totalRevenue,
    vendorCharges: response.data.totalRevenue*3/100,
    platformCharges: response.data.totalRevenue*1/100,
    receivableAmount: response.data.totalRevenue*96/100,
    transactionCount: response.data.transactionCount
  }

  const settlementHistory = response.data.settlement;

  const badgeColor = (status)=>{
    switch (status) {
      case "pending":
        return "bg-orange-200"

      case "success":
        return "bg-green-300"

      case "cancelled":
        return "bg-red-300"
          
      default:
        return "bg-gray-200"

    }
  }

  return (
    <main>
    <div className="container  lg:px-24 px-4 py-8">

    <div className="grid gap-6 md:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Current Settlement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Total Revenue</span>
            </div>
            <span className="font-bold">र {settlementData.totalRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Vendor Charges</span>
            </div>
            <span className="font-bold">र {settlementData.vendorCharges.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Platform Charges</span>
            </div>
            <span className="font-bold">र {settlementData.platformCharges.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Total Receivable</span>
            </div>
            <span className="font-bold text-lg">र {settlementData.receivableAmount.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>Number of Transactions</span>
            </div>
            <span className="font-bold">{settlementData.transactionCount.toLocaleString()}</span>
          </div>
          
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Settlement History</CardTitle>
        </CardHeader>
        <CardContent>
          {
            settlementHistory.length==0?
            <p className='text-lg font-semibold mt-8 text-gray-500'>No Recent Settlements</p>
            :
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
              settlementHistory.map((settlement, index) => (
                <TableRow key={index}>
                  <TableCell>{settlement.date}</TableCell>
                  <TableCell><Badge className={badgeColor(settlement.status)+" "+"text-black"}>{settlement.status}</Badge></TableCell>
                  <TableCell className="text-right">र {settlement.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
}
        </CardContent>
      </Card>
    </div>
    <div>
    <p className="text-xs text-gray-700 mt-6 mb-12 text-center">
      Make sure to refresh all the transactions having status &apos;processing&apos; and validate all transactions.
    </p>
  </div>
    <div className="mt-8 md:flex justify-center space-x-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled className="w-full sm:w-auto">
            Initiate Settlement
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Settlement</DialogTitle>
            <DialogDescription>
              Are you sure you want to initiate the settlement process? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" >Cancel</Button>
            <Button>Confirm Settlement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button variant="outline" className="w-full mt-4 md:w-auto md:mt-0">
        Download Report
        <Download className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>

  
  </main>
  )
}