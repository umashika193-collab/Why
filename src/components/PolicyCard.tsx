import React from 'react';
import type { TrackerItem } from '../types/tracker';
import { ArrowUpRight } from 'lucide-react';

interface PolicyCardProps {
  item: TrackerItem;
  onSelect: (item: TrackerItem) => void;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({ item, onSelect }) => {
  const getCategoryLabel = (category: TrackerItem['category']) => {
    switch (category) {
      case 'energy': return 'SCOPE 3 / ENERGY';
      case 'tech': return 'AI & WORKFORCE';
      case 'governance': return 'GOVERNANCE & CAPITAL';
      case 'supply_chain': return 'SUPPLY CHAIN';
      case 'gaming': return 'GAMING / CONTENT';
      case 'entertainment': return 'ENTERTAINMENT';
      case 'macro_finance': return 'POLICY & REGULATION';
      default: return 'GENERAL';
    }
  };

  return (
    <article 
      onClick={() => onSelect(item)}
      className="bg-terminal-surface border border-terminal-border hover:border-terminal-accent/70 p-5 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* メタ情報ヘッダー */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-data mb-2.5 pb-2 border-b border-terminal-border">
          <div className="flex items-center gap-2">
            <span className="text-terminal-accent font-semibold">
              [{getCategoryLabel(item.category)}]
            </span>
            <span className="text-terminal-borderLight">|</span>
            <span className="text-terminal-muted">{item.date}</span>
          </div>

          <div className="flex items-center gap-2 text-terminal-muted">
            <span>STATUS: <strong className="text-terminal-text uppercase">{item.statusLabel}</strong></span>
            <span>IMPACT: <strong className="text-terminal-accent font-bold">{item.impactScore}/100</strong></span>
          </div>
        </div>

        {/* 発信機関名 */}
        <div className="text-[11px] font-data text-terminal-muted mb-1">
          SOURCE: <span className="text-terminal-text font-medium">{item.institution}</span> ({item.institutionType})
        </div>

        {/* 記事タイトル（セリフ体） */}
        <h3 className="text-base font-serif text-white font-normal group-hover:text-terminal-accent transition-colors leading-snug mb-3">
          {item.title}
        </h3>

        {/* 3行要約 */}
        <div className="bg-terminal-panel p-3 border border-terminal-border mb-4 space-y-1 text-xs font-sans text-terminal-text">
          {item.summary.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2 leading-relaxed text-[11px]">
              <span className="text-terminal-accent font-data shrink-0">■</span>
              <span>{line}</span>
            </div>
          ))}
        </div>

        {/* 3つの分析ブロック */}
        <div className="space-y-2 text-xs font-sans">
          <div className="p-2.5 bg-terminal-bg border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-muted uppercase mb-0.5">
              1. 決定事項・一次情報
            </div>
            <p className="text-terminal-text text-[11px] leading-relaxed line-clamp-2">
              {item.primaryPolicy.description}
            </p>
          </div>

          <div className="p-2.5 bg-terminal-bg border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-accent uppercase mb-0.5">
              2. 資本のインセンティブ（なぜ）
            </div>
            <p className="text-terminal-text text-[11px] leading-relaxed line-clamp-2">
              {item.capitalIncentive.description}
            </p>
          </div>

          <div className="p-2.5 bg-terminal-bg border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-muted uppercase mb-0.5">
              3. 実体経済・現場への影響
            </div>
            <p className="text-terminal-text text-[11px] leading-relaxed line-clamp-2">
              {item.industryImpact.description}
            </p>
          </div>
        </div>
      </div>

      {/* フッター情報 */}
      <div className="mt-4 pt-3 border-t border-terminal-border flex items-center justify-between text-xs font-data">
        <div className="flex flex-wrap items-center gap-1.5">
          {item.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] text-terminal-muted bg-terminal-panel px-1.5 py-0.5 border border-terminal-border">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-terminal-accent font-medium group-hover:underline">
          <span>READ DISCLOSURE</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </article>
  );
};
