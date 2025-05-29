'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Trophy, Users, ArrowRight, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import { lessons } from "@/lib/lessons"
import { ProgressManager } from "@/lib/progress"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [featuredLessons, setFeaturedLessons] = useState(lessons.slice(0, 3).map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    description: "Start your TypeScript journey with this lesson.",
    difficulty: lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1),
    duration: `${lesson.estimatedTime} min`,
    completed: false,
  })));

  useEffect(() => {
    // Update completion status after component mounts
    setFeaturedLessons(prev => prev.map(lesson => ({
      ...lesson,
      completed: ProgressManager.getLessonProgress(lesson.id).isCompleted
    })));
  }, []);

  const stats = [
    { icon: BookOpen, label: "Lessons", value: `${lessons.length}+` },
    { icon: Code, label: "Code Examples", value: `${lessons.reduce((acc, lesson) => acc + lesson.exercises.length, 0)}+` },
    { icon: Trophy, label: "Quizzes", value: `${lessons.reduce((acc, lesson) => acc + lesson.exercises.filter(ex => ex.type === 'multiple-choice').length, 0)}+` },
    { icon: Users, label: "Students", value: "10K+" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-indigo-950 dark:via-background dark:to-sky-950">
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">
              Interactive TypeScript Learning
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
              Master TypeScript with <span className="text-indigo-600 dark:text-indigo-400">Interactive Lessons</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Learn TypeScript through hands-on coding exercises, real-world examples, and interactive quizzes. Perfect
              for JavaScript developers ready to level up.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                <Link href="/roadmap">
                  <Play className="mr-2 h-4 w-4" />
                  Start Learning
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href="/lesson/typescript-basics">
                  View Sample Lesson
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg mb-3 sm:mb-4">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Featured Lessons</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
              Start your TypeScript journey with these carefully crafted lessons designed for real-world application.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {featuredLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={lesson.difficulty === "Beginner" ? "default" : "secondary"} className="text-xs">
                      {lesson.difficulty}
                    </Badge>
                    {lesson.completed && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />}
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{lesson.title}</CardTitle>
                  <CardDescription className="text-sm">{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">{lesson.duration}</span>
                    <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm">
                      <Link href={`/lesson/${lesson.id}`}>
                        Start Lesson
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button asChild variant="outline" size="sm" className="text-sm">
              <Link href="/roadmap">View All Lessons</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Why Choose TypeScript Tutor?</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg mb-3 sm:mb-4">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Interactive Code Editor</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Practice TypeScript directly in your browser with our integrated code editor and instant feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg mb-3 sm:mb-4">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Structured Learning Path</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Follow a carefully designed curriculum that builds your TypeScript skills progressively.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 dark:bg-indigo-900 rounded-lg mb-3 sm:mb-4">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Quizzes & Challenges</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Test your knowledge with interactive quizzes and coding challenges after each lesson.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-indigo-600 dark:bg-indigo-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Ready to Master TypeScript?</h2>
          <p className="text-sm sm:text-base text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            Join thousands of developers who have already improved their skills with our interactive TypeScript course.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-sm sm:text-base">
            <Link href="/roadmap">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
