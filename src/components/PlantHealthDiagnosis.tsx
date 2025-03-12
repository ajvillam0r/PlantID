"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  AlertCircle,
  Search,
  Leaf,
  Droplet,
  Bug,
  Scissors,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

interface PlantHealthDiagnosisProps {
  className?: string;
  plantName?: string;
  imageUrl?: string;
}

interface HealthIssue {
  id: string;
  name: string;
  description: string;
  severity: "low" | "medium" | "high";
  symptoms: string[];
  treatment: string[];
  preventionTips: string[];
}

const PlantHealthDiagnosis = ({
  className,
  plantName = "Monstera Deliciosa",
  imageUrl = "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80",
}: PlantHealthDiagnosisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [healthIssues, setHealthIssues] = useState<HealthIssue[]>([
    {
      id: "1",
      name: "Leaf Spot Disease",
      description: "Fungal infection causing brown spots with yellow halos",
      severity: "medium",
      symptoms: [
        "Brown spots with yellow halos",
        "Spots may merge into larger lesions",
        "Affected leaves eventually turn yellow and drop",
      ],
      treatment: [
        "Remove and destroy affected leaves",
        "Apply fungicide according to package directions",
        "Ensure good air circulation around plants",
        "Avoid overhead watering",
      ],
      preventionTips: [
        "Water at the base of the plant",
        "Space plants properly for good air circulation",
        "Clean up fallen leaves and plant debris",
        "Use disease-resistant varieties when possible",
      ],
    },
    {
      id: "2",
      name: "Spider Mites",
      description: "Tiny pests that cause stippling on leaves and fine webbing",
      severity: "high",
      symptoms: [
        "Fine webbing on undersides of leaves",
        "Tiny specks moving on the leaf surface",
        "Yellow or bronze stippling on leaves",
        "Leaves may curl, dry, and fall off",
      ],
      treatment: [
        "Spray plants with strong stream of water",
        "Apply insecticidal soap or neem oil",
        "For severe infestations, use miticide",
        "Repeat treatments every 7-10 days",
      ],
      preventionTips: [
        "Increase humidity around plants",
        "Regularly inspect plants for early signs",
        "Keep plants healthy and well-watered",
        "Introduce beneficial predators like ladybugs",
      ],
    },
  ]);

  const [selectedIssue, setSelectedIssue] = useState<HealthIssue | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getIssueIcon = (issueName: string) => {
    if (
      issueName.toLowerCase().includes("spot") ||
      issueName.toLowerCase().includes("rot")
    ) {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    } else if (
      issueName.toLowerCase().includes("mite") ||
      issueName.toLowerCase().includes("bug") ||
      issueName.toLowerCase().includes("pest")
    ) {
      return <Bug className="h-5 w-5 text-red-500" />;
    } else if (issueName.toLowerCase().includes("wilt")) {
      return <Droplet className="h-5 w-5 text-blue-500" />;
    } else {
      return <Leaf className="h-5 w-5 text-green-600" />;
    }
  };

  return (
    <div className={className}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Plant Health Diagnosis</CardTitle>
              <CardDescription>
                Identify and treat common plant health issues
              </CardDescription>
            </div>
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          {!selectedIssue ? (
            <div className="space-y-4">
              <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                <img
                  src={imageUrl}
                  alt={plantName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/70 text-white">{plantName}</Badge>
                </div>
              </div>

              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                  <p className="text-sm text-center text-muted-foreground">
                    Analyzing leaf patterns and discoloration...
                  </p>
                </div>
              ) : (
                <>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Health Analysis</AlertTitle>
                    <AlertDescription>
                      We've detected 2 potential health issues with your{" "}
                      {plantName}.
                    </AlertDescription>
                  </Alert>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">
                      Detected Issues
                    </h3>
                    <div className="space-y-2">
                      {healthIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <div className="flex items-center gap-3">
                            {getIssueIcon(issue.name)}
                            <div>
                              <h4 className="text-sm font-medium">
                                {issue.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {issue.description}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={getSeverityColor(issue.severity)}
                          >
                            {issue.severity} severity
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-4" onClick={handleAnalyze}>
                    Re-analyze Plant
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="mb-2 -ml-2 text-sm"
                onClick={() => setSelectedIssue(null)}
              >
                ← Back to all issues
              </Button>

              <div className="flex items-center gap-2 mb-2">
                {getIssueIcon(selectedIssue.name)}
                <h3 className="text-lg font-semibold">{selectedIssue.name}</h3>
                <Badge
                  variant="outline"
                  className={getSeverityColor(selectedIssue.severity)}
                >
                  {selectedIssue.severity} severity
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {selectedIssue.description}
              </p>

              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    Symptoms
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {selectedIssue.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Scissors className="h-4 w-4 text-blue-500" />
                    Treatment
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {selectedIssue.treatment.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    Prevention
                  </h4>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    {selectedIssue.preventionTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Based on visual analysis of leaf patterns and discoloration
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlantHealthDiagnosis;
