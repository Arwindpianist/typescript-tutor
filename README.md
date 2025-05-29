# TypeScript Tutor

A modern, production-ready TypeScript learning platform with local progress tracking, lessons, and a visual roadmap.

## Features

- **Lessons**: Structured, interactive lessons with markdown content and exercises.
- **Progress Tracking**: Your progress is saved locally (no central database required).
- **Export/Import Progress**: Backup or transfer your progress between devices.
- **Visual Roadmap**: See your learning journey and completed lessons.
- **Exercises**: Multiple-choice and coding exercises with explanations.
- **Time Tracking**: See how much time you've spent learning.
- **Offline-Ready**: (Planned) Service worker support for offline learning.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000)

## Testing

- **Run all tests**
  ```bash
  npm test
  ```
- **Test features manually**:
  - Start a lesson, complete exercises, and mark as complete
  - Refresh the page and verify your progress persists
  - Use the Progress Dashboard to export and import your progress
  - Check time tracking on lessons
  - Try on different browsers/devices

## UI Overview

- **Lesson Page**: Shows lesson content, exercises, and a button to mark as complete. Time spent is displayed.
- **Progress Dashboard**: Shows completed lessons, total time, current lesson, and export/import buttons.
- **Roadmap**: (Planned) Visualizes your learning journey and prerequisites.

## How Progress is Stored

- All progress is saved in your browser's `localStorage`.
- No data is sent to a server.
- You can export/import your progress as a JSON file.

## Contributing

- Add new lessons in `lib/lessons.ts`
- Add new exercise types or UI improvements as needed

---

For more details, see the code and comments in the relevant files.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
