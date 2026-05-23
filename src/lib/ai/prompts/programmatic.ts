export function buildProgrammaticPrompt(input: {
  productName: string;
  category: string;
  competitors: string;
  useCases: string;
  integrations: string;
}) {
  return `Generate programmatic SEO page ideas for a SaaS product.

Product: ${input.productName}
Category: ${input.category}
Competitors: ${input.competitors || "N/A"}
Use Cases: ${input.useCases || "N/A"}
Integrations: ${input.integrations || "N/A"}

Return JSON:
{
  "comparisonPages": [{ "title": string, "slug": string, "angle": string, "targetKeyword": string, "outline": string[] }],
  "listiclePages": [{ "title": string, "slug": string, "angle": string, "targetKeyword": string, "items": string[] }],
  "integrationPages": [{ "title": string, "slug": string, "integration": string, "valueProp": string }],
  "useCasePages": [{ "title": string, "slug": string, "audience": string, "painPoint": string, "solution": string }],
  "templates": [{ "name": string, "urlPattern": string, "variables": string[], "example": string }],
  "scalabilityScore": number,
  "priorityOrder": string[]
}`;
}
