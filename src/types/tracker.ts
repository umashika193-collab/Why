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
  institutionType: 'Asset Manager' | 'Regulatory Body' | 'Rating Agency' | 'Consulting / Index' | 'Corporation';
  category: CategoryType;
  title: string;
  summary: string[];
  
  // 3つの核心要素
  primaryPolicy: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  capitalIncentive: {
    title: string;
    description: string;
    financialRationale: string;
  };
  industryImpact: {
    title: string;
    description: string;
    marketReaction: string;
    caseStudy?: {
      target: string;
      outcome: string;
    };
  };

  status: PolicyStatus;
  statusLabel: string;
  sourceName: string;
  sourceType: string;
  sourceUrl?: string;
  tags: string[];
  involvedCompanies: string[];
  impactScore: number; // 1-100
}

// 今現在、最も資金が流入しているセクターのデータ型
export interface CurrentInflowSector {
  id: string;
  rank: number;
  name: string;
  nameEn: string;
  inflowAmount: string;       // "$185B / 年"
  inflowGrowth: string;       // "+68% YoY"
  growthNum: number;          // 68
  shareRatio: number;         // 35 (%)
  description: string;
  drivingForce: string;       // 資金流入の主因
  topTargetStocks: {
    ticker: string;
    name: string;
    weight: string;
  }[];
  dominantBuyers: string[];   // 主な買い手ファンド (BlackRock, Fidelity等)
}

export interface FlowNode {
  id: string;
  label: string;
  role: string;
  motivation: string;
  example: string;
}

export interface HoldingStock {
  ticker: string;
  name: string;
  stakeRatio: string;
  sector: string;
}

export interface AssetManagerProfile {
  rank: number;
  id: string;
  name: string;
  country: string;
  headquarters: string;
  aum: string;
  aumNum: number;
  type: 'Index / Passive Giant' | 'Active / Multi-Asset' | 'Sovereign Wealth / Pension' | 'European ESG Leader';
  majorHoldings: HoldingStock[];
  coreDemands: {
    title: string;
    description: string;
    enforcement: string;
  }[];
  votingStyle: string;
  recentShift: string;
}
