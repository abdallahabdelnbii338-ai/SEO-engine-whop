import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { generateJSON } from "@/lib/ai/gemini";
import { buildLandingPrompt } from "@/lib/ai/prompts/landing";
import type { LandingSEOOutput } from "@/types";

const schema = z.object({
  startupName: z.string().min(1),
  description: z.string().min(1),
  targetAudience: z.string().min(1),
  targetKeyword: z.string().min(1),
  competitors: z.string().optional().default(""),
});

export async function POST(req: Request) {
  const authUser = await getAuthUser();
  if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const input = schema.parse(await req.json());
    const result = await generateJSON<LandingSEOOutput>(buildLandingPrompt(input));
    return NextResponse.json(result);
  } catch (e) {
    console.error("Landing SEO generation error:", e);
    const message = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
