"use client";

import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  current: number;
  total:   number;
  onPrev:  () => void;
  onNext:  () => void;
}

export function ProjectNav({ current, total, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onPrev} disabled={current === 0}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Badge variant="outline" className="px-3 py-1 text-sm">
        {current + 1} / {total}
      </Badge>
      <Button variant="ghost" size="icon" onClick={onNext} disabled={current === total - 1}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
