import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

async function submitKYC(formData) {
  "use server"
  
  const validatedFields = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    idType: formData.get("idType"),
    idNumber: formData.get("idNumber"),
  }

  console.log(validatedFields)

 
}

export default function KYCForm() {
  return (
    <div className="w-1/2">
    
      <form action={submitKYC}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+1234567890" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="123 Main St, City, Country" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idType">ID Type</Label>
            <Select name="idType" required>
              <SelectTrigger id="idType">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivingLicense">Driving License</SelectItem>
                <SelectItem value="nationalId">National ID</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number</Label>
            <Input id="idNumber" name="idNumber" placeholder="Enter your ID number" minLength={3} required />
          </div>
            <div className="pt-4">
          <Button type="submit" className="w-full bg-main hover:bg-purple-600">Submit KYC</Button>
          </div>
        </div>
      </form>
      </div>
  )
}