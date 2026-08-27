export type CategoryType = 
  | 'all' 
  | 'energy' 
  | 'tech' 
  | 'governance' 
  | 'supply_chain' 
  | 'gaming' 
  | 'entertainment' 
  | 'macro_finance';

export type PolicyStatus = 'active' | 'shifting' | 'reversing' | 'investigating';

export interface TrackerItem {
  id: string;
  date: string;
  institution: string;
  institutionEn?: string;
  institutionType: 'Asset Manager' | 'Regulatory Body' | 'Rating Agency' | 'Consulting / Index' | 'Corporation';
  category: CategoryType;
  title: string;
  titleEn?: string;
  summary: string[];
  summaryEn?: string[];
  
  // 3つの核心要素
  primaryPolicy: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    keyPoints: string[];
    keyPointsEn?: string[];
  };
  capitalIncentive: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    financialRationale: string;
    financialRationaleEn?: string;
  };
  industryImpact: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    marketReaction: string;
    marketReactionEn?: string;
    caseStudy?: {
      target: string;
      outcome: string;
      outcomeEn?: string;
    };
  };

  status: PolicyStatus;
  statusLabel: string;
  statusLabelEn?: string;
  sourceName: string;
  sourceType: string;
  sourceUrl?: string;
  tags: string[];
  tagsEn?: string[];
  involvedCompanies: string[];
  impactScore: number; // 1-100
}

// 今現在、最も資金が流入しているセクターのデータ型
export interface CurrentInflowSector {
  id: string;
  rank: number;
  name: string;
  nameEn: string;
  inflowAmount: string;
  inflowAmountEn?: string;
  inflowGrowth: string;
  inflowGrowthEn?: string;
  growthNum: number;
  shareRatio: number;
  description: string;
  descriptionEn?: string;
  drivingForce: string;
  drivingForceEn?: string;
  topTargetStocks: {
    ticker: string;
    name: string;
    nameEn?: string;
    weight: string;
  }[];
  dominantBuyers: string[];
  dominantBuyersEn?: string[];
}

export interface FlowNode {
  id: string;
  label: string;
  labelEn?: string;
  role: string;
  roleEn?: string;
  motivation: string;
  motivationEn?: string;
  example: string;
  exampleEn?: string;
}

export interface HoldingStock {
  ticker: string;
  name: string;
  nameEn?: string;
  stakeRatio: string;
  sector: string;
  sectorEn?: string;
}

export interface AssetManagerProfile {
  rank: number;
  id: string;
  name: string;
  nameEn?: string;
  country: string;
  countryEn?: string;
  headquarters: string;
  headquartersEn?: string;
  aum: string;
  aumEn?: string;
  aumNum: number;
  type: 'Index / Passive Giant' | 'Active / Multi-Asset' | 'Sovereign Wealth / Pension' | 'European ESG Leader';
  majorHoldings: HoldingStock[];
  coreDemands: {
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    enforcement: string;
    enforcementEn?: string;
  }[];
  votingStyle: string;
  votingStyleEn?: string;
  recentShift: string;
  recentShiftEn?: string;
}
