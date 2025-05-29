import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TypeScript Tutor - Learn TypeScript Interactively",
  description: "Master TypeScript through hands-on coding exercises, real-world examples, and interactive quizzes.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "TypeScript Tutor - Learn TypeScript Interactively",
    description: "Master TypeScript through hands-on coding exercises, real-world examples, and interactive quizzes.",
    url: 'https://typescripttutor.arwindpianist.store',
    siteName: 'TypeScript Tutor',
    images: [
      {
        url: '/typescript-tutor.png', // Replace with your actual image path in the public directory
        width: 1200,
        height: 630,
        alt: 'TypeScript Tutor Web Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
