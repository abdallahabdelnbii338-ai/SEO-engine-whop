export function buildLandingPrompt(input: {
  startupName: string;
  description: string;
  targetAudience: string;
  targetKeyword: string;
  competitors: string;
}) {
  return `Generate comprehensive landing page SEO for this SaaS startup.

Startup: ${input.startupName}
Description: ${input.description}
Target Audience: ${input.targetAudience}
Primary Keyword: ${input.targetKeyword}
Competitors: ${input.competitors || "None specified"}

Return JSON with this exact structure:
{
  "seoScore": number (0-100),
  "headlines": [{ "text": string, "type": "hero" | "subhead" | "h2" }],
  "titleTags": [{ "text": string, "chars": number }],
  "metaDescriptions": [{ "text": string, "chars": number }],
  "ctas": [{ "text": string, "placement": string }],
  "featurePageCopy": [{ "feature": string, "headline": string, "description": string, "keyword": string }],
  "pageStructure": {
    "sections": [{ "name": string, "purpose": string, "h2": string, "keywords": string[] }],
    "recommendedWordCount": number
  },
  "tips": string[]
}`;
}
