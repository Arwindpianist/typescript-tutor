"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, HelpCircle } from "lucide-react"

interface Quiz {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizBlockProps {
  quiz: Quiz
  onComplete: (isCorrect: boolean) => void
}

export function QuizBlock({ quiz, onComplete }: QuizBlockProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === quiz.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    onComplete(correct)
  }

  const resetQuiz = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Knowledge Check
          </CardTitle>
          {showResult && (
            <Badge variant={isCorrect ? "default" : "destructive"}>{isCorrect ? "Correct!" : "Incorrect"}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="font-medium text-lg">{quiz.question}</h3>

        <div className="space-y-2">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-colors ${
                showResult
                  ? index === quiz.correctAnswer
                    ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200"
                    : index === selectedAnswer && !isCorrect
                      ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
                      : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  : selectedAnswer === index
                    ? "bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-200"
                    : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{option}</span>
                {showResult && (
                  <div>
                    {index === quiz.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : index === selectedAnswer && !isCorrect ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div
            className={`p-4 rounded-lg ${
              isCorrect
                ? "bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800"
                : "bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-800"
            }`}
          >
            <p
              className={`text-sm ${
                isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
              }`}
            >
              <strong>Explanation:</strong> {quiz.explanation}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Submit Answer
            </Button>
          ) : (
            <Button variant="outline" onClick={resetQuiz}>
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
