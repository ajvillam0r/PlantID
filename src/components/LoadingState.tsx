"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Motion } from "./ui/motion";

interface LoadingStateProps {
  message?: string;
  showSpinner?: boolean;
  className?: string;
}

const LoadingState = ({
  message = "Identifying your plant...",
  showSpinner = true,
  className,
}: LoadingStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full min-h-[300px] p-6 rounded-lg bg-white dark:bg-gray-800",
        className,
      )}
    >
      {showSpinner && (
        <Motion type="scale" duration={600}>
          <div className="relative w-20 h-20 mb-6">
            <Loader2 className="w-20 h-20 animate-spin text-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 animate-pulse" />
            </div>
          </div>
        </Motion>
      )}

      <Motion type="fade" delay={300} duration={500}>
        <h3 className="text-xl font-semibold text-center mb-4">{message}</h3>
      </Motion>

      <Motion type="fade" delay={500} duration={500}>
        <div className="w-full max-w-md space-y-3">
          <p className="text-sm text-center text-muted-foreground mb-4">
            Our AI is analyzing your image to identify the plant and provide
            care instructions.
          </p>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full animate-shimmer" />
            <Skeleton className="h-4 w-3/4 mx-auto animate-shimmer" />
            <Skeleton className="h-4 w-5/6 mx-auto animate-shimmer" />
          </div>
        </div>
      </Motion>

      <Motion type="slide-up" delay={800} duration={500}>
        <div className="mt-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
            <Skeleton className="w-full h-full animate-shimmer" />
          </div>
          <Skeleton className="h-4 w-32 mt-2 animate-shimmer" />
        </div>
      </Motion>
    </div>
  );
};

export default LoadingState;
