import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { InfoIcon } from "lucide-react"

interface TooltipIconProps {
  content: string
  className?: string
}

export function TooltipIcon({ content, className }: TooltipIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className={cn("h-5 w-5 text-neutral-400", className)} />
        </TooltipTrigger>
        <TooltipContent className="max-w-[220px] text-xs">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
