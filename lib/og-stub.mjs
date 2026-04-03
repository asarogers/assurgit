// Stub for @vercel/og edge runtime.
// This project has no opengraph-image routes, so OG image generation is not needed.
// Replacing with a stub removes ~2.2 MB (resvg.wasm + yoga.wasm + JS) from the worker bundle.
export class ImageResponse {
  constructor() {
    throw new Error("OG image generation is not supported in this deployment.");
  }
}
export default { ImageResponse };
