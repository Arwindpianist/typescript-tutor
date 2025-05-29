import { Lesson } from './types';

export const lessons: Lesson[] = [
  // --- TypeScript Fundamentals ---
  {
    id: 'intro-to-typescript',
    title: 'Introduction to TypeScript',
    content: `What is TypeScript and Why Use It?`,
    difficulty: 'beginner',
    prerequisites: [],
    exercises: [
      {
        id: 'intro-1',
        type: 'multiple-choice',
        question: 'What is TypeScript?',
        options: [
          'A JavaScript framework',
          'A typed superset of JavaScript',
          'A database',
          'A CSS preprocessor'
        ],
        correctAnswer: 'A typed superset of JavaScript',
        explanation: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
      },
      {
        id: 'intro-2',
        type: 'multiple-choice',
        question: 'Why use TypeScript?',
        options: [
          'For static typing and better tooling',
          'To make websites faster',
          'To style HTML',
          'To manage databases'
        ],
        correctAnswer: 'For static typing and better tooling',
        explanation: 'TypeScript provides static typing and improved developer tooling.'
      }
    ],
    estimatedTime: 10,
    order: 1
  },
  {
    id: 'installing-typescript',
    title: 'Installing TypeScript & tsconfig.json',
    content: `How to install TypeScript and configure tsconfig.json.`,
    difficulty: 'beginner',
    prerequisites: ['intro-to-typescript'],
    exercises: [
      {
        id: 'install-1',
        type: 'multiple-choice',
        question: 'Which command installs TypeScript globally?',
        options: [
          'npm install typescript',
          'npm install -g typescript',
          'npm install ts',
          'npm install -g tsconfig'
        ],
        correctAnswer: 'npm install -g typescript',
        explanation: 'The -g flag installs TypeScript globally.'
      },
      {
        id: 'install-2',
        type: 'coding',
        question: 'Write the minimal tsconfig.json to compile all .ts files in the src folder.',
        correctAnswer: '{\n  "compilerOptions": { "outDir": "./dist" },\n  "include": ["src/**/*"]\n}',
        explanation: 'The include array specifies which files to compile.',
        placeholder: '{\n  "compilerOptions": { "outDir": "./dist" },\n  "include": ["src/**/*"]\n}'
      }
    ],
    estimatedTime: 10,
    order: 2
  },
  {
    id: 'basic-types',
    title: 'Basic Types in TypeScript',
    content: `Covers string, number, boolean, null, undefined, any, unknown, void, never.`,
    difficulty: 'beginner',
    prerequisites: ['installing-typescript'],
    exercises: [
      {
        id: 'basic-1',
        type: 'multiple-choice',
        question: 'Which of these is NOT a basic type in TypeScript?',
        options: ['number', 'string', 'boolean', 'object'],
        correctAnswer: 'object',
        explanation: 'object is a more general type; number, string, and boolean are basic types.'
      },
      {
        id: 'basic-2',
        type: 'coding',
        question: 'Declare a variable of type boolean and set it to true.',
        correctAnswer: 'let isActive: boolean = true;',
        explanation: 'Use let isActive: boolean = true;',
        placeholder: 'let isActive: boolean = true;'
      }
    ],
    estimatedTime: 10,
    order: 3
  },
  // --- Intermediate TypeScript ---
  {
    id: 'interfaces-vs-type-aliases',
    title: 'Interfaces vs. Type Aliases (Deep Dive)',
    content: `When to use type vs interface, extending and merging interfaces.`,
    difficulty: 'intermediate',
    prerequisites: ['basic-types'],
    exercises: [
      {
        id: 'inter-1',
        type: 'multiple-choice',
        question: 'Which can be merged by declaration: interface or type alias?',
        options: ['interface', 'type alias', 'both', 'neither'],
        correctAnswer: 'interface',
        explanation: 'Interfaces can be merged by declaration, type aliases cannot.'
      },
      {
        id: 'inter-2',
        type: 'coding',
        question: 'Create an interface Person with a name (string) and age (number).',
        correctAnswer: 'interface Person { name: string; age: number; }',
        explanation: 'Use interface Person { name: string; age: number; }',
        placeholder: 'interface Person { name: string; age: number; }'
      }
    ],
    estimatedTime: 12,
    order: 4
  },
  {
    id: 'union-intersection-types',
    title: 'Union and Intersection Types',
    content: `Union (|) and Intersection (&) types, pattern matching using discriminated unions.`,
    difficulty: 'intermediate',
    prerequisites: ['interfaces-vs-type-aliases'],
    exercises: [
      {
        id: 'union-1',
        type: 'multiple-choice',
        question: 'What does the | operator do in TypeScript?',
        options: ['Creates a union type', 'Creates an intersection type', 'Performs a bitwise OR', 'Declares a tuple'],
        correctAnswer: 'Creates a union type',
        explanation: 'The | operator creates a union type.'
      },
      {
        id: 'union-2',
        type: 'coding',
        question: 'Declare a variable that can be a string or a number.',
        correctAnswer: 'let value: string | number;',
        explanation: 'Use let value: string | number;',
        placeholder: 'let value: string | number;'
      }
    ],
    estimatedTime: 12,
    order: 5
  },
  // --- Advanced TypeScript ---
  {
    id: 'advanced-generics',
    title: 'Advanced Generics',
    content: `Conditional generics, default generic parameters, generic constraints.`,
    difficulty: 'advanced',
    prerequisites: ['union-intersection-types'],
    exercises: [
      {
        id: 'advgen-1',
        type: 'multiple-choice',
        question: 'What does <T extends U> mean in a generic?',
        options: ['T must be a subtype of U', 'T is always a string', 'U is a function', 'T is a number'],
        correctAnswer: 'T must be a subtype of U',
        explanation: 'The extends keyword constrains T to types assignable to U.'
      },
      {
        id: 'advgen-2',
        type: 'coding',
        question: 'Write a generic function that returns its argument.',
        correctAnswer: 'function identity<T>(arg: T): T { return arg; }',
        explanation: 'Use function identity<T>(arg: T): T { return arg; }',
        placeholder: 'function identity<T>(arg: T): T { return arg; }'
      }
    ],
    estimatedTime: 15,
    order: 6
  },
  {
    id: 'mapped-types',
    title: 'Mapped Types',
    content: `Mapped types, readonly, optional, mapping over unions.`,
    difficulty: 'advanced',
    prerequisites: ['advanced-generics'],
    exercises: [
      {
        id: 'mapped-1',
        type: 'multiple-choice',
        question: 'What does [K in keyof T] do?',
        options: ['Iterates over all keys of T', 'Creates a tuple', 'Declares a function', 'None of the above'],
        correctAnswer: 'Iterates over all keys of T',
        explanation: 'It creates a mapped type by iterating over all keys of T.'
      },
      {
        id: 'mapped-2',
        type: 'coding',
        question: 'Create a mapped type that makes all properties of T readonly.',
        correctAnswer: 'type ReadonlyType<T> = { readonly [P in keyof T]: T[P]; };',
        explanation: 'Use type ReadonlyType<T> = { readonly [P in keyof T]: T[P]; };',
        placeholder: 'type ReadonlyType<T> = { readonly [P in keyof T]: T[P]; };'
      }
    ],
    estimatedTime: 15,
    order: 7
  },
  // --- Bonus Modules ---
  {
    id: 'typescript-with-node',
    title: 'Using TypeScript with Node.js',
    content: `How to use TypeScript in a Node.js project.`,
    difficulty: 'beginner',
    prerequisites: ['basic-types'],
    exercises: [
      {
        id: 'node-1',
        type: 'multiple-choice',
        question: 'Which file extension is used for TypeScript files?',
        options: ['.js', '.ts', '.jsx', '.tsx'],
        correctAnswer: '.ts',
        explanation: 'TypeScript files use the .ts extension.'
      },
      {
        id: 'node-2',
        type: 'coding',
        question: 'Write a simple TypeScript function that returns the sum of two numbers.',
        correctAnswer: 'function sum(a: number, b: number): number { return a + b; }',
        explanation: 'Use function sum(a: number, b: number): number { return a + b; }',
        placeholder: 'function sum(a: number, b: number): number { return a + b; }'
      }
    ],
    estimatedTime: 10,
    order: 8
  }
]; 