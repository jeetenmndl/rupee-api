'use client'

import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { revalidatePath } from 'next/cache'
import refreshTransactionFunction from "@/lib/actions/refreshTransactionFunction";
import { usePathname } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export default function RefreshTransaction({ uuid, amount, vendor }) {

  const path = usePathname();

  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true);

    const result = await refreshTransactionFunction(uuid, amount, path, vendor);

    if(result.success){
      toast({
        title:"Congratulations!",
        description: `Transaction update to ${result.data.status}`
      })
      setIsLoading(false);
    }
    else{
      toast({
        title:"Oops!",
        description: result.message
      })
      setIsLoading(false);
    }
    
    
  }

  return (
    <Button 
      onClick={handleRefresh} 
      disabled={isLoading}
      aria-label="Refresh data"
      variant="outline"
      size="icon"
    >
      <RefreshCcw className={`h-4 w-4 ${isLoading? 'animate-spin' : ''}`} />
    </Button>
  )
}