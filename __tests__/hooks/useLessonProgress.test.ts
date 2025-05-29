import { renderHook, act } from '@testing-library/react';
import { useLessonProgress } from '../../hooks/useLessonProgress';

describe('useLessonProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('initializes with default values', () => {
    const { result } = renderHook(() => useLessonProgress('test-lesson'));
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.quizScore).toBeUndefined();
  });

  test('completes lesson', () => {
    const { result } = renderHook(() => useLessonProgress('test-lesson'));
    act(() => {
      result.current.completeLesson();
    });
    expect(result.current.isCompleted).toBe(true);
  });

  test('saves quiz score', () => {
    const { result } = renderHook(() => useLessonProgress('test-lesson'));
    act(() => {
      result.current.saveQuizScore(85);
    });
    expect(result.current.quizScore).toBe(85);
  });
});
