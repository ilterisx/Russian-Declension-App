"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, Github } from "lucide-react"
import NounDeclensionTable from "@/components/noun-declension-table"
import AdjectiveDeclensionTable from "@/components/adjective-declension-table"
import QuizMode from "@/components/quiz-mode"

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-slate-50">
            Russian Declension Memorization
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            last update: 16/03/2025, contact: <a href="mailto:ilterisch@yandex.ru">ilterisch@yandex.ru</a>
          </p>
        </header>

        <div className="flex items-center justify-center mb-6 gap-2">
          <Button variant={!showQuiz ? "default" : "outline"} onClick={() => setShowQuiz(false)} className="gap-2">
            <BookOpen size={18} />
            Study Mode
          </Button>
          <Button variant={showQuiz ? "default" : "outline"} onClick={() => setShowQuiz(true)} className="gap-2">
            <Brain size={18} />
            Quiz Mode
          </Button>
        </div>

        {!showQuiz ? (
          <Tabs defaultValue="nouns" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="nouns">Noun Endings</TabsTrigger>
              <TabsTrigger value="adjectives">Adjective Endings</TabsTrigger>
            </TabsList>

            <TabsContent value="nouns" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Russian Noun Declension Endings</CardTitle>
                  <CardDescription>Memorize the endings for all 6 cases across different genders</CardDescription>
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
                    Memorize the adjective endings for all 6 cases across different genders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdjectiveDeclensionTable />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Test Your Knowledge</CardTitle>
              <CardDescription>
                Practice identifying the correct endings for Russian nouns and adjectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuizMode />
            </CardContent>
          </Card>
        )}

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

