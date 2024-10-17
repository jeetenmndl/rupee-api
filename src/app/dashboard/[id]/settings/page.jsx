

import { Copy, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import KeysCopy from '@/components/parts/KeysCopy'

export default function EnhancedSettingsPage() {

  const apiKey = 'your-api-key-12345'
  const projectKey = "secret_abcdefghijklmnop"


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">API Key</h2>
          <p className="mb-4">
            Use this API key to authenticate your requests to our service. Keep this key secret and never share it publicly.
          </p>
          <KeysCopy data={apiKey} />
          <p className="text-sm text-muted-foreground mt-2">
            Include this key in the &apos;api-key&apos; header of your API requests.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Project Keys</h2>
          <p className="mb-4">
            These project keys are used to identify and authenticate your specific project. Use them while making project-specific API calls.
          </p>
          <KeysCopy data={projectKey} />
          <p className="text-sm text-muted-foreground mt-2">
            Keep these keys confidential. They are used to authenticate your project-level access.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Rate Limiting</h2>
          <p className="mb-4">
            Your current plan allows for 1000 requests per minute. If you need a higher limit, please contact our support team.
          </p>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Approaching rate limit</AlertTitle>
            <AlertDescription>
              You have used 80% of your rate limit this month. Consider upgrading your plan.
            </AlertDescription>
          </Alert>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><a href="#" className="text-blue-500 hover:underline">API Documentation</a></li>
            <li><a href="#" className="text-blue-500 hover:underline">SDKs and Libraries</a></li>
            <li><a href="#" className="text-blue-500 hover:underline">API Status Page</a></li>
            <li><a href="#" className="text-blue-500 hover:underline">Support Center</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}