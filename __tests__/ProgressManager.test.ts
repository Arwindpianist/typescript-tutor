// __tests__/ProgressManager.test.ts
import { ProgressManager } from '../lib/progress';

describe('ProgressManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize progress when none exists', () => {
    const progress = ProgressManager.getProgress();
    expect(progress.completedLessons).toEqual([]);
    expect(progress.quizScores).toEqual({});
    expect(progress.startDate).toBeDefined();
  });

  test('should save and retrieve progress', () => {
    const testProgress = {
      completedLessons: ['lesson1'],
      quizScores: { lesson1: 100 },
      lastAccessedLesson: 'lesson1',
      startDate: new Date().toISOString(),
      totalTimeSpent: 3600,
      currentLesson: 'lesson1'
    };
    
    ProgressManager.saveProgress(testProgress);
    const retrieved = ProgressManager.getProgress();
    expect(retrieved).toEqual(testProgress);
  });

  test('should complete a lesson', () => {
    ProgressManager.completeLesson('lesson1');
    const progress = ProgressManager.getProgress();
    expect(progress.completedLessons).toContain('lesson1');
  });
});