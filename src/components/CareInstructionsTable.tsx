"use client";

import React from "react";
import { Droplet, Sun, Leaf } from "lucide-react";

interface CareInstruction {
  category: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface CareInstructionsTableProps {
  instructions?: CareInstruction[];
  plantName?: string;
}

const CareInstructionsTable = ({
  instructions = [
    {
      category: "Watering",
      value: "Moderate",
      icon: <Droplet className="h-4 w-4 text-blue-500" />,
      description: "Water when top inch of soil is dry, typically once a week.",
    },
    {
      category: "Sunlight",
      value: "Bright Indirect",
      icon: <Sun className="h-4 w-4 text-yellow-500" />,
      description:
        "Place in a bright area but avoid direct sunlight which can scorch leaves.",
    },
    {
      category: "Soil",
      value: "Well-draining",
      icon: <Leaf className="h-4 w-4 text-green-600" />,
      description:
        "Use a mix of potting soil with perlite or sand for good drainage.",
    },
  ],
  plantName = "Plant",
}: CareInstructionsTableProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
      <div className="text-xs text-center text-muted-foreground mb-2">
        Care instructions for {plantName}
      </div>
      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="mt-0.5">{instruction.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">
                  {instruction.category}
                </div>
                <div className="font-semibold text-sm">{instruction.value}</div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {instruction.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareInstructionsTable;
