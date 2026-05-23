import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { generateJSON } from "@/lib/ai/gemini";
import { buildKeywordsPrompt } from "@/lib/ai/prompts/keywords";
import type { KeywordsSEOOutput } from "@/types";

const schema = z.object({
  productName: z.string().min(1),
  niche: z.string().min(1),
  targetAudience: z.string().min(1),
  competitors: z.string().optional().default(""),
});

export async function POST(req: Request) {
  const authUser = await getAuthUser();

  try {
    const input = schema.parse(await req.json());
    const result = await generateJSON<KeywordsSEOOutput>(buildKeywordsPrompt(input));
    return NextResponse.json(result);
  } catch (e) {
    console.error("Keywords generation error:", e);
    const message = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
