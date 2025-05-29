import { useEffect, useState } from 'react';
import { ProgressManager } from '@/lib/progress';
import { UserProgress } from '@/lib/types';

export function ProgressDashboard() {
  const [progress, setProgress] = useState<UserProgress>(() => 
    ProgressManager.getProgress()
  );

  const exportProgress = () => {
    const jsonString = ProgressManager.exportProgress();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typescript-tutor-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonString = e.target?.result as string;
        if (ProgressManager.importProgress(jsonString)) {
          setProgress(ProgressManager.getProgress());
        }
      };
      reader.readAsText(file);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Learning Stats</h3>
          <p className="text-gray-700 dark:text-gray-300">Completed Lessons: {progress.completedLessons.length}</p>
          <p className="text-gray-700 dark:text-gray-300">Total Time Spent: {formatTime(progress.totalTimeSpent)}</p>
          <p className="text-gray-700 dark:text-gray-300">Started: {new Date(progress.startDate).toLocaleDateString()}</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Current Progress</h3>
          <p className="text-gray-700 dark:text-gray-300">Current Lesson: {progress.currentLesson || 'Not started'}</p>
          <p className="text-gray-700 dark:text-gray-300">Last Accessed: {progress.lastAccessedLesson || 'None'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={exportProgress}
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export Progress
        </button>

        <div className="relative">
          <input
            type="file"
            accept=".json"
            onChange={importProgress}
            className="hidden"
            id="import-progress"
          />
          <label
            htmlFor="import-progress"
            className="block w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-center cursor-pointer"
          >
            Import Progress
          </label>
        </div>
      </div>
    </div>
  );
} 