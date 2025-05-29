# TypeScript Tutor

An interactive learning platform for mastering TypeScript through hands-on exercises, real-world examples, and interactive quizzes. Visit [typescripttutor.arwindpianist.store](https://typescripttutor.arwindpianist.store) to start learning!

## 🚀 Features

- **Interactive Lessons**: Learn TypeScript through carefully structured lessons
- **Code Editor**: Practice TypeScript directly in your browser with Monaco Editor
- **Progress Tracking**: Save your progress locally and track your learning journey
- **Multiple Choice Quizzes**: Test your knowledge with interactive quizzes
- **Responsive Design**: Learn on any device - mobile, tablet, or desktop
- **Dark Mode**: Comfortable viewing experience in any lighting condition
- **Search Functionality**: Quickly find lessons and topics
- **Structured Learning Path**: Follow a carefully designed curriculum

## 🛠️ Technologies Used

### Core Technologies
- **Next.js 15**: React framework for production
- **TypeScript**: For type-safe code
- **React 19**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **next-themes**: Dark mode support

### UI Components
- **Radix UI**: Accessible UI components
- **Lucide Icons**: Beautiful icons
- **Monaco Editor**: Code editor integration
- **React Markdown**: Markdown rendering
- **Tailwind Merge**: Utility for merging Tailwind classes
- **Class Variance Authority**: For component variants

### Form Handling & Validation
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation resolvers

### Testing
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **ts-jest**: TypeScript support for Jest

## 🏗️ Project Structure

```
typescript-tutor/
├── app/                    # Next.js app directory
│   ├── lesson/            # Lesson pages
│   ├── roadmap/           # Learning roadmap
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # UI components
│   ├── navigation.tsx    # Navigation bar
│   └── quiz-block.tsx    # Quiz component
├── lib/                  # Utility functions
│   ├── lessons.ts        # Lesson data
│   ├── progress.ts       # Progress tracking
│   └── types.ts          # TypeScript types
├── public/              # Static assets
└── styles/             # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/typescript-tutor.git
cd typescript-tutor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run test`: Run tests
- `npm run type-check`: Check TypeScript types
- `npm run format`: Format code with Prettier

## 📚 Learning Path

The curriculum is structured into three main difficulty levels:

### Beginner
- Introduction to TypeScript
- Basic Types
- Interfaces and Type Aliases
- Functions and Parameters

### Intermediate
- Advanced Types
- Generics
- Type Guards
- Utility Types

### Advanced
- Decorators
- Advanced Generics
- Type System Internals
- Performance Optimization

## 💾 Progress Tracking

Your progress is automatically saved in your browser's local storage. This includes:
- Completed lessons
- Quiz scores
- Exercise completions

## 🎨 Customization

### Adding New Lessons
1. Add lesson data to `lib/lessons.ts`
2. Follow the existing lesson structure
3. Include exercises and quizzes

### Modifying Styles
- Global styles are in `app/globals.css`
- Component styles use Tailwind CSS
- Dark mode styles are handled by next-themes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Vercel](https://vercel.com) for hosting

## 📞 Support

For support, please open an issue in the GitHub repository or contact us at [arwin@arwindpianist.store](mailto:arwin@arwindpianist.store).
