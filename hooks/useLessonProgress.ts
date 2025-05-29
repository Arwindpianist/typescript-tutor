import { useEffect, useState } from 'react';
import { ProgressManager } from '@/lib/progress';
import { LessonProgress } from '@/lib/types';
import { lessons } from '@/lib/lessons';

export function useLessonProgress(lessonId: string) {
  // Initialize state to null; load actual progress in useEffect
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [startTime] = useState(() => Date.now());

  const lesson = lessons.find(l => l.id === lessonId);
  const totalExercises = lesson ? lesson.exercises.length : 0;
  
  // Calculate these based on the *current* progress state
  const completedCount = progress && progress.completedExercises
    ? lesson?.exercises.filter(ex => progress.completedExercises[ex.id]).length || 0
    : 0;
  const quizScore = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;
  const allExercisesCompleted = totalExercises > 0 && completedCount === totalExercises;
  const isCompleted = progress ? progress.isCompleted : false;
  const timeSpent = progress ? progress.timeSpent : 0;

  useEffect(() => {
    // Load progress from localStorage only on the client side
    const lessonProgress = ProgressManager.getLessonProgress(lessonId);
    setProgress(lessonProgress);

    // Update time spent when component unmounts
    return () => {
      const timeSpentSession = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
      // Update total time using the manager - it handles getting current total from storage
      // No need to check 'progress !== null' here as manager handles storage
      ProgressManager.updateTimeSpent(lessonId, timeSpentSession);
    };
  }, [lessonId, startTime]); // Removed 'progress' from dependencies

  const completeLesson = () => {
    if (allExercisesCompleted && progress !== null) {
      ProgressManager.completeLesson(lessonId);
      // Update state immediately after successful completion save
      setProgress(prev => prev ? ({ ...prev, isCompleted: true }) : null);
    }
  };

  const markExerciseCompleted = (exerciseId: string) => {
     if (progress !== null) {
      ProgressManager.markExerciseCompleted(lessonId, exerciseId);
      // Update state immediately
      setProgress(prev => prev ? ({
        ...prev,
        completedExercises: {
          ...prev.completedExercises,
          [exerciseId]: true,
        },
      }) : null);
    }
  };

  const isExerciseCompleted = (exerciseId: string) => {
    // Check in current state; fallback to false if progress is null
    return progress ? !!progress.completedExercises[exerciseId] : false;
  };

  return {
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
    isLoading: progress === null, // Add loading state
  };
} 