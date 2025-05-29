'use client';

import { notFound } from 'next/navigation';
import { lessons } from '@/lib/lessons';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import ReactMarkdown from 'react-markdown';
import { QuizBlock } from '@/components/quiz-block';
import { useState } from 'react';

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = lessons.find(l => l.id === params.slug);
  
  if (!lesson) {
    notFound();
  }

  const {
    progress,
    completeLesson,
    markExerciseCompleted,
    isExerciseCompleted,
    isCompleted,
    quizScore,
    timeSpent,
    allExercisesCompleted,
    totalExercises,
    completedCount
  } = useLessonProgress(lesson.id);

  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleExerciseSubmit = (exerciseId: string, answer: string, isCorrect: boolean) => {
    setExerciseAnswers(prev => ({ ...prev, [exerciseId]: answer }));
    setShowResults(prev => ({ ...prev, [exerciseId]: true }));
    if (isCorrect) {
      markExerciseCompleted(exerciseId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
            
            <div className="prose max-w-none">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Exercises</h2>
              {lesson.exercises.map((exercise) => {
                const completed = isExerciseCompleted(exercise.id);
                return (
                  <div key={exercise.id} className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{exercise.question}</span>
                      {completed ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 ml-2">
                          ✓ Completed
                        </span>
                      ) : null}
                    </div>
                    {exercise.type === 'multiple-choice' ? (
                      <QuizBlock
                        quiz={{
                          question: exercise.question,
                          options: exercise.options || [],
                          correctAnswer: exercise.options?.indexOf(exercise.correctAnswer) || 0,
                          explanation: exercise.explanation
                        }}
                        onComplete={(isCorrect) => handleExerciseSubmit(exercise.id, exercise.correctAnswer, isCorrect)}
                      />
                    ) : exercise.type === 'coding' ? (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <textarea
                          className="w-full h-32 p-2 border rounded font-mono"
                          placeholder={exercise.placeholder || 'Write your code here...'}
                          value={exerciseAnswers[exercise.id] || ''}
                          onChange={(e) => setExerciseAnswers(prev => ({ ...prev, [exercise.id]: e.target.value }))}
                          disabled={completed}
                        />
                        {showResults[exercise.id] && (
                          <div className={`mt-4 p-4 rounded-lg flex items-center gap-4 ${
                            exerciseAnswers[exercise.id]?.trim() === exercise.correctAnswer.trim()
                              ? 'bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-800'
                              : 'bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-800'
                          }`}>
                            <span>
                              <strong>
                                {exerciseAnswers[exercise.id]?.trim() === exercise.correctAnswer.trim() ? (
                                  <span className="text-green-700 dark:text-green-200">Correct!</span>
                                ) : (
                                  <span className="text-red-700 dark:text-red-200">Incorrect</span>
                                )}
                              </strong>
                            </span>
                            <span className="text-sm">
                              <strong>Explanation:</strong> {exercise.explanation}
                              {exerciseAnswers[exercise.id]?.trim() !== exercise.correctAnswer.trim() && (
                                <><br /><strong>Expected:</strong> <code>{exercise.correctAnswer}</code></>)
                              }
                            </span>
                          </div>
                        )}
                        <div className="mt-4">
                          <button
                            onClick={() => handleExerciseSubmit(
                              exercise.id,
                              exerciseAnswers[exercise.id] || '',
                              (exerciseAnswers[exercise.id] || '').trim() === exercise.correctAnswer.trim()
                            )}
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            disabled={completed}
                          >
                            Submit Answer
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={completeLesson}
                disabled={isCompleted || !allExercisesCompleted}
                className={`px-4 py-2 rounded ${
                  isCompleted
                    ? 'bg-gray-300 cursor-not-allowed'
                    : allExercisesCompleted
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCompleted ? 'Completed' : 'Mark as Complete'}
              </button>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                Time spent: {Math.floor(timeSpent / 60)} minutes
                {totalExercises > 0 && (
                  <> | Quiz Score: {quizScore}% ({completedCount}/{totalExercises} exercises completed)</>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <ProgressDashboard />
        </div>
      </div>
    </div>
  );
}
