"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"
import NounDeclensionTable from "@/components/noun-declension-table"
import AdjectiveDeclensionTable from "@/components/adjective-declension-table"
import PronounDeclensionTable from "@/components/pronoun-declension-table"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-slate-50">
            Russian Declensions 
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            last update: 19/03/2025, contact: <a href="mailto:ilterisch@yandex.ru">ilterisch@yandex.ru</a>
          </p>
        </header>

        <Tabs defaultValue="nouns" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="nouns">Noun Endings</TabsTrigger>
            <TabsTrigger value="adjectives">Adjective Endings</TabsTrigger>
            <TabsTrigger value="pronouns">Pronouns</TabsTrigger>
          </TabsList>

          <TabsContent value="nouns" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Russian Noun Declension Endings</CardTitle>
                <CardDescription>Reference for endings across all 6 cases and different genders</CardDescription>
              </CardHeader>
              <CardContent>
                <NounDeclensionTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adjectives" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Russian Adjective Declension Endings</CardTitle>
                <CardDescription>
                  Reference for adjective endings across all 6 cases and different genders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdjectiveDeclensionTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pronouns" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Russian Pronouns</CardTitle>
                <CardDescription>
                  Reference for personal, possessive, demonstrative, interrogative, negative, and reflexive pronouns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PronounDeclensionTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add GitHub link footer */}
        <footer className="mt-12 text-center">
          <a
            href="https://github.com/ilterisx/Russian-Declension-App"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            <Github size={20} />
            <span>Source Code on GitHub</span>
          </a>
        </footer>
      </div>
    </main>
  )
}

