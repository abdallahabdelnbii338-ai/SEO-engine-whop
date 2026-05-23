export function buildKeywordsPrompt(input: {
  productName: string;
  niche: string;
  targetAudience: string;
  competitors: string;
}) {
  return `Generate a lightweight keyword strategy for a SaaS startup. Keep it actionable — NOT enterprise SEO.

Product: ${input.productName}
Niche: ${input.niche}
Audience: ${input.targetAudience}
Competitors: ${input.competitors || "N/A"}

Return JSON:
{
  "keywords": [{
    "keyword": string,
    "competition": "low" | "medium" | "high",
    "intent": "informational" | "navigational" | "commercial" | "transactional",
    "relevance": number,
    "suggestedPage": string
  }],
  "clusters": [{
    "name": string,
    "theme": string,
    "keywords": string[],
    "contentType": string,
    "priority": "high" | "medium" | "low"
  }],
  "quickWins": string[],
  "longTerm": string[]
}`;
}
