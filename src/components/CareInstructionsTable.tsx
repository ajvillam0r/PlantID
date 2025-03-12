"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
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
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
      description: "Water when top inch of soil is dry, typically once a week.",
    },
    {
      category: "Sunlight",
      value: "Bright Indirect",
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      description:
        "Place in a bright area but avoid direct sunlight which can scorch leaves.",
    },
    {
      category: "Soil",
      value: "Well-draining",
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      description:
        "Use a mix of potting soil with perlite or sand for good drainage.",
    },
  ],
  plantName = "Plant",
}: CareInstructionsTableProps) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <Table>
        <TableCaption>Care instructions for {plantName}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Requirement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instructions.map((instruction, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <TableCell className="text-center">{instruction.icon}</TableCell>
              <TableCell className="font-medium">
                {instruction.category}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold">{instruction.value}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {instruction.description}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CareInstructionsTable;
