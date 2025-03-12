"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Bell, Search, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";

interface RarePlantAlertsProps {
  className?: string;
  userLocation?: string;
}

interface PlantAlert {
  id: string;
  plantName: string;
  scientificName: string;
  rarity: "rare" | "very-rare" | "endangered";
  notificationEnabled: boolean;
}

const RarePlantAlerts = ({
  className,
  userLocation = "San Francisco, CA",
}: RarePlantAlertsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [alerts, setAlerts] = useState<PlantAlert[]>([
    {
      id: "1",
      plantName: "Variegated Monstera",
      scientificName: "Monstera deliciosa 'Variegata'",
      rarity: "rare",
      notificationEnabled: true,
    },
    {
      id: "2",
      plantName: "Pink Princess Philodendron",
      scientificName: "Philodendron erubescens 'Pink Princess'",
      rarity: "rare",
      notificationEnabled: true,
    },
    {
      id: "3",
      plantName: "Thai Constellation",
      scientificName: "Monstera deliciosa 'Thai Constellation'",
      rarity: "very-rare",
      notificationEnabled: false,
    },
  ]);

  const [suggestedPlants, setSuggestedPlants] = useState([
    {
      id: "4",
      plantName: "White Wizard Philodendron",
      scientificName: "Philodendron erubescens 'White Wizard'",
      rarity: "very-rare",
    },
    {
      id: "5",
      plantName: "Monstera Obliqua",
      scientificName: "Monstera obliqua",
      rarity: "endangered",
    },
    {
      id: "6",
      plantName: "Philodendron Spiritus Sancti",
      scientificName: "Philodendron spiritus-sancti",
      rarity: "endangered",
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter from an API
    console.log("Searching for:", searchQuery);
  };

  const toggleNotification = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, notificationEnabled: !alert.notificationEnabled }
          : alert,
      ),
    );
  };

  const addAlert = (plant: any) => {
    const newAlert: PlantAlert = {
      ...plant,
      notificationEnabled: true,
    };
    setAlerts([...alerts, newAlert]);
    // Remove from suggestions
    setSuggestedPlants(suggestedPlants.filter((p) => p.id !== plant.id));
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "very-rare":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "endangered":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
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
              <CardTitle className="text-xl">Rare Plant Alerts</CardTitle>
              <CardDescription>
                Get notified when rare plants become available near{" "}
                {userLocation}
              </CardDescription>
            </div>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for rare plants"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Your Alert List</h3>
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No alerts set up yet. Add plants from the suggestions below.
                </p>
              ) : (
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">
                            {alert.plantName}
                          </h4>
                          <Badge
                            variant="outline"
                            className={getRarityColor(alert.rarity)}
                          >
                            {alert.rarity.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                          {alert.scientificName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={alert.notificationEnabled}
                          onCheckedChange={() => toggleNotification(alert.id)}
                          id={`switch-${alert.id}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => removeAlert(alert.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">
                Suggested Rare Plants
              </h3>
              <div className="space-y-2">
                {suggestedPlants.map((plant) => (
                  <div
                    key={plant.id}
                    className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">
                          {plant.plantName}
                        </h4>
                        <Badge
                          variant="outline"
                          className={getRarityColor(plant.rarity)}
                        >
                          {plant.rarity.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        {plant.scientificName}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => addAlert(plant)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Notifications based on availability at 12 nurseries in your area
          </p>
          <Button variant="outline" size="sm">
            Manage Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RarePlantAlerts;
