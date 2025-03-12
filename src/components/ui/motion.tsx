"use client";

import React from "react";
import { cn } from "@/lib/utils";

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "scale"
    | "rotate";
};

export function Motion({
  children,
  className,
  delay = 0,
  duration = 300,
  type = "fade",
}: MotionProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}ms`,
    };

    switch (type) {
      case "fade":
        return baseStyles;
      case "slide-up":
        return {
          ...baseStyles,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
        };
      case "slide-down":
        return {
          ...baseStyles,
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
        };
      case "slide-left":
        return {
          ...baseStyles,
          transform: isVisible ? "translateX(0)" : "translateX(20px)",
        };
      case "slide-right":
        return {
          ...baseStyles,
          transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        };
      case "scale":
        return {
          ...baseStyles,
          transform: isVisible ? "scale(1)" : "scale(0.95)",
        };
      case "rotate":
        return {
          ...baseStyles,
          transform: isVisible ? "rotate(0deg)" : "rotate(-5deg)",
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div className={cn(className)} style={getAnimationStyles()}>
      {children}
    </div>
  );
}

export function MotionGroup({
  children,
  className,
  staggerDelay = 100,
  initialDelay = 0,
  type = "fade",
  duration = 300,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  type?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "scale"
    | "rotate";
  duration?: number;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <Motion
          key={index}
          delay={initialDelay + index * staggerDelay}
          type={type}
          duration={duration}
        >
          {child}
        </Motion>
      ))}
    </div>
  );
}
