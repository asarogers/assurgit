"use client";

import { Badge }   from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DenyCounter({ deniesLeft }: { deniesLeft: number }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge
          variant={deniesLeft === 0 ? "destructive" : "outline"}
          className="cursor-default"
        >
          {deniesLeft === 0
            ? "No denials remaining"
            : `${deniesLeft} denial${deniesLeft !== 1 ? "s" : ""} remaining`}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        Denying a card notifies the owner to send a revised transcript.
      </TooltipContent>
    </Tooltip>
  );
}
