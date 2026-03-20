import Anthropic from "@anthropic-ai/sdk";

export const runtime = "edge";

const systemPrompt = `You are an expert video content strategist specializing in short-form video hooks for business creators. You write hooks that stop the scroll, communicate value instantly, and match the specific tone and format of each platform.

A hook is the first 1-3 sentences of a video script — the opening that appears on screen or is spoken immediately. Great hooks create pattern interrupts, promise a specific outcome, or trigger curiosity.

Return ONLY valid JSON — no explanation, no markdown, no code fences.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { niche, topic, platform } = body;

    if (!niche || !topic || !platform) {
      return Response.json(
        { error: "niche, topic, and platform are required" },
        { status: 400 }
      );
    }

    if (typeof topic !== "string" || topic.trim() === "") {
      return Response.json(
        { error: "topic must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: "ANTHROPIC_API_KEY is not configured on this server" },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const userPrompt = `Write 8 video hooks for a ${niche} creator posting on ${platform}.

Topic: "${topic.trim()}"

Return exactly this JSON structure:
{
  "hooks": [
    { "style": "Curiosity", "text": "..." },
    { "style": "Authority", "text": "..." },
    { "style": "Pain Point", "text": "..." },
    { "style": "Story", "text": "..." },
    { "style": "Data / Statistic", "text": "..." },
    { "style": "Contrarian", "text": "..." },
    { "style": "Before & After", "text": "..." },
    { "style": "Direct Challenge", "text": "..." }
  ]
}

Rules:
- Each hook is 1-3 sentences maximum
- Optimize length and tone for ${platform} (LinkedIn = professional, longer OK; TikTok/Instagram = punchy, 1-2 sentences max; YouTube = curiosity-driven, can reference "this video")
- Write in first person as the ${niche} creator
- Do not include hashtags
- Make each hook genuinely different in structure and approach
- Ground each hook specifically in the topic provided`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const data = JSON.parse(text);
    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Failed to generate hooks" },
      { status: 500 }
    );
  }
}
