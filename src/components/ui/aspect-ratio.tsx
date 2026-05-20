"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = ({ ratio = 1, className, children, ...props }: AspectRatioProps) => {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full">
        {children}
      </div>
    </div>
  );
};
