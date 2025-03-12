"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sun, Cloud, Snowflake, Flower, Calendar, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

interface SeasonalCareAdjustmentsProps {
  className?: string;
  plantName?: string;
  userLocation?: string;
}

interface SeasonalCare {
  season: "spring" | "summer" | "fall" | "winter";
  watering: string;
  light: string;
  fertilizing: string;
  tips: string[];
  icon: React.ReactNode;
}

const SeasonalCareAdjustments = ({
  className,
  plantName = "Monstera Deliciosa",
  userLocation = "San Francisco, CA",
}: SeasonalCareAdjustmentsProps) => {
  const [currentSeason, setCurrentSeason] = useState<
    "spring" | "summer" | "fall" | "winter"
  >("spring");
  const [selectedSeason, setSelectedSeason] = useState<
    "spring" | "summer" | "fall" | "winter"
  >("spring");

  // Determine current season based on hemisphere and month
  useEffect(() => {
    const now = new Date();
    const month = now.getMonth();
    // Northern hemisphere seasons
    // This is simplified - a real app would use the user's actual location to determine hemisphere
    if (month >= 2 && month <= 4) setCurrentSeason("spring");
    else if (month >= 5 && month <= 7) setCurrentSeason("summer");
    else if (month >= 8 && month <= 10) setCurrentSeason("fall");
    else setCurrentSeason("winter");

    setSelectedSeason(currentSeason);
  }, []);

  const seasonalCareData: Record<string, SeasonalCare> = {
    spring: {
      season: "spring",
      watering:
        "Increase watering frequency as growth accelerates. Water when the top 2 inches of soil are dry.",
      light:
        "Move closer to windows to take advantage of increasing sunlight, but avoid direct afternoon sun.",
      fertilizing:
        "Begin monthly fertilizing with a balanced houseplant fertilizer at half strength.",
      tips: [
        "Spring is the ideal time for repotting if needed",
        "Clean leaves to remove dust and improve photosynthesis",
        "Watch for new growth and adjust care accordingly",
        "Begin acclimating to outdoor conditions if you plan to move outside for summer",
      ],
      icon: <Flower className="h-5 w-5 text-pink-500" />,
    },
    summer: {
      season: "summer",
      watering:
        "Water more frequently as temperatures rise. Check soil moisture every 3-4 days.",
      light:
        "Protect from intense direct sunlight which can scorch leaves. Filter light through sheer curtains if needed.",
      fertilizing:
        "Continue monthly fertilizing. Consider using a slightly higher nitrogen formula to support active growth.",
      tips: [
        "Increase humidity by misting or using a humidifier during dry, hot periods",
        "Watch for signs of heat stress like curling leaves",
        "Rotate the plant regularly for even growth",
        "Consider moving away from air conditioning vents which can dry out plants",
      ],
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
    },
    fall: {
      season: "fall",
      watering:
        "Reduce watering frequency as growth slows. Allow soil to dry out more between waterings.",
      light:
        "Move to brighter locations as daylight hours decrease. Clean windows to maximize light penetration.",
      fertilizing:
        "Reduce fertilizing to every 6-8 weeks or stop completely by late fall.",
      tips: [
        "Bring outdoor plants inside before temperatures drop below 55°F (13°C)",
        "Check for pests before bringing plants indoors",
        "Clean leaves and inspect for issues before winter",
        "Begin acclimating to indoor conditions if moving from outdoors",
      ],
      icon: <Cloud className="h-5 w-5 text-orange-500" />,
    },
    winter: {
      season: "winter",
      watering:
        "Water sparingly, allowing soil to dry out completely between waterings. Overwatering in winter is a common issue.",
      light:
        "Move to the brightest available location. Consider supplemental grow lights during short winter days.",
      fertilizing:
        "Stop fertilizing or reduce to quarterly at 1/4 strength until spring.",
      tips: [
        "Keep away from cold drafts and heat sources like radiators",
        "Increase humidity with humidifiers or pebble trays as indoor heating dries the air",
        "Dust leaves regularly to maximize light absorption",
        "Don't repot during winter dormancy period",
      ],
      icon: <Snowflake className="h-5 w-5 text-blue-500" />,
    },
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "spring":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "summer":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "fall":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "winter":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className={className}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Seasonal Care Guide</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {userLocation}
              </CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">
                Adjust care for {plantName} by season
              </h3>
              <div className="flex justify-between mb-4">
                {Object.keys(seasonalCareData).map((season) => (
                  <Badge
                    key={season}
                    variant={selectedSeason === season ? "default" : "outline"}
                    className={`cursor-pointer ${selectedSeason === season ? "" : getSeasonColor(season)}`}
                    onClick={() =>
                      setSelectedSeason(
                        season as "spring" | "summer" | "fall" | "winter",
                      )
                    }
                  >
                    {season.charAt(0).toUpperCase() + season.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <div
                className={`p-3 flex items-center justify-between ${getSeasonColor(selectedSeason)}`}
              >
                <div className="flex items-center gap-2">
                  {seasonalCareData[selectedSeason].icon}
                  <h3 className="font-medium capitalize">
                    {selectedSeason} Care
                  </h3>
                </div>
                {currentSeason === selectedSeason && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Current Season
                  </Badge>
                )}
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Watering</h4>
                    <p className="text-sm text-muted-foreground">
                      {seasonalCareData[selectedSeason].watering}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Light</h4>
                    <p className="text-sm text-muted-foreground">
                      {seasonalCareData[selectedSeason].light}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Fertilizing</h4>
                    <p className="text-sm text-muted-foreground">
                      {seasonalCareData[selectedSeason].fertilizing}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Seasonal Tips</h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {seasonalCareData[selectedSeason].tips.map((tip, index) => (
                      <li key={index} className="text-muted-foreground">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Adjusting care seasonally helps plants thrive year-round
          </p>
          <Button variant="outline" size="sm">
            Set Reminders
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeasonalCareAdjustments;
