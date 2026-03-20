"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast }    from "sonner";

interface Descriptions {
  descInstagram: string;
  descTiktok:    string;
  descFacebook:  string;
  descYoutube:   string;
}

interface Props {
  cardId:       string;
  token:        string;
  initial:      Descriptions;
  onUpdated:    (d: Descriptions) => void;
}

const platforms = [
  { key: "descInstagram", label: "Instagram" },
  { key: "descTiktok",    label: "TikTok"    },
  { key: "descFacebook",  label: "Facebook"  },
  { key: "descYoutube",   label: "YouTube"   },
] as const;

export function SocialDescriptions({ cardId, token, initial, onUpdated }: Props) {
  const [descs, setDescs] = useState<Descriptions>(initial);

  async function save(field: keyof Descriptions, value: string) {
    const updated = { ...descs, [field]: value };
    setDescs(updated);

    const res = await fetch(`/api/review/descriptions?token=${token}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ cardId, [field]: value }),
    });

    if (res.ok) {
      onUpdated(updated);
    } else {
      toast.error("Failed to save description");
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Social Media Descriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="descInstagram">
          <TabsList className="grid grid-cols-4 w-full h-8">
            {platforms.map(({ key, label }) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          {platforms.map(({ key, label }) => (
            <TabsContent key={key} value={key} className="mt-3">
              <Textarea
                value={descs[key]}
                onChange={(e) => setDescs({ ...descs, [key]: e.target.value })}
                onBlur={(e) => save(key, e.target.value)}
                rows={4}
                placeholder={`${label} caption…`}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
