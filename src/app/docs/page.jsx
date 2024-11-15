
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Docs() {
  const [activeSection, setActiveSection] = useState(null)
  const [isCopied, setIsCopied] = useState(false)
  const handleScroll = () => {
    const sections = document.querySelectorAll("section")
    let currentActiveSection = null
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentActiveSection = section.id
      }
    })
    setActiveSection(currentActiveSection)
  }
  const handleCopy = (text, sectionId) => {
    navigator.clipboard.writeText(text)
    setIsCopied(sectionId)
    setTimeout(() => setIsCopied(null), 2000)
  }
  const handleLinkClick = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <div className="flex min-h-screen w-full">

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-background px-6 py-8 md:block">
        <nav className="space-y-6">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Getting Started</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("getting-started")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "getting-started"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Introduction
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("installation")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "installation"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("configuration")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "configuration"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Configuration
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Core Concepts</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("authentication")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "authentication"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Authentication
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("authorization")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "authorization"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Authorization
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("profiles")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "profiles"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Profiles
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("sessions")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "sessions"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Sessions
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Advanced Topics</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("integrations")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "integrations"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("customization")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "customization"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Customization
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("security")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "security"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={() => handleLinkClick("troubleshooting")}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    activeSection === "troubleshooting"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  prefetch={false}
                >
                  Troubleshooting
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto bg-background px-6 py-8 md:px-12 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            <section id="getting-started">
              <h1 className="text-4xl font-bold">Getting Started</h1>
              <p className="mt-4 text-muted-foreground">
                Welcome to the Clerk documentation! This guide will help you get started with Clerk and integrate it
                into your application.
              </p>
            </section>
            <section id="installation">
              <h2 className="text-2xl font-bold">Installation</h2>
              <p className="mt-4 text-muted-foreground">
                To get started, you&apos;ll need to install the Clerk SDK. You can do this using your preferred package
                manager:
              </p>
              <div className="mt-4">
                <Tabs defaultValue="npm">
                  <TabsList>
                    <TabsTrigger value="npm">npm</TabsTrigger>
                    <TabsTrigger value="yarn">Yarn</TabsTrigger>
                    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  </TabsList>
                  <TabsContent value="npm">
                    <div className="rounded-md bg-[#1e1e1e] p-4 dark:bg-[#1e1e1e]">
                      <pre className="text-sm text-[#d4d4d4]">
                        <code>npm install @clerk/clerk-react</code>
                      </pre>
                      <div className="mt-2 flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => handleCopy("npm install @clerk/clerk-react", "installation")}
                        >
                          <div className="h-4 w-4" />
                          Copy
                        </Button>
                        {isCopied === "installation" && <span className="ml-2 text-sm text-green-500">Copied!</span>}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="yarn">
                    <div className="rounded-md bg-[#1e1e1e] p-4 dark:bg-[#1e1e1e]">
                      <pre className="text-sm text-[#d4d4d4]">
                        <code>yarn add @clerk/clerk-react</code>
                      </pre>
                      <div className="mt-2 flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => handleCopy("yarn add @clerk/clerk-react", "installation")}
                        >
                          <div className="h-4 w-4" />
                          Copy
                        </Button>
                        {isCopied === "installation" && <span className="ml-2 text-sm text-green-500">Copied!</span>}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="pnpm">
                    <div className="rounded-md bg-[#1e1e1e] p-4 dark:bg-[#1e1e1e]">
                      <pre className="text-sm text-[#d4d4d4]">
                        <code>pnpm add @clerk/clerk-react</code>
                      </pre>
                      <div className="mt-2 flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => handleCopy("pnpm add @clerk/clerk-react", "installation")}
                        >
                          <div className="h-4 w-4" />
                          Copy
                        </Button>
                        {isCopied === "installation" && <span className="ml-2 text-sm text-green-500">Copied!</span>}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>
            <section id="configuration">
              <h2 className="text-2xl font-bold">Configuration</h2>
              <p className="mt-4 text-muted-foreground">
                After installing the Clerk SDK, you&apos;ll need to configure it with your Clerk application details. You
                can do this by adding the following code to your application:
              </p>
              <div className="mt-4">
                <div className="rounded-md bg-[#1e1e1e] p-4 dark:bg-[#1e1e1e]">
                  <pre className="text-sm text-[#d4d4d4]">
                    <code>{`import { ClerkProvider } from '@clerk/clerk-react'

const clerk = Clerk({
  publicKey: 'your_clerk_public_key'
})

function App() {
  return (
    <ClerkProvider client={clerk}>
      {/* Your app content */}
    </ClerkProvider>
  )
}`}</code>
                  </pre>
                  <div className="mt-2 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() =>
                        handleCopy(
                          `
import { ClerkProvider } from '@clerk/clerk-react'

const clerk = Clerk({
  publicKey: 'your_clerk_public_key'
})

function App() {
  return (
    <ClerkProvider client={clerk}>
      {/* Your app content */}
    </ClerkProvider>
  )
}`,
                          "configuration",
                        )
                      }
                    >
                      <div className="h-4 w-4" />
                      Copy
                    </Button>
                    {isCopied === "configuration" && <span className="ml-2 text-sm text-green-500">Copied!</span>}
                  </div>
                </div>
              </div>
            </section>
            <section id="authentication">
              <h2 className="text-2xl font-bold">Authentication</h2>
              <p className="mt-4 text-muted-foreground">
                Clerk provides a set of components and hooks to handle user authentication in your application. Here&apos;s
                an example of how to use the `SignIn` component:
              </p>
              <div className="mt-4">
                <div className="rounded-md bg-[#1e1e1e] p-4 dark:bg-[#1e1e1e]">
                  <pre className="text-sm text-[#d4d4d4]">
                    <code>{`import { SignIn } from '@clerk/clerk-react'

function SignInPage() {
  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  )
}`}</code>
                  </pre>
                  <div className="mt-2 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() =>
                        handleCopy(
                          `
import { SignIn } from '@clerk/clerk-react'

function SignInPage() {
  return (
    <div className="flex justify-center">
      <SignIn />
    </div>
  )
}`,
                          "authentication",
                        )
                      }
                    >
                      <div className="h-4 w-4" />
                      Copy
                    </Button>
                    {isCopied === "authentication" && <span className="ml-2 text-sm text-green-500">Copied!</span>}
                  </div>
                </div>
              </div>
            </section>
            <section id="authorization">
              <h2 />
            </section>
          </div>
        </div>
      </main>

    </div>
  )
}