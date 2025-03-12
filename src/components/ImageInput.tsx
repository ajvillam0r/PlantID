"use client";

import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

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
    try {
      // Check if the browser supports getUserMedia
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Stop any existing stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }

        // Get access to the camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Use the back camera if available
        });

        streamRef.current = stream;

        // Show the camera view
        setShowCamera(true);

        // Set the video source to the camera stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        // Fallback for browsers that don't support getUserMedia
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      // Fallback to file input
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to the canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a File object from the blob
              const file = new File([blob], "camera-capture.jpg", {
                type: "image/jpeg",
              });
              setSelectedImage(file);
              onImageCapture(file);

              // Create preview URL
              const imageUrl = URL.createObjectURL(blob);
              setPreviewUrl(imageUrl);

              // Stop the camera stream
              stopCamera();
            }
          },
          "image/jpeg",
          0.95,
        );
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
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
    stopCamera();
    onCancel();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
      {showCamera ? (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Take a Photo
          </h3>
          <div
            className="relative w-full overflow-hidden rounded-lg mb-4"
            style={{ aspectRatio: "4/3" }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={stopCamera}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={takePicture} className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Capture
            </Button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      ) : !previewUrl ? (
        <>
          <Motion type="slide-down" duration={500}>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Identify Your Plant
            </h3>
          </Motion>
          <Motion type="fade" delay={200} duration={500}>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center text-sm">
              Take a photo or upload an image of a plant to identify it and get
              care information.
            </p>
          </Motion>

          <Motion type="slide-up" delay={400} duration={500}>
            <div className="flex flex-col gap-3 w-full justify-center">
              <Button
                onClick={handleCameraCapture}
                className="flex items-center justify-center gap-2 w-full animate-pulse-slow"
              >
                <Camera className="h-5 w-5" />
                Take Photo
              </Button>

              <Button
                variant="outline"
                onClick={handleGalleryUpload}
                className="flex items-center justify-center gap-2 w-full"
              >
                <Upload className="h-5 w-5" />
                Upload Image
              </Button>
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
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>For best results:</p>
              <MotionGroup
                staggerDelay={100}
                initialDelay={100}
                type="slide-left"
              >
                <ul className="list-disc text-left ml-6 mt-2 text-xs">
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
            <h3 className="text-xl font-semibold mb-3 text-center">
              Confirm Image
            </h3>
          </Motion>

          <Motion type="scale" delay={200} duration={500}>
            <div
              className="relative w-full mb-4 rounded-lg overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
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
