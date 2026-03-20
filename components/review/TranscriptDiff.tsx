"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge }    from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  v1: string;
  v2: string;
}

export function TranscriptDiff({ v1, v2 }: Props) {
  return (
    <Card className="bg-muted/40 border-dashed">
      <CardContent className="pt-4 space-y-3 text-sm">
        <div>
          <Badge variant="secondary" className="mb-1.5">Previous</Badge>
          <p className="text-muted-foreground line-through leading-relaxed">{v1}</p>
        </div>
        <Separator />
        <div>
          <Badge className="mb-1.5">Updated</Badge>
          <p className="leading-relaxed">{v2}</p>
        </div>
      </CardContent>
    </Card>
  );
}
