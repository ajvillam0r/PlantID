"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Camera, Upload, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Motion, MotionGroup } from "./ui/motion";

interface ImageInputProps {
  onImageCapture?: (image: File) => void;
  onImageSelect?: (image: File) => void;
  onConfirm?: (image: File) => void;
  onCancel?: () => void;
}

const ImageInput = ({
  onImageCapture = () => console.log("Image captured"),
  onImageSelect = () => console.log("Image selected"),
  onConfirm = () => console.log("Image confirmed"),
  onCancel = () => console.log("Cancelled"),
}: ImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      onImageSelect(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    // In a real implementation, this would use the device camera
    // For this scaffold, we'll just trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleGalleryUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onConfirm(selectedImage);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    onCancel();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center">
      {!previewUrl ? (
        <>
          <Motion type="slide-down" duration={500}>
            <h3 className="text-xl font-semibold mb-6 text-center">
              Identify Your Plant
            </h3>
          </Motion>
          <Motion type="fade" delay={200} duration={500}>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Take a photo or upload an image of a plant to identify it and get
              care information.
            </p>
          </Motion>

          <Motion type="slide-up" delay={400} duration={500}>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleCameraCapture}
                      className="flex items-center gap-2 w-full sm:w-auto animate-pulse-slow"
                    >
                      <Camera className="h-5 w-5" />
                      Take Photo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use your camera to take a photo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={handleGalleryUpload}
                      className="flex items-center gap-2 w-full sm:w-auto"
                    >
                      <Upload className="h-5 w-5" />
                      Upload Image
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select an image from your gallery</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Motion>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          <Motion type="fade" delay={600} duration={500}>
            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>For best results:</p>
              <MotionGroup
                staggerDelay={100}
                initialDelay={100}
                type="slide-left"
              >
                <ul className="list-disc text-left ml-6 mt-2">
                  <li>Ensure good lighting</li>
                  <li>Focus on leaves and flowers</li>
                  <li>Avoid blurry images</li>
                </ul>
              </MotionGroup>
            </div>
          </Motion>
        </>
      ) : (
        <>
          <Motion type="slide-down" duration={400}>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Confirm Image
            </h3>
          </Motion>

          <Motion type="scale" delay={200} duration={500}>
            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Plant preview"
                className="w-full h-full object-cover"
              />
            </div>
          </Motion>

          <Motion type="slide-up" delay={400} duration={400}>
            <div className="flex gap-4 w-full justify-center">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>

              <Button
                onClick={handleConfirm}
                className="flex items-center gap-2 animate-pulse-slow"
              >
                <Check className="h-4 w-4" />
                Confirm
              </Button>
            </div>
          </Motion>
        </>
      )}
    </div>
  );
};

export default ImageInput;
