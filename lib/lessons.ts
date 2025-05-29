import { Lesson } from './types';

export const lessons: Lesson[] = [
  {
    id: 'intro-to-typescript',
    title: 'Introduction to TypeScript',
    content: `
TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## What is TypeScript?

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser, any host, any OS. Open source.

## Why TypeScript?

- Static typing
- Better IDE support
- Enhanced code quality
- Improved maintainability
    `,
    difficulty: 'beginner',
    prerequisites: [],
    exercises: [
      {
        id: 'intro-quiz-1',
        type: 'multiple-choice',
        question: 'What is TypeScript?',
        options: [
          'A new programming language',
          'A typed superset of JavaScript',
          'A JavaScript framework',
          'A database system'
        ],
        correctAnswer: 'A typed superset of JavaScript',
        explanation: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
      },
      {
        id: 'intro-quiz-2',
        type: 'multiple-choice',
        question: 'Which company developed TypeScript?',
        options: [
          'Google',
          'Microsoft',
          'Facebook',
          'Amazon'
        ],
        correctAnswer: 'Microsoft',
        explanation: 'TypeScript was developed and is maintained by Microsoft.'
      },
      {
        id: 'intro-quiz-3',
        type: 'multiple-choice',
        question: 'Which of the following is NOT a benefit of TypeScript?',
        options: [
          'Static typing',
          'Enhanced code quality',
          'Compiles to Python',
          'Better IDE support'
        ],
        correctAnswer: 'Compiles to Python',
        explanation: 'TypeScript compiles to JavaScript, not Python.'
      },
      {
        id: 'intro-quiz-4',
        type: 'multiple-choice',
        question: 'TypeScript files use which file extension?',
        options: [
          '.js',
          '.ts',
          '.jsx',
          '.tsx'
        ],
        correctAnswer: '.ts',
        explanation: 'TypeScript files use the .ts extension.'
      },
      {
        id: 'intro-quiz-5',
        type: 'multiple-choice',
        question: 'Which command is used to compile TypeScript to JavaScript?',
        options: [
          'tsc',
          'npm start',
          'node',
          'tsrun'
        ],
        correctAnswer: 'tsc',
        explanation: 'The TypeScript compiler (tsc) is used to compile TypeScript files.'
      }
    ],
    estimatedTime: 30,
    order: 1
  },
  {
    id: 'basic-types',
    title: 'Basic Types in TypeScript',
    content: `
TypeScript provides several basic types that you can use to define variables and function parameters.

## Common Types

- number
- string
- boolean
- array
- tuple
- enum
- any
- void
- null
- undefined
    `,
    difficulty: 'beginner',
    prerequisites: ['intro-to-typescript'],
    exercises: [
      {
        id: 'types-quiz-1',
        type: 'coding',
        question: 'Create a variable of type number and assign it a value.',
        correctAnswer: 'let age: number = 25;',
        explanation: 'This creates a variable named age of type number and assigns it the value 25.',
        placeholder: 'let age: number = 25;'
      },
      {
        id: 'types-quiz-2',
        type: 'coding',
        question: 'Declare a variable of type string and assign it your name.',
        correctAnswer: 'let name: string = "Arwin";',
        explanation: 'This creates a variable named name of type string and assigns it the value "Arwin".',
        placeholder: 'let name: string = "Arwin";'
      },
      {
        id: 'types-quiz-3',
        type: 'coding',
        question: 'Create a boolean variable called isActive and set it to true.',
        correctAnswer: 'let isActive: boolean = true;',
        explanation: 'This creates a boolean variable named isActive and sets it to true.',
        placeholder: 'let isActive: boolean = true;'
      },
      {
        id: 'types-quiz-4',
        type: 'coding',
        question: 'Declare an array of numbers called scores with values 10, 20, 30.',
        correctAnswer: 'let scores: number[] = [10, 20, 30];',
        explanation: 'This creates an array of numbers named scores with the values 10, 20, and 30.',
        placeholder: 'let scores: number[] = [10, 20, 30];'
      },
      {
        id: 'types-quiz-5',
        type: 'coding',
        question: 'Create a tuple called person with a string and a number (e.g., name and age).',
        correctAnswer: 'let person: [string, number] = ["Arwin", 25];',
        explanation: 'This creates a tuple named person with a string and a number.',
        placeholder: 'let person: [string, number] = ["Arwin", 25];'
      }
    ],
    estimatedTime: 45,
    order: 2
  },
  {
    id: 'intermediate-types',
    title: 'Intermediate TypeScript',
    content: `
Explore union types, intersection types, type aliases, and more advanced features.
    `,
    difficulty: 'intermediate',
    prerequisites: ['basic-types'],
    exercises: [
      {
        id: 'inter-quiz-1',
        type: 'multiple-choice',
        question: 'What is a union type in TypeScript?',
        options: [
          'A type that can be one of several types',
          'A type that combines all properties of two types',
          'A type that only allows numbers',
          'A type that is always a string'
        ],
        correctAnswer: 'A type that can be one of several types',
        explanation: 'Union types allow a variable to be one of several types, e.g., string | number.'
      },
      {
        id: 'inter-quiz-2',
        type: 'multiple-choice',
        question: 'How do you define a type alias in TypeScript?',
        options: [
          'type MyType = string;',
          'alias MyType = string;',
          'let MyType: string;',
          'define MyType as string;'
        ],
        correctAnswer: 'type MyType = string;',
        explanation: 'The type keyword is used to define a type alias.'
      },
      {
        id: 'inter-quiz-3',
        type: 'coding',
        question: 'Create a variable that can be either a string or a number.',
        correctAnswer: 'let value: string | number;',
        explanation: 'Use the union type syntax: string | number.',
        placeholder: 'let value: string | number;'
      },
      {
        id: 'inter-quiz-4',
        type: 'coding',
        question: 'Define a type alias called Point for an object with x and y as numbers.',
        correctAnswer: 'type Point = { x: number; y: number; };',
        explanation: 'Type aliases can be used for objects: type Point = { x: number; y: number; };',
        placeholder: 'type Point = { x: number; y: number; };'
      },
      {
        id: 'inter-quiz-5',
        type: 'multiple-choice',
        question: 'What does the & operator do in TypeScript types?',
        options: [
          'Creates a union type',
          'Creates an intersection type',
          'Performs a bitwise AND',
          'Declares a tuple'
        ],
        correctAnswer: 'Creates an intersection type',
        explanation: 'The & operator creates an intersection type, combining properties of multiple types.'
      }
    ],
    estimatedTime: 40,
    order: 3
  },
  {
    id: 'advanced-types',
    title: 'Advanced TypeScript',
    content: `
Learn about generics, conditional types, mapped types, and utility types.
    `,
    difficulty: 'advanced',
    prerequisites: ['intermediate-types'],
    exercises: [
      {
        id: 'adv-quiz-1',
        type: 'multiple-choice',
        question: 'What is a generic in TypeScript?',
        options: [
          'A type that is always string',
          'A way to create reusable components',
          'A function that returns void',
          'A type that only allows numbers'
        ],
        correctAnswer: 'A way to create reusable components',
        explanation: 'Generics allow you to write reusable, type-safe code.'
      },
      {
        id: 'adv-quiz-2',
        type: 'coding',
        question: 'Write a generic function identity that returns its argument.',
        correctAnswer: 'function identity<T>(arg: T): T { return arg; }',
        explanation: 'Generics use <T> to allow any type: function identity<T>(arg: T): T { return arg; }',
        placeholder: 'function identity<T>(arg: T): T { return arg; }'
      },
      {
        id: 'adv-quiz-3',
        type: 'multiple-choice',
        question: 'Which utility type makes all properties in a type optional?',
        options: [
          'Partial<T>',
          'Required<T>',
          'Readonly<T>',
          'Record<T>'
        ],
        correctAnswer: 'Partial<T>',
        explanation: 'Partial<T> makes all properties in a type optional.'
      },
      {
        id: 'adv-quiz-4',
        type: 'coding',
        question: 'Create a mapped type that makes all properties of T readonly.',
        correctAnswer: 'type ReadonlyType<T> = { readonly [P in keyof T]: T[P]; };',
        explanation: 'Mapped types use [P in keyof T]: type ReadonlyType<T> = { readonly [P in keyof T]: T[P]; };',
        placeholder: 'type ReadonlyType<T> = { readonly [P in keyof T]: T[P]; };'
      },
      {
        id: 'adv-quiz-5',
        type: 'multiple-choice',
        question: 'What does the conditional type T extends U ? X : Y mean?',
        options: [
          'If T is assignable to U, use X; otherwise, use Y',
          'It always returns X',
          'It always returns Y',
          'It checks if X is a subtype of Y'
        ],
        correctAnswer: 'If T is assignable to U, use X; otherwise, use Y',
        explanation: 'Conditional types allow you to choose a type based on a condition.'
      }
    ],
    estimatedTime: 50,
    order: 4
  }
]; 