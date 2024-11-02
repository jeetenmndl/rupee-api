"use client"

import React from 'react'
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import startSettlement from '@/lib/actions/startSettlement'
import { toast } from '@/hooks/use-toast'

const SettlementButton = (props) => {

    const initiateSettlement = async ()=>{
        const response = await startSettlement(props.id, props.amount);

        if (response.success){
            toast({
                title: "Notification",
                description: response.message
            })
        }
        else{
            toast({
                title: "Notification",
                description: response.message,
                variant: "destructive"
            })
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto"   >
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
            <Button onClick={initiateSettlement} >Confirm Settlement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default SettlementButton