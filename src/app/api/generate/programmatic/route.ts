import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { generateJSON } from "@/lib/ai/gemini";
import { buildProgrammaticPrompt } from "@/lib/ai/prompts/programmatic";
import type { ProgrammaticSEOOutput } from "@/types";

const schema = z.object({
  productName: z.string().min(1),
  category: z.string().min(1),
  competitors: z.string().optional().default(""),
  useCases: z.string().optional().default(""),
  integrations: z.string().optional().default(""),
});

export async function POST(req: Request) {
  const authUser = await getAuthUser();

  try {
    const input = schema.parse(await req.json());
    const result = await generateJSON<ProgrammaticSEOOutput>(buildProgrammaticPrompt(input));
    return NextResponse.json(result);
  } catch (e) {
    console.error("Programmatic SEO generation error:", e);
    const message = e instanceof Error ? e.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
