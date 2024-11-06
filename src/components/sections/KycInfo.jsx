import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, CreditCard, CheckCircle2 } from "lucide-react"
import Logo from "@/../public/logoCircle.png"
import Image from "next/image"


export default function KYCInfoPage({data, image}) {
  return (
    <div className="container mx-auto">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Image src={image} alt={data.name+"Rupee API"} width={40} height={50} className="w-20 h-20 rounded-full" />
            
          <div className="flex-1">
            <CardTitle className="text-2xl">{data.name}</CardTitle>
            <CardDescription>KYC Information</CardDescription>
          </div>
          <Badge className={data.status === "verified" ? "bg-green-600 ml-auto" : "bg-orange-600 ml-auto"}>
            {data.status === "verified" ? (
              <><CheckCircle2 className="w-4 h-4 mr-1" /> Verified</>
            ) : (
              "Pending"
            )}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={data.email} />
            <InfoItem icon={<Phone className="w-4 h-4" />} label="Phone" value={data.phone} />
          </div>
          <Separator />
          <InfoItem icon={<MapPin className="w-4 h-4" />} label="Address" value={data.address} />
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={<CreditCard className="w-4 h-4" />} label="ID Type" value={data.idType} />
            <InfoItem icon={<User className="w-4 h-4" />} label="ID Number" value={data.idNumber} />
          </div>
          <Separator />
          <div className="text-sm text-muted-foreground">
            Submitted on: {data.date.substring(0,10)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoItem({ icon, label, value }){
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}