"use client";

import * as React from "react";
import {
  Tabs as OriginalMTTabs,
  TabsHeader as OriginalMTTabsList,
  Tab as OriginalMTTabsTrigger,
  TabPanel as OriginalMTTabsContent,
  TabsBody as OriginalMTTabsBody
} from "@material-tailwind/react";
import { cn } from "@/lib/utils";

const MTTabs = OriginalMTTabs as any;
const MTTabsList = OriginalMTTabsList as any;
const MTTabsTrigger = OriginalMTTabsTrigger as any;
const MTTabsContent = OriginalMTTabsContent as any;
const MTTabsBody = OriginalMTTabsBody as any;

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  activeValue: string;
  onValueChange: (value: string) => void;
}>({ activeValue: "", onValueChange: () => {} });

export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) => {
  const [localValue, setLocalValue] = React.useState(defaultValue || "");
  const activeValue = controlledValue !== undefined ? controlledValue : localValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setLocalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [controlledValue, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeValue, onValueChange: handleValueChange }}>
      <MTTabs
        value={activeValue}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </MTTabs>
    </TabsContext.Provider>
  );
};

export interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export const TabsList = ({ className, children, ...props }: TabsListProps) => {
  return (
    <MTTabsList
      className={cn("bg-zinc-950/60 border border-zinc-800/60 p-1.5 rounded-full w-fit max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", className)}
      indicatorProps={{
        className: "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-sm rounded-full",
      }}
      {...props}
    >
      {children}
    </MTTabsList>
  );
};

export interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

export const TabsTrigger = ({
  value,
  className,
  children,
  onClick,
  ...props
}: TabsTriggerProps) => {
  const { activeValue, onValueChange } = React.useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <MTTabsTrigger
      value={value}
      onClick={(e: React.MouseEvent) => {
        onValueChange(value);
        if (onClick) onClick(e);
      }}
      className={cn(
        "rounded-full px-5 py-2 text-xs md:text-sm uppercase tracking-wider font-heading font-semibold transition-all duration-300 whitespace-nowrap",
        isActive ? "text-black" : "text-zinc-400",
        className
      )}
      {...props}
    >
      {children}
    </MTTabsTrigger>
  );
};

export interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const TabsContent = ({
  value,
  className,
  children,
  ...props
}: TabsContentProps) => {
  return (
    <MTTabsBody className="overflow-visible">
      <MTTabsContent
        value={value}
        className={cn("p-0 text-inherit overflow-visible", className)}
        {...props}
      >
        {children}
      </MTTabsContent>
    </MTTabsBody>
  );
};
