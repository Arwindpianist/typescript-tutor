import { useEffect, useState } from 'react';
import { ProgressManager } from '@/lib/progress';
import { LessonProgress } from '@/lib/types';
import { lessons } from '@/lib/lessons';

export function useLessonProgress(lessonId: string) {
  const [progress, setProgress] = useState<LessonProgress>(() => 
    ProgressManager.getLessonProgress(lessonId)
  );
  const [startTime] = useState(() => Date.now());

  const lesson = lessons.find(l => l.id === lessonId);
  const totalExercises = lesson ? lesson.exercises.length : 0;
  const completedCount = lesson && progress.completedExercises
    ? lesson.exercises.filter(ex => progress.completedExercises[ex.id]).length
    : 0;
  const quizScore = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;
  const allExercisesCompleted = totalExercises > 0 && completedCount === totalExercises;

  useEffect(() => {
    // Update time spent when component unmounts
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000); // Convert to seconds
      ProgressManager.updateTimeSpent(lessonId, timeSpent);
    };
  }, [lessonId, startTime]);

  const completeLesson = () => {
    if (allExercisesCompleted) {
      ProgressManager.completeLesson(lessonId);
      setProgress(prev => ({ ...prev, isCompleted: true }));
    }
  };

  const markExerciseCompleted = (exerciseId: string) => {
    ProgressManager.markExerciseCompleted(lessonId, exerciseId);
    setProgress(prev => ({
      ...prev,
      completedExercises: {
        ...prev.completedExercises,
        [exerciseId]: true,
      },
    }));
  };

  const isExerciseCompleted = (exerciseId: string) => {
    return !!progress.completedExercises[exerciseId];
  };

  return {
    progress,
    completeLesson,
    markExerciseCompleted,
    isExerciseCompleted,
    isCompleted: progress.isCompleted,
    quizScore,
    timeSpent: progress.timeSpent,
    allExercisesCompleted,
    totalExercises,
    completedCount,
  };
} 