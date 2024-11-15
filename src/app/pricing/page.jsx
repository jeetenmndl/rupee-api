import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NavbarHome from "@/components/sections/NavbarHome"

export default function PricingPage() {
  const vendors = [
    { name: "eSewa", charge: "3%" },
    { name: "Khalti", charge: "3%" },
    { name: "My Pay", charge: "3%" },
  ]

  return (
    <>
    <NavbarHome />
    <div className="container mx-auto w-full px-4 lg:w-2/5 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pricing Information</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Transaction Charges</CardTitle>
          <CardDescription>Understand the fees associated with each transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Provider</TableHead>
                <TableHead>Charge per Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.name}>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.charge}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Our Platform</TableCell>
                <TableCell>1% or 0.5%*</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Important Notes:</h2>
        <ul className="list-disc text-sm list-inside space-y-2">
          <li>Vendor charges (eSewa, Khalti, and My Pay) are fixed at 3% per transaction.</li>
          <li>Our platform charge is either 1% or 0.5% of the transaction amount.</li>
          <li>The specific platform charge may vary based on factors such as transaction volume or account type.</li>
        </ul>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        For more information or custom pricing plans, please{" "}
        <a href="/contact" className="text-primary hover:underline">
          contact our sales team
        </a>
        .
      </p>
    </div>
    </>
  )
}