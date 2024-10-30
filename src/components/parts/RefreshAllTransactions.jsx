"use client"

import { RefreshCcw } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import revalidateFunction from '@/lib/actions/revalidateFunction'

const RefreshAllTransactions = () => {
    const pathname = usePathname();
    
    const refresh = ()=>{
        revalidateFunction(pathname);
        console.log("revalidation")
    }

  return (
    <Button onClick={refresh} className="bg-main hover:bg-purple-600" >
    Refresh &nbsp;
    <RefreshCcw size={18} />
    </Button>
  )
}

export default RefreshAllTransactions