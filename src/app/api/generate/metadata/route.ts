import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { generateJSON } from "@/lib/ai/gemini";
import { buildMetadataPrompt } from "@/lib/ai/prompts/metadata";
import type { MetadataSEOOutput } from "@/types";

const schema = z.object({
  pageName: z.string().min(1),
  pageType: z.string().min(1),
  description: z.string().min(1),
  targetKeyword: z.string().min(1),
  brandVoice: z.string().optional().default(""),
});

export async function POST(req: Request) {
  const authUser = await getAuthUser();

  try {
    const input = schema.parse(await req.json());
    const result = await generateJSON<MetadataSEOOutput>(buildMetadataPrompt(input));
    return NextResponse.json(result);
  } catch (e) {
    console.error("Metadata generation error:", e);
    const message = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
