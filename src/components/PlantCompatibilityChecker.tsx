"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Check, X, Search, Leaf, ThermometerSun, Flower } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

interface PlantCompatibilityCheckerProps {
  className?: string;
  currentPlant?: string;
}

interface PlantComparisonResult {
  plantName: string;
  scientificName: string;
  compatibility: "high" | "medium" | "low" | "incompatible";
  reasons: string[];
  careNeeds: {
    light: string;
    water: string;
    soil: string;
    humidity: string;
  };
}

const PlantCompatibilityChecker = ({
  className,
  currentPlant = "Monstera Deliciosa",
}: PlantCompatibilityCheckerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlants, setSelectedPlants] = useState<string[]>([
    currentPlant,
  ]);
  const [comparisonResults, setComparisonResults] = useState<
    PlantComparisonResult[]
  >([
    {
      plantName: "Pothos",
      scientificName: "Epipremnum aureum",
      compatibility: "high",
      reasons: [
        "Similar light requirements",
        "Similar watering needs",
        "Both tropical plants that enjoy humidity",
      ],
      careNeeds: {
        light: "Medium to bright indirect light",
        water: "Allow top 1-2 inches of soil to dry out",
        soil: "Well-draining potting mix",
        humidity: "Moderate to high",
      },
    },
    {
      plantName: "Peace Lily",
      scientificName: "Spathiphyllum",
      compatibility: "medium",
      reasons: [
        "Similar humidity requirements",
        "Peace Lily needs more frequent watering",
        "Both enjoy filtered light",
      ],
      careNeeds: {
        light: "Low to medium indirect light",
        water: "Keep soil consistently moist",
        soil: "Rich, well-draining potting mix",
        humidity: "High",
      },
    },
    {
      plantName: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      compatibility: "low",
      reasons: [
        "Snake plant prefers drier conditions",
        "Different watering schedules can lead to problems",
        "Snake plant tolerates lower light",
      ],
      careNeeds: {
        light: "Low to bright indirect light",
        water: "Allow soil to dry completely",
        soil: "Well-draining, sandy soil",
        humidity: "Low to moderate",
      },
    },
    {
      plantName: "Cactus",
      scientificName: "Various species",
      compatibility: "incompatible",
      reasons: [
        "Completely different watering needs",
        "Cacti need much more light",
        "Cacti prefer low humidity while Monstera needs high humidity",
      ],
      careNeeds: {
        light: "Bright direct light",
        water: "Infrequent, allow to dry completely",
        soil: "Sandy, extremely well-draining",
        humidity: "Very low",
      },
    },
  ]);

  const [suggestedPlants, setSuggestedPlants] = useState([
    "Philodendron",
    "Pothos",
    "Peace Lily",
    "Fern",
    "Calathea",
    "Spider Plant",
    "Snake Plant",
    "Cactus",
    "Aloe Vera",
    "ZZ Plant",
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search an API
    console.log("Searching for:", searchQuery);
  };

  const addPlant = (plant: string) => {
    if (!selectedPlants.includes(plant)) {
      setSelectedPlants([...selectedPlants, plant]);
    }
    setSearchQuery("");
  };

  const removePlant = (plant: string) => {
    setSelectedPlants(selectedPlants.filter((p) => p !== plant));
  };

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "incompatible":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const filteredSuggestions = suggestedPlants
    .filter((plant) => !selectedPlants.includes(plant))
    .filter((plant) =>
      searchQuery
        ? plant.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    );

  return (
    <div className={className}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Plant Compatibility</CardTitle>
              <CardDescription>
                Find plants that grow well with {currentPlant}
              </CardDescription>
            </div>
            <Flower className="h-5 w-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Selected Plants</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPlants.map((plant) => (
                  <Badge key={plant} className="flex items-center gap-1 py-1.5">
                    {plant}
                    {plant !== currentPlant && (
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => removePlant(plant)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for plants"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>

            {searchQuery && filteredSuggestions.length > 0 && (
              <div className="border rounded-md p-2 mb-4">
                <h4 className="text-xs font-medium mb-2">Suggestions</h4>
                <div className="flex flex-wrap gap-2">
                  {filteredSuggestions.slice(0, 5).map((plant) => (
                    <Badge
                      key={plant}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => addPlant(plant)}
                    >
                      {plant}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium mb-2">
                Compatibility Results
              </h3>
              <div className="space-y-3">
                {comparisonResults.map((result) => (
                  <div
                    key={result.plantName}
                    className="border rounded-md overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                      <div>
                        <h4 className="font-medium">{result.plantName}</h4>
                        <p className="text-xs text-muted-foreground italic">
                          {result.scientificName}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getCompatibilityColor(result.compatibility)}
                      >
                        {result.compatibility} compatibility
                      </Badge>
                    </div>
                    <div className="p-3 space-y-2">
                      <div>
                        <h5 className="text-xs font-medium mb-1">
                          Compatibility Factors:
                        </h5>
                        <ul className="text-xs space-y-1 list-disc pl-5">
                          {result.reasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-start gap-1">
                          <ThermometerSun className="h-3 w-3 mt-0.5 text-yellow-500" />
                          <span className="font-medium">Light:</span>{" "}
                          {result.careNeeds.light}
                        </div>
                        <div className="flex items-start gap-1">
                          <Leaf className="h-3 w-3 mt-0.5 text-green-500" />
                          <span className="font-medium">Soil:</span>{" "}
                          {result.careNeeds.soil}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Plants with similar care needs generally grow well together
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlantCompatibilityChecker;
