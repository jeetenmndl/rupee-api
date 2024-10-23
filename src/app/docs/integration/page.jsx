'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyIcon, CheckIcon } from 'lucide-react'
import Logo from "@/../public/logoCircle.png"
import Image from 'next/image'

export default function ApiDocs() {
  const [copiedTab, setCopiedTab] = useState(null)

  const copyToClipboard = (text, tab) => {
    navigator.clipboard.writeText(text)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Platform API Documentation</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">API Overview</h2>
          <p className="mb-4">
            Welcome to the Platform API documentation. Our API allows you to integrate our powerful features directly into your applications, enabling you to manage resources, retrieve data, and perform actions programmatically.
          </p>
          <p className="mb-4">
            Our RESTful API uses standard HTTP methods and returns responses in JSON format. Authentication is required for all API endpoints and is done using API keys.
          </p>
          <h3 className="text-xl font-semibold mb-2">API Workflow</h3>
          <div className="bg-muted p-4 rounded-md">
            <Image src={Logo} alt="API Workflow Diagram" className="mx-auto" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Create User API</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>1. Request API Path</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="bg-muted text-muted-foreground px-2 py-1 rounded">POST /api/v1/users</code>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>2. Request Body and Headers</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Headers</h4>
              <pre className="bg-muted text-muted-foreground p-2 rounded mb-4">
                Content-Type: application/json
                Authorization: Bearer YOUR_API_KEY
              </pre>

              <h4 className="font-semibold mb-2">Request Body</h4>
              <pre className="bg-muted text-muted-foreground p-2 rounded mb-4">
{`{
  "username": "johndoe",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securePassword123",
  "role": "user"
}`}
              </pre>

              <h4 className="font-semibold mb-2">Field Descriptions</h4>
              <ul className="list-disc pl-6">
                <li><strong>username</strong> (string, required): The unique username for the new user.</li>
                <li><strong>email</strong> (string, required): The email address of the user.</li>
                <li><strong>firstName</strong> (string, required): The user&apos;s first name.</li>
                <li><strong>lastName</strong> (string, required): The user&apos;s last name.</li>
                <li><strong>password</strong> (string, required): The user&apos;s password. Must be at least 8 characters long.</li>
                <li><strong>role</strong> (string, optional): The user&apos;s role. Defaults to &apos;user&apos; if not specified.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>3. Response Example</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Successful Response (Status Code: 201 Created)</h4>
              <pre className="bg-muted text-muted-foreground p-2 rounded mb-4">
{`{
  "id": "usr_123456789",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "createdAt": "2023-04-22T10:30:00Z"
}`}
              </pre>

              <h4 className="font-semibold mb-2">Error Response (Status Code: 400 Bad Request)</h4>
              <pre className="bg-muted text-muted-foreground p-2 rounded">
{`{
  "error": "Bad Request",
  "message": "Username already exists",
  "details": {
    "field": "username",
    "issue": "must be unique"
  }
}`}
              </pre>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">API Request Examples</h2>
          <Tabs defaultValue="python">
            <TabsList className="mb-4">
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            <TabsContent value="python">
              <Card>
                <CardHeader>
                  <CardTitle>Python Example</CardTitle>
                  <CardDescription>Using the requests library</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted text-muted-foreground p-4 rounded relative">
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`import requests

api_url = "https://api.example.com/api/v1/users"
api_key = "YOUR_API_KEY"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

data = {
    "username": "johndoe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "securePassword123",
    "role": "user"
}

response = requests.post(api_url, json=data, headers=headers)

if response.status_code == 201:
    print("User created successfully:")
    print(response.json())
else:
    print("Error creating user:")
    print(response.json())`, 'python')}
                    >
                      {copiedTab === 'python' ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    </Button>
{`import requests

api_url = "https://api.example.com/api/v1/users"
api_key = "YOUR_API_KEY"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

data = {
    "username": "johndoe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "securePassword123",
    "role": "user"
}

response = requests.post(api_url, json=data, headers=headers)

if response.status_code == 201:
    print("User created successfully:")
    print(response.json())
else:
    print("Error creating user:")
    print(response.json())`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="javascript">
              <Card>
                <CardHeader>
                  <CardTitle>JavaScript Example</CardTitle>
                  <CardDescription>Using the Fetch API</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted text-muted-foreground p-4 rounded relative">
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`const apiUrl = 'https://api.example.com/api/v1/users';
const apiKey = 'YOUR_API_KEY';

const data = {
  username: 'johndoe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'securePassword123',
  role: 'user'
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    if (response.ok) {
      console.log('User created successfully:', result);
    } else {
      console.error('Error creating user:', result);
    }
  })
  .catch(error => console.error('Error:', error));`, 'javascript')}
                    >
                      {copiedTab === 'javascript' ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    </Button>
{`const apiUrl = 'https://api.example.com/api/v1/users';
const apiKey = 'YOUR_API_KEY';

const data = {
  username: 'johndoe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  password: 'securePassword123',
  role: 'user'
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    if (response.ok) {
      console.log('User created successfully:', result);
    } else {
      console.error('Error creating user:', result);
    }
  })
  .catch(error => console.error('Error:', error));`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="curl">
              <Card>
                <CardHeader>
                  <CardTitle>cURL Example</CardTitle>
                  <CardDescription>Command-line request</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted text-muted-foreground p-4 rounded relative">
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`curl -X POST https://api.example.com/api/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "username": "johndoe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "securePassword123",
    "role": "user"
  }'`, 'curl')}
                    >
                      {copiedTab === 'curl' ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    </Button>
{`curl -X POST https://api.example.com/api/v1/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "username": "johndoe",
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "securePassword123",
    "role": "user"
  }'`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Platform API. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}