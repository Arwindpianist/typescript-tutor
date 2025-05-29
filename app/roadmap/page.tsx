'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { lessons } from "@/lib/lessons"
import { ProgressManager } from "@/lib/progress"
import { useEffect, useState } from "react"
import { UserProgress } from "@/lib/types"

export default function RoadmapPage() {
  const [learningPaths, setLearningPaths] = useState([
    {
      id: "beginner",
      title: "TypeScript Fundamentals",
      description: "Master the basics of TypeScript",
      lessons: lessons
        .filter(lesson => lesson.difficulty === 'beginner')
        .map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          completed: false,
          locked: false,
        })),
    },
    {
      id: "intermediate",
      title: "Intermediate TypeScript",
      description: "Deep dive into intermediate concepts",
      lessons: lessons
        .filter(lesson => lesson.difficulty === 'intermediate')
        .map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          completed: false,
          locked: true,
        })),
    },
    {
      id: "advanced",
      title: "Advanced TypeScript",
      description: "Master advanced TypeScript concepts",
      lessons: lessons
        .filter(lesson => lesson.difficulty === 'advanced')
        .map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          completed: false,
          locked: true,
        })),
    },
  ]);

  useEffect(() => {
    // Update progress after component mounts
    setLearningPaths(prev => prev.map(path => ({
      ...path,
      lessons: path.lessons.map(lesson => ({
        ...lesson,
        completed: ProgressManager.getLessonProgress(lesson.id).isCompleted,
        locked: path.id === 'beginner' ? false :
          path.id === 'intermediate' ? 
            !lessons.filter(l => l.difficulty === 'beginner')
              .every(l => ProgressManager.getLessonProgress(l.id).isCompleted) :
            !lessons.filter(l => l.difficulty === 'intermediate')
              .every(l => ProgressManager.getLessonProgress(l.id).isCompleted)
      }))
    })));
  }, []);

  const totalLessons = learningPaths.reduce((acc, path) => acc + path.lessons.length, 0)
  const completedLessons = learningPaths.reduce(
    (acc, path) => acc + path.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progressPercentage = (completedLessons / totalLessons) * 100

  // Find the first incomplete lesson in order (client only)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  useEffect(() => {
    setUserProgress(ProgressManager.getProgress());
  }, []);
  const allLessonsOrdered = lessons.slice().sort((a, b) => a.order - b.order);
  const nextLesson = userProgress
    ? allLessonsOrdered.find(lesson => !userProgress.completedLessons.includes(lesson.id))
    : allLessonsOrdered[0];
  const allComplete = userProgress ? !nextLesson : false;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Learning Roadmap</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Follow this structured path to master TypeScript. Complete lessons in order to unlock advanced topics.
          </p>

          {/* Progress Overview */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Overall Progress</span>
              <span>
                {completedLessons}/{totalLessons} lessons
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-500 mt-2">{Math.round(progressPercentage)}% complete</p>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="space-y-8">
          {learningPaths.map((path) => {
            const pathCompleted = path.lessons.filter((lesson) => lesson.completed).length
            const pathTotal = path.lessons.length
            const pathProgress = (pathCompleted / pathTotal) * 100

            return (
              <Card key={path.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{path.title}</CardTitle>
                      <CardDescription className="text-base mt-1">{path.description}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      {pathCompleted}/{pathTotal}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Progress value={pathProgress} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {path.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                          lesson.locked
                            ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {lesson.completed ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : lesson.locked ? (
                              <Lock className="h-6 w-6 text-gray-400" />
                            ) : (
                              <Circle className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3
                              className={`font-medium ${
                                lesson.locked ? "text-gray-400" : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Lesson {index + 1} of {path.lessons.length}
                            </p>
                          </div>
                        </div>
                        <div>
                          {lesson.locked ? (
                            <Badge variant="secondary">Locked</Badge>
                          ) : lesson.completed ? (
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/lesson/${lesson.id}`}>Review</Link>
                            </Button>
                          ) : (
                            <Button asChild size="sm">
                              <Link href={`/lesson/${lesson.id}`}>
                                Start
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Next Steps */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Keep Learning!</CardTitle>
              <CardDescription>
                Complete lessons in order to unlock advanced topics and build a strong foundation in TypeScript.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {allComplete ? (
                <Button disabled variant="outline">
                  All lessons completed!
                </Button>
              ) : (
                <Button asChild>
                  <Link href={`/lesson/${nextLesson?.id || ''}`}>
                    Continue Next Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
