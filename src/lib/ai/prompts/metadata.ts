export function buildMetadataPrompt(input: {
  pageName: string;
  pageType: string;
  description: string;
  targetKeyword: string;
  brandVoice: string;
}) {
  return `Generate optimized metadata for a SaaS page.

Page: ${input.pageName}
Type: ${input.pageType}
Description: ${input.description}
Keyword: ${input.targetKeyword}
Brand Voice: ${input.brandVoice || "modern, confident, founder-friendly"}

Return JSON:
{
  "seoTitles": [{ "text": string, "chars": number, "score": number }],
  "metaDescriptions": [{ "text": string, "chars": number, "score": number }],
  "ogDescriptions": [{ "text": string, "chars": number }],
  "twitterCards": [{ "text": string, "chars": number }],
  "schema": {
    "type": string,
    "suggestions": [{ "property": string, "value": string, "note": string }]
  },
  "bestPick": { "title": string, "meta": string, "og": string, "twitter": string }
}`;
}
