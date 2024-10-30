"use client"

import { RefreshCcw } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import revalidateFunction from '@/lib/actions/revalidateFunction'
import { usePathname } from 'next/navigation'

const RefreshDashboard = () => {
    const pathname = usePathname();

    const refresh = ()=>{
        revalidateFunction(pathname)
    }
  return (
    <Button onClick={refresh} variant="outline" size="sm">
        <RefreshCcw size={18} />
    </Button>
  )
}

export default RefreshDashboard