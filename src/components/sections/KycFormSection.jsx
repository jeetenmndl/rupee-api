import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import uploadImage from "@/lib/actions/uploadImage"
import postKyc from "@/lib/actions/postKyc"

async function submitKYC(formData) {
  "use server"
  
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    idType: formData.get("idType"),
    idNumber: formData.get("idNumber"),
    idPhoto: formData.get("idPhoto"),
  }

  // console.log(data);

  const response = await uploadImage(formData);
  
  if(response.success){
    const kycResponse = await postKyc(data, response.url);
  }

 
}

export default function KYCForm() {
  return (
    <div className="w-1/2">
      <div className="mb-12">
       <h1 className='text-3xl font-bold '>KYC Form</h1>
       <p className="text-sm text-gray-400">Enter correct information to complete the kyc.</p>
      </div>
        

    
      <form action={submitKYC}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input autoFocus id="fullName" maxLength="30" name="name" placeholder="Ram Bahadur" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="9834567890" required minLength={10} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" maxLength={40} placeholder="Main road, Biratnagar 07, Nepal" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idType">ID Type</Label>
            <Select name="idType" required>
              <SelectTrigger id="idType">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="citizenship">Citizenship</SelectItem>
                <SelectItem value="pan">PAN</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number</Label>
            <Input id="idNumber" name="idNumber" placeholder="Enter your ID number" minLength={3} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idPhoto">ID Photo</Label>
            <Input type="file" accept="image/*" id="idPhoto" name="idPhoto" placeholder="Enter your ID number"  required />
          </div>
            <div className="pt-4">
          <Button type="submit" className="w-full bg-main hover:bg-purple-600">Submit KYC</Button>
          </div>
        </div>
      </form>
      </div>
  )
}