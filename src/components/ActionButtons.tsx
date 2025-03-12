"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { BookmarkPlus, Share2, RefreshCw, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  onSave?: () => void;
  onShare?: () => void;
  onIdentifyAnother?: () => void;
  onViewMoreDetails?: () => void;
  className?: string;
}

const ActionButtons = ({
  onSave = () => console.log("Save to collection"),
  onShare = () => console.log("Share"),
  onIdentifyAnother = () => console.log("Identify another plant"),
  onViewMoreDetails = () => console.log("View more details"),
  className,
}: ActionButtonsProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 justify-between w-full bg-background p-2",
        className,
      )}
    >
      <TooltipProvider>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onSave}
                className="flex items-center gap-1"
              >
                <BookmarkPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save to your collection</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                className="flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this plant</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                onClick={onIdentifyAnother}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">New Scan</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Identify another plant</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                onClick={onViewMoreDetails}
                className="flex items-center gap-1"
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Details</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View more plant details</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ActionButtons;
