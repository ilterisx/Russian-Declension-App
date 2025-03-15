"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, X, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  category: "noun" | "adjective"
  case: string
  gender?: string
  number: "singular" | "plural"
}

// Replace the existing quizQuestions array with this expanded version that includes 30 questions total

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the ending for masculine singular nouns in the nominative case?",
    options: ["-а", "-∅, -й, -ь", "-у", "-ы"],
    correctAnswer: "-∅, -й, -ь",
    explanation:
      "Masculine singular nouns in the nominative case typically have no ending (zero ending), or end with -й or -ь.",
    category: "noun",
    case: "nominative",
    gender: "masculine",
    number: "singular",
  },
  {
    id: 2,
    question: "What is the ending for feminine singular nouns in the genitive case?",
    options: ["-ы, -и", "-у, -ю", "-ой, -ей", "-е"],
    correctAnswer: "-ы, -и",
    explanation: "Feminine singular nouns in the genitive case typically end with -ы or -и.",
    category: "noun",
    case: "genitive",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 3,
    question: "What is the ending for neuter singular nouns in the accusative case?",
    options: ["-а, -я", "-о, -е", "-ом, -ем", "-у, -ю"],
    correctAnswer: "-о, -е",
    explanation: "Neuter singular nouns in the accusative case typically end with -о or -е (same as nominative).",
    category: "noun",
    case: "accusative",
    gender: "neuter",
    number: "singular",
  },
  {
    id: 4,
    question: "What is the ending for masculine adjectives in the singular nominative case?",
    options: ["-ая, -яя", "-ый, -ий, -ой", "-ое, -ее", "-ые, -ие"],
    correctAnswer: "-ый, -ий, -ой",
    explanation: "Masculine adjectives in the singular nominative case typically end with -ый, -ий, or -ой.",
    category: "adjective",
    case: "nominative",
    gender: "masculine",
    number: "singular",
  },
  {
    id: 5,
    question: "What is the ending for feminine adjectives in the singular instrumental case?",
    options: ["-ой, -ей", "-ую, -юю", "-ая, -яя", "-ыми, -ими"],
    correctAnswer: "-ой, -ей",
    explanation: "Feminine adjectives in the singular instrumental case typically end with -ой or -ей.",
    category: "adjective",
    case: "instrumental",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 6,
    question: "What is the ending for plural nouns in the dative case (all genders)?",
    options: ["-ов, -ев, -ей", "-ам, -ям", "-ы, -и", "-ах, -ях"],
    correctAnswer: "-ам, -ям",
    explanation: "Plural nouns in the dative case (all genders) typically end with -ам or -ям.",
    category: "noun",
    case: "dative",
    number: "plural",
  },
  {
    id: 7,
    question: "What is the ending for plural adjectives in the genitive case (all genders)?",
    options: ["-ые, -ие", "-ых, -их", "-ым, -им", "-ыми, -ими"],
    correctAnswer: "-ых, -их",
    explanation: "Plural adjectives in the genitive case (all genders) typically end with -ых or -их.",
    category: "adjective",
    case: "genitive",
    number: "plural",
  },
  {
    id: 8,
    question: "What is the ending for neuter singular nouns in the prepositional case?",
    options: ["-е, -и", "-а, -я", "-о, -е", "-ом, -ем"],
    correctAnswer: "-е, -и",
    explanation: "Neuter singular nouns in the prepositional case typically end with -е or -и.",
    category: "noun",
    case: "prepositional",
    gender: "neuter",
    number: "singular",
  },
  {
    id: 9,
    question: "What is the ending for masculine singular nouns in the instrumental case?",
    options: ["-ом, -ем, -ём", "-а, -я", "-у, -ю", "-е, -и"],
    correctAnswer: "-ом, -ем, -ём",
    explanation: "Masculine singular nouns in the instrumental case typically end with -ом, -ем, or -ём.",
    category: "noun",
    case: "instrumental",
    gender: "masculine",
    number: "singular",
  },
  {
    id: 10,
    question: "What is the ending for feminine singular adjectives in the accusative case?",
    options: ["-ую, -юю", "-ая, -яя", "-ой, -ей", "-ые, -ие"],
    correctAnswer: "-ую, -юю",
    explanation: "Feminine singular adjectives in the accusative case typically end with -ую or -юю.",
    category: "adjective",
    case: "accusative",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 11,
    question: "What is the ending for feminine singular nouns in the nominative case?",
    options: ["-а, -я, -ь", "-ы, -и", "-у, -ю", "-ой, -ей"],
    correctAnswer: "-а, -я, -ь",
    explanation: "Feminine singular nouns in the nominative case typically end with -а, -я, or -ь.",
    category: "noun",
    case: "nominative",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 12,
    question: "What is the ending for neuter singular nouns in the nominative case?",
    options: ["-о, -е", "-а, -я", "-у, -ю", "-ом, -ем"],
    correctAnswer: "-о, -е",
    explanation: "Neuter singular nouns in the nominative case typically end with -о or -е.",
    category: "noun",
    case: "nominative",
    gender: "neuter",
    number: "singular",
  },
  {
    id: 13,
    question: "What is the ending for masculine singular nouns in the genitive case?",
    options: ["-а, -я", "-у, -ю", "-ом, -ем", "-е, -и"],
    correctAnswer: "-а, -я",
    explanation: "Masculine singular nouns in the genitive case typically end with -а or -я.",
    category: "noun",
    case: "genitive",
    gender: "masculine",
    number: "singular",
  },
  {
    id: 14,
    question: "What is the ending for masculine singular nouns in the dative case?",
    options: ["-у, -ю", "-а, -я", "-ом, -ем", "-е, -и"],
    correctAnswer: "-у, -ю",
    explanation: "Masculine singular nouns in the dative case typically end with -у or -ю.",
    category: "noun",
    case: "dative",
    gender: "masculine",
    number: "singular",
  },
  {
    id: 15,
    question: "What is the ending for feminine singular nouns in the dative case?",
    options: ["-е, -и", "-у, -ю", "-ой, -ей", "-ы, -и"],
    correctAnswer: "-е, -и",
    explanation: "Feminine singular nouns in the dative case typically end with -е or -и.",
    category: "noun",
    case: "dative",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 16,
    question: "What is the ending for feminine singular nouns in the accusative case?",
    options: ["-у, -ю, -ь", "-а, -я", "-ы, -и", "-ой, -ей"],
    correctAnswer: "-у, -ю, -ь",
    explanation:
      "Feminine singular nouns in the accusative case typically end with -у, -ю, or -ь (for soft-sign ending nouns).",
    category: "noun",
    case: "accusative",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 17,
    question: "What is the ending for feminine singular nouns in the instrumental case?",
    options: ["-ой, -ей, -ёй, -ью", "-у, -ю", "-ы, -и", "-е, -и"],
    correctAnswer: "-ой, -ей, -ёй, -ью",
    explanation:
      "Feminine singular nouns in the instrumental case typically end with -ой, -ей, -ёй, or -ью (for soft-sign ending nouns).",
    category: "noun",
    case: "instrumental",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 18,
    question: "What is the ending for feminine singular nouns in the prepositional case?",
    options: ["-е, -и", "-у, -ю", "-ой, -ей", "-ы, -и"],
    correctAnswer: "-е, -и",
    explanation: "Feminine singular nouns in the prepositional case typically end with -е or -и.",
    category: "noun",
    case: "prepositional",
    gender: "feminine",
    number: "singular",
  },
  {
    id: 19,
    question: "What is the ending for neuter singular nouns in the genitive case?",
    options: ["-а, -я", "-о, -е", "-у, -ю", "-ом, -ем"],
    correctAnswer: "-а, -я",
    explanation: "Neuter singular nouns in the genitive case typically end with -а or -я.",
    category: "noun",
    case: "genitive",
    gender: "neuter",
    number: "singular",
  },
  {
    id: 20,
    question: "What is the ending for neuter singular nouns in the dative case?",
    options: ["-у, -ю", "-а, -я", "-о, -е", "-ом, -ем"],
    correctAnswer: "-у, -ю",
    explanation: "Neuter singular nouns in the dative case typically end with -у or -ю.",
    category: "noun",
    case: "dative",
    gender: "neuter",
    number: "singular",
  },
  {
    id: 21,
    question: "What is the ending for neuter singular nouns in the instrumental case?",
    options: ["-ом, -ем", "-а, -я", "-о, -е", "-у, -ю"],
    correctAnswer: "-ом, -ем",
    explanation: "Neuter singular nouns in the instrumental case typically end with -ом or -ем.",
    category: "noun",
    case: "instrumental",
    gender: "neuter",
    number: "singular",
  },
  {
    id: 22,
    question: "What is the ending for masculine plural nouns in the nominative case?",
    options: ["-ы, -и", "-ов, -ев, -ей", "-ам, -ям", "-ах, -ях"],
    correctAnswer: "-ы, -и",
    explanation: "Masculine plural nouns in the nominative case typically end with -ы or -и.",
    category: "noun",
    case: "nominative",
    gender: "masculine",
    number: "plural",
  },
  {
    id: 23,
    question: "What is the ending for masculine plural nouns in the genitive case?",
    options: ["-ов, -ев, -ёв, -ей, -∅", "-ы, -и", "-ам, -ям", "-ах, -ях"],
    correctAnswer: "-ов, -ев, -ёв, -ей, -∅",
    explanation:
      "Masculine plural nouns in the genitive case typically end with -ов, -ев, -ёв, -ей, or have no ending (zero ending).",
    category: "noun",
    case: "genitive",
    gender: "masculine",
    number: "plural",
  },
  {
    id: 24,
    question: "What is the ending for neuter plural nouns in the nominative case?",
    options: ["-а, -я", "-ы, -и", "-ов, -ев, -ей", "-ам, -ям"],
    correctAnswer: "-а, -я",
    explanation: "Neuter plural nouns in the nominative case typically end with -а or -я.",
    category: "noun",
    case: "nominative",
    gender: "neuter",
    number: "plural",
  },
  {
    id: 25,
    question: "What is the ending for plural nouns in the instrumental case (all genders)?",
    options: ["-ами, -ями", "-ов, -ев, -ей", "-ам, -ям", "-ах, -ях"],
    correctAnswer: "-ами, -ями",
    explanation: "Plural nouns in the instrumental case (all genders) typically end with -ами or -ями.",
    category: "noun",
    case: "instrumental",
    number: "plural",
  },
  {
    id: 26,
    question: "What is the ending for plural nouns in the prepositional case (all genders)?",
    options: ["-ах, -ях", "-ами, -ями", "-ов, -ев, -ей", "-ам, -ям"],
    correctAnswer: "-ах, -ях",
    explanation: "Plural nouns in the prepositional case (all genders) typically end with -ах or -ях.",
    category: "noun",
    case: "prepositional",
    number: "plural",
  },
  {
    id: 27,
    question: "What is the ending for neuter singular adjectives in the nominative case?",
    options: ["-ое, -ее", "-ый, -ий, -ой", "-ая, -яя", "-ые, -ие"],
    correctAnswer: "-ое, -ее",
    explanation: "Neuter singular adjectives in the nominative case typically end with -ое or -ее.",
    category: "adjective",
    case: "nominative",
    gender: "neuter",
    number: "singular",
  },
  {
    id: 28,
    question: "What is the ending for masculine singular adjectives in the genitive case?",
    options: ["-ого, -его", "-ому, -ему", "-ым, -им", "-ом, -ем"],
    correctAnswer: "-ого, -его",
    explanation: "Masculine singular adjectives in the genitive case typically end with -ого or -его.",
    category: "adjective",
    case: "genitive",
    gender: "masculine",
    number: "singular",
  },
  {
    id: 29,
    question: "What is the ending for masculine singular adjectives in the dative case?",
    options: ["-ому, -ему", "-ого, -его", "-ым, -им", "-ом, -ем"],
    correctAnswer: "-ому, -ему",
    explanation: "Masculine singular adjectives in the dative case typically end with -ому or -ему.",
    category: "adjective",
    case: "dative",
    gender: "masculine",
    number: "singular",
  },
  {
    id: 30,
    question: "What is the ending for plural adjectives in the instrumental case (all genders)?",
    options: ["-ыми, -ими", "-ые, -ие", "-ых, -их", "-ым, -им"],
    correctAnswer: "-ыми, -ими",
    explanation: "Plural adjectives in the instrumental case (all genders) typically end with -ыми or -ими.",
    category: "adjective",
    case: "instrumental",
    number: "plural",
  },
]

export default function QuizMode() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([])

  // Shuffle questions on component mount
  useEffect(() => {
    setShuffledQuestions([...quizQuestions].sort(() => Math.random() - 0.5))
  }, [])

  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer && !isAnswered) {
      setIsAnswered(true)
      if (selectedAnswer === currentQuestion?.correctAnswer) {
        setScore(score + 1)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      // Quiz completed
      resetQuiz()
    }
  }

  const resetQuiz = () => {
    setShuffledQuestions([...quizQuestions].sort(() => Math.random() - 0.5))
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
  }

  if (!currentQuestion) {
    return <div className="text-center py-8">Loading questions...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
          </span>
          <Progress value={((currentQuestionIndex + 1) / shuffledQuestions.length) * 100} className="h-2 mt-2" />
        </div>
        <div className="text-sm font-medium">
          Score: {score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

          <RadioGroup value={selectedAnswer || ""} className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={option}
                  disabled={isAnswered}
                  onClick={() => handleAnswerSelect(option)}
                  className={
                    isAnswered && option === currentQuestion.correctAnswer
                      ? "border-green-500 text-green-500"
                      : isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer
                        ? "border-red-500 text-red-500"
                        : ""
                  }
                />
                <Label
                  htmlFor={option}
                  className={
                    isAnswered && option === currentQuestion.correctAnswer
                      ? "text-green-600 font-medium"
                      : isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer
                        ? "text-red-600 font-medium"
                        : ""
                  }
                >
                  {option}
                </Label>
                {isAnswered && option === currentQuestion.correctAnswer && (
                  <Check className="h-5 w-5 text-green-500 ml-2" />
                )}
                {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <X className="h-5 w-5 text-red-500 ml-2" />
                )}
              </div>
            ))}
          </RadioGroup>

          {isAnswered && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Explanation:</span> {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={resetQuiz} className="gap-2">
          <RefreshCw size={16} />
          Restart Quiz
        </Button>

        {!isAnswered ? (
          <Button onClick={handleSubmit} disabled={!selectedAnswer}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < shuffledQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </div>
    </div>
  )
}

