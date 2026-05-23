export type GenerationType =
  | "landing"
  | "programmatic"
  | "blog"
  | "metadata"
  | "keywords";

export interface LandingSEOOutput {
  seoScore: number;
  headlines: { text: string; type: string }[];
  titleTags: { text: string; chars: number }[];
  metaDescriptions: { text: string; chars: number }[];
  ctas: { text: string; placement: string }[];
  featurePageCopy: {
    feature: string;
    headline: string;
    description: string;
    keyword: string;
  }[];
  pageStructure: {
    sections: { name: string; purpose: string; h2: string; keywords: string[] }[];
    recommendedWordCount: number;
  };
  tips: string[];
}

export interface ProgrammaticSEOOutput {
  comparisonPages: {
    title: string;
    slug: string;
    angle: string;
    targetKeyword: string;
    outline: string[];
  }[];
  listiclePages: {
    title: string;
    slug: string;
    angle: string;
    targetKeyword: string;
    items: string[];
  }[];
  integrationPages: {
    title: string;
    slug: string;
    integration: string;
    valueProp: string;
  }[];
  useCasePages: {
    title: string;
    slug: string;
    audience: string;
    painPoint: string;
    solution: string;
  }[];
  templates: {
    name: string;
    urlPattern: string;
    variables: string[];
    example: string;
  }[];
  scalabilityScore: number;
  priorityOrder: string[];
}

export interface BlogSEOOutput {
  ideas: {
    title: string;
    slug: string;
    funnel: "TOFU" | "MOFU" | "BOFU";
    searchIntent: string;
    difficulty: string;
    targetKeyword: string;
    angle: string;
    outline: { heading: string; points: string[] }[];
    intro: string;
    estimatedTraffic: string;
  }[];
  keywordClusters: { cluster: string; keywords: string[]; intent: string }[];
  contentCalendar: { week: number; topic: string; funnel: string }[];
}

export interface MetadataSEOOutput {
  seoTitles: { text: string; chars: number; score: number }[];
  metaDescriptions: { text: string; chars: number; score: number }[];
  ogDescriptions: { text: string; chars: number }[];
  twitterCards: { text: string; chars: number }[];
  schema: {
    type: string;
    suggestions: { property: string; value: string; note: string }[];
  };
  bestPick: { title: string; meta: string; og: string; twitter: string };
}

export interface KeywordsSEOOutput {
  keywords: {
    keyword: string;
    competition: string;
    intent: string;
    relevance: number;
    suggestedPage: string;
  }[];
  clusters: {
    name: string;
    theme: string;
    keywords: string[];
    contentType: string;
    priority: string;
  }[];
  quickWins: string[];
  longTerm: string[];
}

export interface SwipeItem {
  id: string;
  category: SwipeCategory;
  title: string;
  content: string;
  tags: string[];
  formula?: string;
}

export type SwipeCategory =
  | "titles"
  | "meta"
  | "comparisons"
  | "structures"
  | "ctas";
