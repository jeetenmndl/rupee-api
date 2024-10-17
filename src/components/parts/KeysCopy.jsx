'use client'

import { useState } from 'react'
import { Copy, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


const KeysCopy = (props) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = async (text, setCopied) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
      }
  return (


    <>    
        <Card className="relative rounded-lg bg-gray-800">
        <CardContent className="p-4 font-mono text-white">
            <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:text-gray-300"
            onClick={() => copyToClipboard(props.data, setCopied)}
            >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy key</span>
            </Button>
            <pre>{props.data}</pre>
        </CardContent>
        </Card>

        {copied && <p className="text-sm text-green-600 mt-2">Copied to clipboard!</p>}
    </>
  )
}

export default KeysCopy