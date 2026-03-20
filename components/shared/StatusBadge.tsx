"use client";

import { Badge } from "@/components/ui/badge";

type Status = "waiting" | "approved" | "denied";

const variants: Record<Status, "secondary" | "default" | "destructive"> = {
  waiting:  "secondary",
  approved: "default",
  denied:   "destructive",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant={variants[status]} className="capitalize">
      {status}
    </Badge>
  );
}
