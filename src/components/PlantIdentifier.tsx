"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { X, AlertCircle, MessageSquare, Flower, Calendar } from "lucide-react";
import ImageInput from "./ImageInput";
import LoadingState from "./LoadingState";
import PlantResults from "./PlantResults";
import ErrorMessage from "./ErrorMessage";
import RarePlantAlerts from "./RarePlantAlerts";
import PlantHealthDiagnosis from "./PlantHealthDiagnosis";
import PlantVoiceAssistant from "./PlantVoiceAssistant";
import PlantCompatibilityChecker from "./PlantCompatibilityChecker";
import SeasonalCareAdjustments from "./SeasonalCareAdjustments";
import { Motion, MotionGroup } from "./ui/motion";

type IdentificationState = "input" | "loading" | "results" | "error";

interface PlantIdentifierProps {
  className?: string;
  initialState?: IdentificationState;
}

const PlantIdentifier = ({
  className,
  initialState = "input",
}: PlantIdentifierProps) => {
  const [state, setState] = useState<IdentificationState>(initialState);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);

  const handleImageCapture = (image: File) => {
    setSelectedImage(image);
  };

  const handleImageSelect = (image: File) => {
    setSelectedImage(image);
  };

  const handleConfirm = async (image: File) => {
    setSelectedImage(image);
    setState("loading");

    try {
      // Create a FormData object to send the image
      const formData = new FormData();
      formData.append("image", image);

      // Send the image to our API route
      const response = await fetch("/api/identify-plant", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to identify plant");
      }

      const data = await response.json();

      setIdentifiedPlant({
        plantName: data.plantName,
        scientificName: data.scientificName,
        imageUrl: URL.createObjectURL(image),
        confidence: data.confidence || 95,
        details: data.details || [
          { label: "Family", value: "Araceae" },
          { label: "Origin", value: "Southern Mexico & Panama" },
          { label: "Growth Rate", value: "Moderate to fast" },
          { label: "Toxicity", value: "Toxic to pets" },
        ],
        tags: data.tags || ["Tropical", "Indoor", "Air Purifying"],
        careInstructions: data.careInstructions,
      });
      setState("results");
    } catch (error) {
      console.error("Error identifying plant:", error);
      setState("error");
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setState("input");
  };

  const handleTryAgain = () => {
    setState("input");
    setSelectedImage(null);
  };

  const handleIdentifyAnother = () => {
    setState("input");
    setSelectedImage(null);
    setIdentifiedPlant(null);
  };

  const [showRareAlerts, setShowRareAlerts] = useState(false);
  const [showHealthDiagnosis, setShowHealthDiagnosis] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showCompatibilityChecker, setShowCompatibilityChecker] =
    useState(false);
  const [showSeasonalCare, setShowSeasonalCare] = useState(false);

  const resetAllViews = () => {
    setShowRareAlerts(false);
    setShowHealthDiagnosis(false);
    setShowVoiceAssistant(false);
    setShowCompatibilityChecker(false);
    setShowSeasonalCare(false);
  };

  const handleAddToRareAlerts = () => {
    resetAllViews();
    setShowRareAlerts(true);
  };

  const handleCloseRareAlerts = () => {
    setShowRareAlerts(false);
  };

  const handleShowHealthDiagnosis = () => {
    resetAllViews();
    setShowHealthDiagnosis(true);
  };

  const handleCloseHealthDiagnosis = () => {
    setShowHealthDiagnosis(false);
  };

  const handleShowVoiceAssistant = () => {
    resetAllViews();
    setShowVoiceAssistant(true);
  };

  const handleCloseVoiceAssistant = () => {
    setShowVoiceAssistant(false);
  };

  const handleShowCompatibilityChecker = () => {
    resetAllViews();
    setShowCompatibilityChecker(true);
  };

  const handleCloseCompatibilityChecker = () => {
    setShowCompatibilityChecker(false);
  };

  const handleShowSeasonalCare = () => {
    resetAllViews();
    setShowSeasonalCare(true);
  };

  const handleCloseSeasonalCare = () => {
    setShowSeasonalCare(false);
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden",
        className,
      )}
    >
      {showRareAlerts ? (
        <Motion type="slide-up" duration={400}>
          <div className="relative">
            <RarePlantAlerts />
            <Button
              className="absolute top-2 right-2 z-10"
              variant="ghost"
              size="sm"
              onClick={handleCloseRareAlerts}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Motion>
      ) : showHealthDiagnosis ? (
        <Motion type="slide-up" duration={400}>
          <div className="relative">
            <PlantHealthDiagnosis
              plantName={identifiedPlant?.plantName}
              imageUrl={identifiedPlant?.imageUrl}
            />
            <Button
              className="absolute top-2 right-2 z-10"
              variant="ghost"
              size="sm"
              onClick={handleCloseHealthDiagnosis}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Motion>
      ) : showVoiceAssistant ? (
        <Motion type="slide-up" duration={400}>
          <div className="relative">
            <PlantVoiceAssistant plantName={identifiedPlant?.plantName} />
            <Button
              className="absolute top-2 right-2 z-10"
              variant="ghost"
              size="sm"
              onClick={handleCloseVoiceAssistant}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Motion>
      ) : showCompatibilityChecker ? (
        <Motion type="slide-up" duration={400}>
          <div className="relative">
            <PlantCompatibilityChecker
              currentPlant={identifiedPlant?.plantName}
            />
            <Button
              className="absolute top-2 right-2 z-10"
              variant="ghost"
              size="sm"
              onClick={handleCloseCompatibilityChecker}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Motion>
      ) : showSeasonalCare ? (
        <Motion type="slide-up" duration={400}>
          <div className="relative">
            <SeasonalCareAdjustments plantName={identifiedPlant?.plantName} />
            <Button
              className="absolute top-2 right-2 z-10"
              variant="ghost"
              size="sm"
              onClick={handleCloseSeasonalCare}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Motion>
      ) : (
        <>
          {state === "input" && (
            <Motion type="fade" duration={400}>
              <ImageInput
                onImageCapture={handleImageCapture}
                onImageSelect={handleImageSelect}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            </Motion>
          )}

          {state === "loading" && (
            <Motion type="fade" duration={300}>
              <LoadingState
                message="Identifying your plant..."
                showSpinner={true}
              />
            </Motion>
          )}

          {state === "results" && identifiedPlant && (
            <>
              <Motion type="slide-up" duration={500}>
                <PlantResults
                  plantName={identifiedPlant.plantName}
                  scientificName={identifiedPlant.scientificName}
                  imageUrl={identifiedPlant.imageUrl}
                  confidence={identifiedPlant.confidence}
                  details={identifiedPlant.details}
                  tags={
                    identifiedPlant.tags
                      ? [...identifiedPlant.tags, "Rare"]
                      : ["Rare"]
                  }
                  careInstructions={identifiedPlant.careInstructions}
                  onIdentifyAnother={handleIdentifyAnother}
                  onAddToRareAlerts={handleAddToRareAlerts}
                />
              </Motion>

              <MotionGroup
                className="mt-4 flex justify-center gap-2 flex-wrap px-4 pb-4"
                staggerDelay={150}
                initialDelay={300}
                type="scale"
                duration={400}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShowHealthDiagnosis}
                >
                  <AlertCircle className="h-3.5 w-3.5 text-yellow-500" />
                  Check Health
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShowVoiceAssistant}
                >
                  <MessageSquare className="h-3.5 w-3.5 text-green-500" />
                  Voice Assistant
                </Button>
              </MotionGroup>

              <MotionGroup
                className="mt-2 flex justify-center gap-2 flex-wrap px-4 pb-4"
                staggerDelay={150}
                initialDelay={600}
                type="scale"
                duration={400}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShowCompatibilityChecker}
                >
                  <Flower className="h-3.5 w-3.5 text-blue-500" />
                  Compatibility
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShowSeasonalCare}
                >
                  <Calendar className="h-3.5 w-3.5 text-purple-500" />
                  Seasonal Care
                </Button>
              </MotionGroup>
            </>
          )}

          {state === "error" && (
            <Motion type="fade" duration={400}>
              <ErrorMessage
                title="Identification Failed"
                message="We couldn't identify this plant. Please try again with a clearer image or from a different angle."
                onTryAgain={handleTryAgain}
                showTryAgainButton={true}
              />
            </Motion>
          )}
        </>
      )}
    </div>
  );
};

export default PlantIdentifier;
