import React from "react";
import { Metadata } from "next";
import PlantIdentifier from "@/components/PlantIdentifier";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const metadata: Metadata = {
  title: "Plant Identifier - Identify and Care for Your Plants",
  description:
    "Upload a photo of your plant to identify it and get detailed care instructions.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 page-transition-enter-active">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69a.5.5 0 0 0 .62-.45V17.5c0-.27.18-.49.44-.49h1.5c.26 0 .44.22.44.49v1.74a.5.5 0 0 0 .62.45A9 9 0 0 0 12 2Z" />
                <path d="M4.73 15.05A7.92 7.92 0 0 1 4 12c0-4.41 3.59-8 8-8" />
                <path d="M13.56 3.23a7.9 7.9 0 0 1 5.77 7.69" />
                <path d="M13.5 9A3.5 3.5 0 0 0 10 5.5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">PlantID</h1>
          </div>
          <ThemeSwitcher />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Identify Your Plants
              </h2>
              <p className="text-muted-foreground">
                Take a photo or upload an image of any plant to instantly
                identify it and get detailed care instructions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-green-600 dark:text-green-400"
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
                <h3 className="font-medium">Accurate Identification</h3>
                <p className="text-sm text-center text-muted-foreground mt-1">
                  Our AI can identify thousands of plant species with high
                  accuracy.
                </p>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                  >
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                  </svg>
                </div>
                <h3 className="font-medium">Care Instructions</h3>
                <p className="text-sm text-center text-muted-foreground mt-1">
                  Get detailed watering, sunlight, and soil requirements for
                  your plants.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <PlantIdentifier />
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>© 2023 PlantID. All rights reserved.</p>
          <p className="mt-1">Powered by Gemini 1.5 Flash API</p>
        </footer>
      </div>
    </main>
  );
}
