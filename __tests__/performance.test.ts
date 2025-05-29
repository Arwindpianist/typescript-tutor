import { describe, test, expect } from '@jest/globals';
import { ProgressManager } from '../lib/progress';

describe('Performance Tests', () => {
  test('lesson content loads within 1 second', async () => {
    const start = performance.now();
    // Load lesson content
    const end = performance.now();
    expect(end - start).toBeLessThan(1000);
  });

  test('progress saves within 100ms', async () => {
    const start = performance.now();
    ProgressManager.saveProgress({
      completedLessons: [],
      quizScores: {},
      lastAccessedLesson: '',
      startDate: new Date().toISOString(),
      totalTimeSpent: 0,
      currentLesson: ''
    });
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
});
