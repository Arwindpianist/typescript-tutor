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

const SECTION_LABELS = {
  beginner: 'TypeScript Fundamentals',
  intermediate: 'Intermediate TypeScript',
  advanced: 'Advanced TypeScript',
  bonus: 'Bonus Modules',
};

function groupLessonsByDifficulty() {
  const groups: Record<string, typeof lessons> = {};
  for (const lesson of lessons) {
    const key = lesson.difficulty === 'beginner' ? 'beginner'
      : lesson.difficulty === 'intermediate' ? 'intermediate'
      : lesson.difficulty === 'advanced' ? 'advanced'
      : 'bonus';
    if (!groups[key]) groups[key] = [];
    groups[key].push(lesson);
  }
  return groups;
}

export default function RoadmapPage() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  useEffect(() => {
    setUserProgress(ProgressManager.getProgress());
  }, []);

  const grouped = groupLessonsByDifficulty();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Learning Roadmap</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Follow this structured path to master TypeScript. Complete lessons in order to unlock advanced topics.
          </p>
        </div>

        {/* Grouped Sections */}
        <div className="space-y-12">
          {Object.entries(SECTION_LABELS).map(([key, label]) => {
            const sectionLessons = (grouped[key] || []).sort((a, b) => a.order - b.order);
            if (!sectionLessons.length) return null;
            const completed = userProgress ? sectionLessons.filter(l => userProgress.completedLessons.includes(l.id)).length : 0;
            const total = sectionLessons.length;
            const percent = total > 0 ? (completed / total) * 100 : 0;
            return (
              <div key={key}>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{label}</h2>
                <div className="mb-2">
                  <Progress value={percent} className="h-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{completed}/{total} lessons completed</div>
                </div>
                <div className="space-y-4">
                  {sectionLessons.map((lesson, idx) => {
                    const isCompleted = userProgress?.completedLessons.includes(lesson.id);
                    return (
                      <Card key={lesson.id} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl">{lesson.title}</CardTitle>
                              <CardDescription className="text-base mt-1">{lesson.content}</CardDescription>
                            </div>
                            <Badge variant="outline">
                              {isCompleted ? 'Completed' : `Lesson ${lesson.order}`}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              ) : (
                                <Circle className="h-6 w-6 text-gray-400" />
                              )}
                              <span className={isCompleted ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-white'}>
                                {isCompleted ? 'Completed' : 'Not completed'}
                              </span>
                            </div>
                          </div>
                          <Button asChild size="sm" disabled={isCompleted}>
                            <Link href={`/lesson/${lesson.id}`}>
                              {isCompleted ? 'Review' : 'Start'}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
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
              {/* Continue Next Lesson button logic remains unchanged */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
