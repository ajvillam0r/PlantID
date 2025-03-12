import React from "react";
import PlantIdentifier from "@/components/PlantIdentifier";
import { Providers } from "./providers";
import { Leaf } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 page-transition-enter-active">
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">PlantID</h1>
            </div>
            <ThemeToggle />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Identify Your Plants
            </h2>
            <p className="text-muted-foreground text-sm">
              Take a photo or upload an image to identify plants and get care
              instructions.
            </p>
          </div>

          <PlantIdentifier />

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-green-600 dark:text-green-400"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="M16 6 7 22" />
                  <path d="m8 6 9 16" />
                </svg>
              </div>
              <h3 className="font-medium text-sm">Accurate ID</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Identify thousands of plant species with high accuracy
              </p>
            </div>

            <div className="flex flex-col items-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-blue-600 dark:text-blue-400"
                >
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                </svg>
              </div>
              <h3 className="font-medium text-sm">Care Guide</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Get watering, light, and soil requirements for your plants
              </p>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-muted-foreground">
            <p>© 2023 PlantID. All rights reserved.</p>
            <p className="mt-1">Powered by Gemini 1.5 Flash API</p>
          </footer>
        </div>
      </main>
    </Providers>
  );
}
