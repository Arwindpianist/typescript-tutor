import { UserProgress, LessonProgress } from './types';
import { lessons } from './lessons';

export class ProgressManager {
  private static readonly STORAGE_KEY = 'typescript-tutor-progress';
  private static readonly LESSON_PROGRESS_KEY = 'typescript-tutor-lesson-progress';

  static getProgress(): UserProgress {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return this.initializeProgress();
    }
    return JSON.parse(stored);
  }

  static getLessonProgress(lessonId: string): LessonProgress {
    const stored = localStorage.getItem(`${this.LESSON_PROGRESS_KEY}-${lessonId}`);
    if (!stored) {
      return this.initializeLessonProgress(lessonId);
    }
    return JSON.parse(stored);
  }

  static saveProgress(progress: UserProgress): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  static saveLessonProgress(lessonId: string, progress: LessonProgress): void {
    localStorage.setItem(
      `${this.LESSON_PROGRESS_KEY}-${lessonId}`,
      JSON.stringify(progress)
    );
  }

  static markExerciseCompleted(lessonId: string, exerciseId: string): void {
    const lessonProgress = this.getLessonProgress(lessonId);
    lessonProgress.completedExercises[exerciseId] = true;
    this.saveLessonProgress(lessonId, lessonProgress);
  }

  static isExerciseCompleted(lessonId: string, exerciseId: string): boolean {
    const lessonProgress = this.getLessonProgress(lessonId);
    return !!lessonProgress.completedExercises[exerciseId];
  }

  static completeLesson(lessonId: string): void {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const lessonProgress = this.getLessonProgress(lessonId);
    // Only complete if all exercises are completed
    const allCompleted = lesson.exercises.every(ex => lessonProgress.completedExercises[ex.id]);
    if (!allCompleted) return;
    const progress = this.getProgress();
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      this.saveProgress(progress);
    }
    lessonProgress.isCompleted = true;
    this.saveLessonProgress(lessonId, lessonProgress);
  }

  static saveQuizScore(lessonId: string, score: number): void {
    const progress = this.getProgress();
    progress.quizScores[lessonId] = score;
    this.saveProgress(progress);

    const lessonProgress = this.getLessonProgress(lessonId);
    lessonProgress.quizScore = score;
    this.saveLessonProgress(lessonId, lessonProgress);
  }

  static updateTimeSpent(lessonId: string, timeSpent: number): void {
    const progress = this.getProgress();
    progress.totalTimeSpent += timeSpent;
    this.saveProgress(progress);

    const lessonProgress = this.getLessonProgress(lessonId);
    lessonProgress.timeSpent += timeSpent;
    this.saveLessonProgress(lessonId, lessonProgress);
  }

  static exportProgress(): string {
    const progress = this.getProgress();
    return JSON.stringify(progress);
  }

  static importProgress(jsonString: string): boolean {
    try {
      const progress = JSON.parse(jsonString) as UserProgress;
      this.validateProgress(progress);
      this.saveProgress(progress);
      return true;
    } catch (error) {
      console.error('Invalid progress data:', error);
      return false;
    }
  }

  private static initializeProgress(): UserProgress {
    const initialProgress: UserProgress = {
      completedLessons: [],
      quizScores: {},
      lastAccessedLesson: '',
      startDate: new Date().toISOString(),
      totalTimeSpent: 0,
      currentLesson: ''
    };
    this.saveProgress(initialProgress);
    return initialProgress;
  }

  private static initializeLessonProgress(lessonId: string): LessonProgress {
    const lesson = lessons.find(l => l.id === lessonId);
    const completedExercises: Record<string, boolean> = {};
    if (lesson) {
      lesson.exercises.forEach(ex => {
        completedExercises[ex.id] = false;
      });
    }
    return {
      isCompleted: false,
      lastAccessed: new Date().toISOString(),
      timeSpent: 0,
      completedExercises,
    };
  }

  private static validateProgress(progress: UserProgress): void {
    if (!progress.completedLessons || !Array.isArray(progress.completedLessons)) {
      throw new Error('Invalid progress data: completedLessons must be an array');
    }
    if (!progress.quizScores || typeof progress.quizScores !== 'object') {
      throw new Error('Invalid progress data: quizScores must be an object');
    }
    if (!progress.startDate || typeof progress.startDate !== 'string') {
      throw new Error('Invalid progress data: startDate must be a string');
    }
  }
} 