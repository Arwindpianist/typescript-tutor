'use client';

import { notFound } from 'next/navigation';
import { lessons } from '@/lib/lessons';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import ReactMarkdown from 'react-markdown';
import { QuizBlock } from '@/components/quiz-block';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

interface LessonPageProps {
  params: {
    slug: string;
  };
}

const MonacoEditor = dynamic(() => import('@monaco-editor/react').then(mod => mod.default), { ssr: false });

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
    completedCount,
    isLoading
  } = useLessonProgress(lesson.id);

  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (progress) {
      const initialAnswers: Record<string, string> = {};
      lesson.exercises.forEach(ex => {
        if (ex.type === 'coding' && progress.completedExercises[ex.id]) {
           initialAnswers[ex.id] = ex.correctAnswer;
        }
      });
      setExerciseAnswers(initialAnswers);
      const initialResults: Record<string, boolean> = {};
       lesson.exercises.forEach(ex => {
         if (progress.completedExercises[ex.id]) {
           initialResults[ex.id] = true;
         }
       });
       setShowResults(initialResults);
    }
  }, [progress, lesson.exercises]);

  const handleExerciseSubmit = (exerciseId: string, answer: string, isCorrect: boolean) => {
    setExerciseAnswers(prev => ({ ...prev, [exerciseId]: answer }));
    setShowResults(prev => ({ ...prev, [exerciseId]: true }));
    if (isCorrect) {
      markExerciseCompleted(exerciseId);
    }
  };

  if (isLoading || progress === null) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-400">
        Loading lesson progress...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{lesson.title}</h1>
            
            <div className="prose max-w-none text-gray-800 dark:text-gray-200">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Exercises</h2>
              {lesson.exercises.map((exercise) => {
                const completed = isExerciseCompleted(exercise.id);
                return (
                  <div key={exercise.id} className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{exercise.question}</span>
                      {completed ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 ml-2">
                          ✓ Completed
                        </span>
                      ) : null}
                    </div>
                    {exercise.type === 'multiple-choice' ? (
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <QuizBlock
                          quiz={{
                            question: exercise.question,
                            options: exercise.options || [],
                            correctAnswer: exercise.options?.indexOf(exercise.correctAnswer) || 0,
                            explanation: exercise.explanation
                          }}
                          onComplete={(isCorrect) => handleExerciseSubmit(exercise.id, exercise.correctAnswer, isCorrect)}
                        />
                      </div>
                    ) : exercise.type === 'coding' ? (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        {resolvedTheme ? (
                          <MonacoEditor
                            key={resolvedTheme}
                            height="150px"
                            language={exercise.placeholder?.trim().startsWith('{') ? 'json' : 'typescript'}
                            theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
                            value={exerciseAnswers[exercise.id] || ''}
                            options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'Fira Mono, monospace' }}
                            onChange={(value) => setExerciseAnswers(prev => ({ ...prev, [exercise.id]: value || '' }))}
                          />
                        ) : (
                          <div className="h-[150px] flex items-center justify-center text-gray-400 dark:text-gray-500">Loading editor…</div>
                        )}
                        {showResults[exercise.id] && (
                          <div className={`mt-4 p-4 rounded-lg flex items-center gap-4 ${
                            (() => {
                              // Forgiving check for JSON
                              if (exercise.placeholder?.trim().startsWith('{')) {
                                try {
                                  const userObj = JSON.parse(exerciseAnswers[exercise.id] || '{}');
                                  const correctObj = JSON.parse(exercise.correctAnswer);
                                  return JSON.stringify(userObj) === JSON.stringify(correctObj)
                                    ? 'bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-800'
                                    : 'bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-800';
                                } catch {
                                  return 'bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-800';
                                }
                              }
                              // Forgiving check for code: trim and collapse whitespace
                              const userCode = (exerciseAnswers[exercise.id] || '').replace(/\s+/g, ' ').trim();
                              const correctCode = exercise.correctAnswer.replace(/\s+/g, ' ').trim();
                              return userCode === correctCode
                                ? 'bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-800'
                                : 'bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-800';
                            })()
                          }`}>
                            <span>
                              <strong>
                                {(() => {
                                  if (exercise.placeholder?.trim().startsWith('{')) {
                                    try {
                                      const userObj = JSON.parse(exerciseAnswers[exercise.id] || '{}');
                                      const correctObj = JSON.parse(exercise.correctAnswer);
                                      return JSON.stringify(userObj) === JSON.stringify(correctObj)
                                        ? <span className="text-green-700 dark:text-green-200">Correct!</span>
                                        : <span className="text-red-700 dark:text-red-200">Incorrect</span>;
                                    } catch {
                                      return <span className="text-red-700 dark:text-red-200">Incorrect</span>;
                                    }
                                  }
                                  const userCode = (exerciseAnswers[exercise.id] || '').replace(/\s+/g, ' ').trim();
                                  const correctCode = exercise.correctAnswer.replace(/\s+/g, ' ').trim();
                                  return userCode === correctCode
                                    ? <span className="text-green-700 dark:text-green-200">Correct!</span>
                                    : <span className="text-red-700 dark:text-red-200">Incorrect</span>;
                                })()}
                              </strong>
                            </span>
                            <span className="text-sm text-gray-800 dark:text-gray-200">
                              <strong>Explanation:</strong> {exercise.explanation}
                              {(() => {
                                if (exercise.placeholder?.trim().startsWith('{')) {
                                  try {
                                    const userObj = JSON.parse(exerciseAnswers[exercise.id] || '{}');
                                    const correctObj = JSON.parse(exercise.correctAnswer);
                                    if (JSON.stringify(userObj) === JSON.stringify(correctObj)) return null;
                                  } catch {}
                                } else {
                                  const userCode = (exerciseAnswers[exercise.id] || '').replace(/\s+/g, ' ').trim();
                                  const correctCode = exercise.correctAnswer.replace(/\s+/g, ' ').trim();
                                  if (userCode === correctCode) return null;
                                }
                                return <><br /><strong>Expected:</strong> <code className="bg-gray-100 dark:bg-gray-900 p-1 rounded">{exercise.correctAnswer}</code></>;
                              })()}
                            </span>
                          </div>
                        )}
                        <div className="mt-4">
                          <button
                            onClick={() => handleExerciseSubmit(
                              exercise.id,
                              exerciseAnswers[exercise.id] || '',
                              (() => {
                                if (exercise.placeholder?.trim().startsWith('{')) {
                                  try {
                                    const userObj = JSON.parse(exerciseAnswers[exercise.id] || '{}');
                                    const correctObj = JSON.parse(exercise.correctAnswer);
                                    return JSON.stringify(userObj) === JSON.stringify(correctObj);
                                  } catch {
                                    return false;
                                  }
                                }
                                const userCode = (exerciseAnswers[exercise.id] || '').replace(/\s+/g, ' ').trim();
                                const correctCode = exercise.correctAnswer.replace(/\s+/g, ' ').trim();
                                return userCode === correctCode;
                              })()
                            )}
                            className={`px-4 py-2 rounded font-semibold transition-colors ${completed ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
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
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  isCompleted
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : allExercisesCompleted
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {isCompleted ? 'Completed' : 'Mark as Complete'}
              </button>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                Time spent: {Math.floor(timeSpent / 60)} minutes
                {totalExercises > 0 && progress && (
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
