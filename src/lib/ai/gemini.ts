import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Models that support generateContent for this API (v1beta).
 * gemini-1.5-* is deprecated — do not use.
 */
const FALLBACK_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-2.5-flash",
  "gemini-3.1-flash-lite",
];

function resolveModels(): string[] {
  const preferred = process.env.GEMINI_MODEL?.trim();
  const chain = preferred ? [preferred, ...FALLBACK_MODELS] : FALLBACK_MODELS;
  return [...new Set(chain)];
}

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Add it to .env.local");
  }
  return new GoogleGenerativeAI(apiKey);
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isRateLimitError(error: unknown): boolean {
  const message = getErrorMessage(error);
  return message.includes("429") || message.toLowerCase().includes("quota");
}

function isModelUnavailableError(error: unknown): boolean {
  const message = getErrorMessage(error);
  return (
    message.includes("404") ||
    message.toLowerCase().includes("not found") ||
    message.toLowerCase().includes("not supported")
  );
}

function shouldTryNextModel(error: unknown): boolean {
  return isRateLimitError(error) || isModelUnavailableError(error);
}

function parseGeminiError(error: unknown): Error {
  const message = getErrorMessage(error);

  if (isRateLimitError(error)) {
    const retryMatch = message.match(/retry in ([\d.]+)s/i);
    const waitHint = retryMatch
      ? ` Try again in ~${Math.ceil(parseFloat(retryMatch[1]))} seconds.`
      : " Wait a minute and try again.";

    return new Error(
      `Gemini API rate limit reached.${waitHint} Create a new key at https://aistudio.google.com/apikey or set GEMINI_MODEL=gemini-2.5-flash-lite in .env.local.`
    );
  }

  if (message.includes("API key")) {
    return new Error("Invalid Gemini API key. Check GEMINI_API_KEY in .env.local");
  }

  return error instanceof Error ? error : new Error(message);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithModel(
  modelName: string,
  prompt: string,
  systemInstruction: string,
  jsonMode: boolean
): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      ...(jsonMode ? { responseMimeType: "application/json" } : {}),
    },
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateWithFallback(
  prompt: string,
  systemInstruction: string,
  jsonMode: boolean
): Promise<string> {
  const models = resolveModels();
  let lastError: unknown;

  for (let i = 0; i < models.length; i++) {
    const modelName = models[i];
    try {
      return await generateWithModel(modelName, prompt, systemInstruction, jsonMode);
    } catch (error) {
      lastError = error;
      const hasNext = i < models.length - 1;
      if (shouldTryNextModel(error) && hasNext) {
        console.warn(`[LaunchOS] Gemini model "${modelName}" failed, trying "${models[i + 1]}"...`);
        await sleep(1200);
        continue;
      }
      break;
    }
  }

  throw parseGeminiError(lastError);
}

export async function generateJSON<T>(prompt: string, systemInstruction?: string): Promise<T> {
  const text = await generateWithFallback(
    prompt,
    systemInstruction ?? DEFAULT_SYSTEM,
    true
  );
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error("Failed to parse AI response as JSON");
  }
}

export async function generateText(prompt: string, systemInstruction?: string): Promise<string> {
  return generateWithFallback(prompt, systemInstruction ?? DEFAULT_SYSTEM, false);
}

const DEFAULT_SYSTEM = `You are LaunchOS, an elite SEO strategist built for SaaS founders, indie hackers, and AI startups.
Write like a sharp startup marketer — clear, conversion-focused, modern. Never robotic.
Prioritize speed-to-value, founder-friendly language, and actionable SEO outputs.
Always return valid JSON when asked. No markdown fences in JSON responses.`;
