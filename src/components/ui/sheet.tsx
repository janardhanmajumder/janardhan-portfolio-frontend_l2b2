"use client"

import * as React from "react"
import { Drawer as MTDrawer } from "@material-tailwind/react"
import { cn } from "@/lib/utils"

// Cast to any to prevent strict type validation issues with material-tailwind props in TSX
const MTDrawerAny = MTDrawer as any;

interface SheetContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextType | undefined>(undefined);

export interface SheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Sheet = ({ children, open: controlledOpen, onOpenChange }: SheetProps) => {
  const [localOpen, setLocalOpen] = React.useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : localOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setLocalOpen(nextOpen);
      }
      if (onOpenChange) {
        onOpenChange(nextOpen);
      }
    },
    [controlledOpen, onOpenChange]
  );

  return (
    <SheetContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

export interface SheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const SheetTrigger = ({ children }: SheetTriggerProps) => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("SheetTrigger must be used within a Sheet component");
  }

  return (
    <div className="cursor-pointer inline-block" onClick={() => context.onOpenChange(true)}>
      {children}
    </div>
  );
};

export interface SheetContentProps {
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
  children: React.ReactNode;
}

export const SheetContent = ({
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("SheetContent must be used within a Sheet component");
  }

  return (
    <MTDrawerAny
      open={context.open}
      onClose={() => context.onOpenChange(false)}
      placement={side}
      className={cn("bg-zinc-950/95 p-0 text-white border-r border-zinc-800/60 overflow-y-auto", className)}
      {...props}
    >
      <div className="relative w-full h-full">
        {children}
      </div>
    </MTDrawerAny>
  );
};

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

export const SheetTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold text-white", className)} {...props} />
)
SheetTitle.displayName = "SheetTitle"

export const SheetDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-zinc-400", className)} {...props} />
)
SheetDescription.displayName = "SheetDescription"

export const SheetClose = ({ children }: { children: React.ReactNode }) => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error("SheetClose must be used within a Sheet component");
  }

  return (
    <div className="cursor-pointer" onClick={() => context.onOpenChange(false)}>
      {children}
    </div>
  );
};
