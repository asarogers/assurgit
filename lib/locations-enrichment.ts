export interface LocationEnrichment {
  hospitals: string[];
  seniorCenters: string[];
  landmarks: string[];
  localParagraph: string;
}

// Optional location enrichment data. Empty by default for Assurgit.
// Populate per-city if you want extra hyperlocal trust signals on /locations/<city>.
export const locationEnrichments: Record<string, LocationEnrichment> = {};
