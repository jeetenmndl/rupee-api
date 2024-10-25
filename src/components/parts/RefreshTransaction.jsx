'use client'

import { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { revalidatePath } from 'next/cache'

export default function RefreshTransaction({ id, path }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const apiUrl = `${process.env.DOMAIN}/api/transactions${id}`
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      startTransition(() => {
        revalidatePath(path)
      })
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleRefresh} 
      disabled={isLoading || isPending}
      aria-label="Refresh data"
      size="icon"
    >
      <RefreshCcw className={`h-4 w-4 ${isLoading || isPending ? 'animate-spin' : ''}`} />
    </Button>
  )
}