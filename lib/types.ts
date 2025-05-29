export interface Lesson {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  exercises: Exercise[];
  estimatedTime: number;
  order: number;
}

export interface Exercise {
  id: string;
  type: 'quiz' | 'coding' | 'multiple-choice';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  placeholder?: string;
}

export interface UserProgress {
  completedLessons: string[];
  quizScores: Record<string, number>;
  lastAccessedLesson: string;
  startDate: string;
  totalTimeSpent: number;
  currentLesson: string;
}

export interface LessonProgress {
  isCompleted: boolean;
  quizScore?: number;
  lastAccessed: string;
  timeSpent: number;
  completedExercises: Record<string, boolean>;
} 