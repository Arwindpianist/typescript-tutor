"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Code, BookOpen, Map, Menu, Moon, Sun, Search } from "lucide-react"
import { lessons } from "@/lib/lessons"

// Group lessons by difficulty
const groupedLessons = lessons.reduce((acc, lesson) => {
  const key = lesson.difficulty === 'beginner' ? 'Beginner'
    : lesson.difficulty === 'intermediate' ? 'Intermediate'
    : lesson.difficulty === 'advanced' ? 'Advanced'
    : 'Bonus';
  if (!acc[key]) acc[key] = [];
  acc[key].push(lesson);
  return acc;
}, {} as Record<string, typeof lessons>);

// Sort lessons within each group by order
Object.keys(groupedLessons).forEach(key => {
  groupedLessons[key].sort((a, b) => a.order - b.order);
});

const navigation = [
  { name: "Home", href: "/", icon: BookOpen },
  { name: "Roadmap", href: "/roadmap", icon: Map },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Filter lessons based on search query
  const filteredLessons = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(lowerQuery) ||
      lesson.content.toLowerCase().includes(lowerQuery) ||
      lesson.exercises.some(ex => ex.question.toLowerCase().includes(lowerQuery))
    );
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-gray-800">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg">
              <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl">TypeScript Tutor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`group inline-flex h-9 sm:h-10 w-max items-center justify-center rounded-md bg-background px-3 sm:px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                          pathname === item.href ? "bg-accent text-accent-foreground" : ""
                        } dark:hover:bg-gray-800 dark:hover:text-white dark:focus:bg-gray-800 dark:focus:text-white dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 sm:h-10 dark:hover:bg-gray-800 dark:hover:text-white dark:data-[state=open]:bg-gray-800/50">Lessons</NavigationMenuTrigger>
                  <NavigationMenuContent className="dark:bg-gray-900 dark:border-gray-800">
                    <div className="grid w-[300px] sm:w-[400px] gap-3 p-4">
                      {Object.entries(groupedLessons).map(([key, lessons]) => (
                         <div key={key} className="grid gap-1 mb-2">
                           <h4 className="text-sm font-medium leading-none text-gray-900 dark:text-white">{key} Lessons</h4>
                           {lessons.map((lesson) => (
                             <Link
                               key={lesson.id}
                               href={`/lesson/${lesson.id}`}
                               className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:hover:bg-gray-800 dark:hover:text-white dark:focus:bg-gray-800 dark:focus:text-white"
                             >
                               <div className="flex items-center justify-between">
                                 <div className="text-sm font-medium leading-none text-gray-900 dark:text-white">{lesson.title}</div>
                                 <Badge
                                   variant={lesson.difficulty === "beginner" ? "default" : lesson.difficulty === "intermediate" ? "secondary" : "outline"}
                                   className="text-xs"
                                 >
                                   {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                                 </Badge>
                               </div>
                             </Link>
                           ))}
                         </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search Bar - Hidden on smallest screens */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(e.target.value.length > 0);
                }}
                onFocus={() => setIsSearchOpen(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 w-32 sm:w-40 md:w-48 transition-colors"
              />
              {isSearchOpen && filteredLessons.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                  {filteredLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lesson/${lesson.id}`}
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchOpen(false);
                      }}
                      className="block px-3 sm:px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {lesson.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] dark:bg-gray-900">
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Mobile Search */}
                  <div className="sm:hidden">
                    <input
                      type="text"
                      placeholder="Search lessons..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchOpen(e.target.value.length > 0);
                      }}
                      className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                    />
                    {isSearchOpen && filteredLessons.length > 0 && (
                      <div className="mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                        {filteredLessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={`/lesson/${lesson.id}`}
                            onClick={() => {
                              setSearchQuery("");
                              setIsSearchOpen(false);
                              setIsOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {lesson.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-2 text-base sm:text-lg font-medium ${
                        pathname === item.href ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}

                  <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Lessons</h4>
                     {Object.entries(groupedLessons).map(([key, lessons]) => (
                         <div key={key} className="grid gap-1 mb-2">
                           <h5 className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">{key}</h5>
                           {lessons.map((lesson) => (
                             <Link
                               key={lesson.id}
                               href={`/lesson/${lesson.id}`}
                               onClick={() => setIsOpen(false)}
                               className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                             >
                               {lesson.title}
                             </Link>
                           ))}
                         </div>
                      ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
