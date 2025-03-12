"use client";

import React from "react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import CareInstructionsTable from "./CareInstructionsTable";
import ActionButtons from "./ActionButtons";
import { Droplet, Sun, Leaf, Tag, Bell } from "lucide-react";
import { Motion, MotionGroup } from "./ui/motion";

interface PlantDetail {
  label: string;
  value: string;
}

interface PlantResultsProps {
  plantName?: string;
  scientificName?: string;
  imageUrl?: string;
  confidence?: number;
  details?: PlantDetail[];
  tags?: string[];
  careInstructions?: any[];
  isVisible?: boolean;
  onIdentifyAnother?: () => void;
  onViewMoreDetails?: () => void;
  onAddToRareAlerts?: () => void;
}

const PlantResults = ({
  plantName = "Monstera Deliciosa",
  scientificName = "Monstera deliciosa",
  imageUrl = "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
  confidence = 98,
  details = [
    { label: "Family", value: "Araceae" },
    { label: "Origin", value: "Southern Mexico & Panama" },
    { label: "Growth Rate", value: "Moderate to fast" },
    { label: "Toxicity", value: "Toxic to pets" },
  ],
  tags = ["Tropical", "Indoor", "Air Purifying", "Large Leaves"],
  careInstructions,
  isVisible = true,
  onIdentifyAnother = () => console.log("Identify another plant"),
  onViewMoreDetails = () => console.log("View more details"),
  onAddToRareAlerts = () => console.log("Add to rare plant alerts"),
}: PlantResultsProps) => {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-md mx-auto bg-background">
      <Card className="overflow-hidden">
        <Motion type="scale" duration={600}>
          <div className="relative h-64 w-full">
            <img
              src={imageUrl}
              alt={plantName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className="bg-black/70 text-white animate-float"
              >
                {confidence}% match
              </Badge>
            </div>
          </div>
        </Motion>

        <CardHeader>
          <Motion type="slide-down" delay={200} duration={500}>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{plantName}</CardTitle>
                <CardDescription className="italic">
                  {scientificName}
                </CardDescription>
              </div>
              <Leaf className="h-6 w-6 text-green-600 animate-float" />
            </div>
          </Motion>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <Motion type="fade" delay={400} duration={500}>
              <div className="grid grid-cols-2 gap-3">
                {details.map((detail, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="text-sm font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            </Motion>

            <Motion type="fade" delay={600} duration={500}>
              <div className="flex flex-wrap gap-2 mt-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <MotionGroup staggerDelay={100} type="scale" duration={300}>
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tags.includes("Rare") && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 cursor-pointer animate-pulse-slow"
                      onClick={onAddToRareAlerts}
                    >
                      <Bell className="h-3 w-3 mr-1" />
                      Add Alert
                    </Badge>
                  )}
                </MotionGroup>
              </div>
            </Motion>

            <Motion type="slide-up" delay={800} duration={500}>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Care Instructions
                </h3>
                <CareInstructionsTable
                  plantName={plantName}
                  instructions={careInstructions?.map((instruction) => ({
                    category: instruction.category,
                    value: instruction.value,
                    description: instruction.description,
                    icon: instruction.category
                      .toLowerCase()
                      .includes("water") ? (
                      <Droplet className="h-5 w-5 text-blue-500" />
                    ) : instruction.category.toLowerCase().includes("sun") ||
                      instruction.category.toLowerCase().includes("light") ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Leaf className="h-5 w-5 text-green-600" />
                    ),
                  }))}
                />
              </div>
            </Motion>
          </div>
        </CardContent>

        <CardFooter className="flex-col space-y-4 pb-6">
          <Motion type="slide-up" delay={1000} duration={500}>
            <ActionButtons onIdentifyAnother={onIdentifyAnother} />
          </Motion>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlantResults;
