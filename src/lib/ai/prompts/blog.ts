export function buildBlogPrompt(input: {
  productName: string;
  niche: string;
  targetAudience: string;
  seedKeywords: string;
}) {
  return `Generate SaaS blog content strategy.

Product: ${input.productName}
Niche: ${input.niche}
Audience: ${input.targetAudience}
Seed Keywords: ${input.seedKeywords || "general SaaS keywords"}

Return JSON:
{
  "ideas": [{
    "title": string,
    "slug": string,
    "funnel": "TOFU" | "MOFU" | "BOFU",
    "searchIntent": "informational" | "navigational" | "commercial" | "transactional",
    "difficulty": "low" | "medium" | "high",
    "targetKeyword": string,
    "angle": string,
    "outline": [{ "heading": string, "points": string[] }],
    "intro": string,
    "estimatedTraffic": "low" | "medium" | "high"
  }],
  "keywordClusters": [{ "cluster": string, "keywords": string[], "intent": string }],
  "contentCalendar": [{ "week": number, "topic": string, "funnel": string }]
}`;
}
