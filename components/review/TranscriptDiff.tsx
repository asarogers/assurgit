"use client";

import { useState } from "react";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  v1: string;
  v2: string;
}

export function TranscriptDiff({ v1, v2 }: Props) {
  const [showingRevised, setShowingRevised] = useState(true);

  const current = showingRevised ? v2 : v1;
  const label   = showingRevised ? "Revised" : "Original";

  return (
    <div className="space-y-1.5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Transcript</span>
        <div className="flex items-center gap-1.5">
          <Badge
            variant={showingRevised ? "default" : "secondary"}
            className="text-xs"
          >
            {label}
          </Badge>
          <div className="flex items-center rounded-md border overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-none border-r"
              disabled={!showingRevised}
              onClick={() => setShowingRevised(false)}
              title="View original"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-none"
              disabled={showingRevised}
              onClick={() => setShowingRevised(true)}
              title="View revised"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Transcript text — whitespace-pre-wrap preserves line breaks and spaces */}
      <div className={`rounded-lg px-3 py-2.5 text-sm leading-relaxed whitespace-pre-wrap transition-colors ${
        showingRevised
          ? "bg-primary/5 border border-primary/20 text-foreground"
          : "bg-muted/60 border border-border text-muted-foreground"
      }`}>
        {current}
      </div>
    </div>
  );
}
