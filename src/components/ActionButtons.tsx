"use client";

import React from "react";
import { Button } from "./ui/button";
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
        "flex flex-wrap gap-2 justify-between w-full bg-background",
        className,
      )}
    >
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center gap-1 h-8"
        >
          <BookmarkPlus className="h-3.5 w-3.5" />
          <span>Save</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          className="flex items-center gap-1 h-8"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onIdentifyAnother}
          className="flex items-center gap-1 h-8"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>New Scan</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onViewMoreDetails}
          className="flex items-center gap-1 h-8"
        >
          <Info className="h-3.5 w-3.5" />
          <span>Details</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
