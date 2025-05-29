"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Copy, Check } from "lucide-react"

interface CodeEditorProps {
  initialCode: string
  title?: string
}

export function CodeEditor({ initialCode, title = "Code Editor" }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const runCode = async () => {
    setIsRunning(true)
    setOutput("")

    try {
      // Simulate code execution with TypeScript compilation
      // In a real implementation, you'd use Monaco Editor with TypeScript support
      // or send the code to a backend service for compilation and execution

      // Mock execution - replace console.log calls with output capture
      const mockConsole = {
        log: (...args: any[]) => {
          const message = args
            .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
            .join(" ")
          setOutput((prev) => prev + message + "\n")
        },
      }

      // Simple evaluation for demo purposes
      // In production, use a proper TypeScript compiler/runner
      const wrappedCode = code.replace(/console\.log/g, "mockConsole.log")

      // Simulate some output
      setTimeout(() => {
        if (code.includes("greetUser")) {
          setOutput("Hello John Doe, you are 25 years old!\n")
        } else {
          setOutput("Code executed successfully!\n")
        }
        setIsRunning(false)
      }, 1000)
    } catch (error) {
      setOutput(`Error: ${error}`)
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">TypeScript</Badge>
            <Button variant="outline" size="sm" onClick={copyCode} className="h-8 w-8 p-0">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Code Input */}
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your TypeScript code here..."
            spellCheck={false}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button onClick={runCode} disabled={isRunning} size="sm" className="bg-green-600 hover:bg-green-700">
            <Play className="mr-2 h-4 w-4" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
          <Button variant="outline" onClick={resetCode} size="sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Output */}
        {(output || isRunning) && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Output:</h4>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[100px] overflow-auto">
              {isRunning ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                  Executing code...
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{output || "No output"}</pre>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
