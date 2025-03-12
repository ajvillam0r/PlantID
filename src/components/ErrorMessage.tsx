"use client";

import React from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onTryAgain?: () => void;
  showTryAgainButton?: boolean;
}

const ErrorMessage = ({
  title = "Identification Failed",
  message = "We couldn't identify this plant. Please try again with a clearer image or from a different angle.",
  onTryAgain = () => console.log("Try again clicked"),
  showTryAgainButton = true,
}: ErrorMessageProps) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>

      <div className="flex flex-col space-y-3">
        {showTryAgainButton && (
          <Button
            onClick={onTryAgain}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
          <p>Tips for better results:</p>
          <ul className="list-disc list-inside text-left mt-1">
            <li>Ensure good lighting</li>
            <li>Focus on the plant's leaves and flowers</li>
            <li>Avoid blurry images</li>
            <li>Try different angles</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
