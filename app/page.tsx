"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github } from 'lucide-react'
import NounDeclensionTable from "@/components/noun-declension-table"
import AdjectiveDeclensionTable from "@/components/adjective-declension-table"
import PronounDeclensionTable from "@/components/pronoun-declension-table"
import PrepositionTable from "@/components/preposition-table"

export default function Home() {
  const [activeTab, setActiveTab] = useState("nouns")
  const [isMobile, setIsMobile] = useState(false)

  // Check if window width is less than 640px (sm breakpoint)
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const tabOptions = [
    { value: "nouns", label: "Noun Endings" },
    { value: "adjectives", label: "Adjective Endings" },
    { value: "pronouns", label: "Pronouns" },
    { value: "prepositions", label: "Prepositions" }
  ]

  return (
    <main className="min-h-screen bg-background dark:bg-background">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Russian Declensions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            last update: 23/03/2025, contact: <a href="mailto:ilterisch@yandex.ru" className="underline hover:text-primary transition-colors">ilterisch@yandex.ru</a>
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Mobile Select Dropdown */}
          {isMobile && (
            <div className="mb-6">
              <Select value={activeTab} onValueChange={handleTabChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {tabOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Desktop Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {!isMobile && (
              <div className="relative mb-6 overflow-hidden rounded-lg border border-border">
                <TabsList className="w-full h-auto flex bg-card p-1">
                  {tabOptions.map(option => (
                    <TabsTrigger
                      key={option.value}
                      value={option.value}
                      className="flex-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all rounded-md"
                    >
                      {option.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            )}

            <TabsContent value="nouns" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border border-border overflow-hidden">
                <CardHeader className="bg-card border-b border-border">
                  <CardTitle className="text-foreground">Russian Noun Declension Endings</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Reference for endings across all 6 cases and different genders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NounDeclensionTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adjectives" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border border-border overflow-hidden">
                <CardHeader className="bg-card border-b border-border">
                  <CardTitle className="text-foreground">Russian Adjective Declension Endings</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Reference for adjective endings across all 6 cases and different genders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdjectiveDeclensionTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pronouns" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border border-border overflow-hidden">
                <CardHeader className="bg-card border-b border-border">
                  <CardTitle className="text-foreground">Russian Pronouns</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Reference for personal, possessive, demonstrative, interrogative, negative, and reflexive pronouns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PronounDeclensionTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prepositions" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border border-border overflow-hidden">
                <CardHeader className="bg-card border-b border-border">
                  <CardTitle className="text-foreground">Russian Prepositions</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Reference for prepositions and their required grammatical cases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PrepositionTable />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add GitHub link footer */}
        <footer className="mt-12 text-center">
          <a
            href="https://github.com/ilterisx/Russian-Declension-App"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          >
            <Github size={20} />
            <span>Source Code on GitHub</span>
          </a>
        </footer>
      </div>
    </main>
  )
}