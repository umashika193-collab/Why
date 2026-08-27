import React from 'react';
import type { TrackerItem } from '../types/tracker';
import { X, ExternalLink } from 'lucide-react';

interface DetailModalProps {
  item: TrackerItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-terminal-bg/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-terminal-surface border border-terminal-borderLight max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* モーダルヘッダー */}
        <div className="sticky top-0 bg-terminal-panel border-b border-terminal-border p-5 flex items-start justify-between gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-data text-terminal-muted mb-1">
              <span className="text-terminal-accent font-semibold">{item.date}</span>
              <span>|</span>
              <span>{item.institution}</span>
              <span>|</span>
              <span>STATUS: <strong className="text-terminal-text uppercase">{item.statusLabel}</strong></span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-normal leading-snug">
              {item.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-terminal-muted hover:text-white hover:bg-terminal-bg transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* モーダル本文 */}
        <div className="p-6 space-y-6 text-xs font-sans">
          
          {/* 要約ダイジェスト */}
          <div className="bg-terminal-panel p-4 border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider mb-2">
              EXECUTIVE SUMMARY
            </div>
            <ul className="space-y-2 text-terminal-text">
              {item.summary.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed text-[11px]">
                  <span className="text-terminal-accent font-data shrink-0">■</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 1. 一次情報と方針詳細 */}
          <div className="p-4 bg-terminal-bg border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-muted uppercase tracking-wider mb-1">
              1. OFFICIAL POLICY & DISCLOSURE (一次情報)
            </div>
            <h4 className="text-sm font-serif text-white mb-2">{item.primaryPolicy.title}</h4>
            <p className="text-terminal-text text-xs leading-relaxed mb-3">
              {item.primaryPolicy.description}
            </p>
            <div className="bg-terminal-panel p-3 border border-terminal-border">
              <span className="text-[10px] font-data text-terminal-muted block mb-1.5 uppercase">KEY PROVISIONS / 決定条項：</span>
              <ul className="space-y-1.5 text-[11px] text-terminal-text">
                {item.primaryPolicy.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-terminal-accent font-data">✔</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. 資本の論理 */}
          <div className="p-4 bg-terminal-bg border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider mb-1">
              2. CAPITAL INCENTIVE & FINANCIAL RATIONALE (資本の動機)
            </div>
            <h4 className="text-sm font-serif text-white mb-2">{item.capitalIncentive.title}</h4>
            <p className="text-terminal-text text-xs leading-relaxed mb-3">
              {item.capitalIncentive.description}
            </p>
            <div className="bg-terminal-panel p-3 border border-terminal-border text-[11px] text-terminal-text leading-relaxed">
              <strong className="text-terminal-accent font-data block mb-1">受託者責任・財務根拠:</strong>
              {item.capitalIncentive.financialRationale}
            </div>
          </div>

          {/* 3. 実体経済と産業への波及 */}
          <div className="p-4 bg-terminal-bg border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-muted uppercase tracking-wider mb-1">
              3. INDUSTRIAL IMPACT & MARKET FEEDBACK (現場影響)
            </div>
            <h4 className="text-sm font-serif text-white mb-2">{item.industryImpact.title}</h4>
            <p className="text-terminal-text text-xs leading-relaxed mb-3">
              {item.industryImpact.description}
            </p>
            <div className="p-3 bg-terminal-panel border border-terminal-border text-[11px] text-terminal-text space-y-2">
              <div>
                <span className="text-[10px] font-data text-terminal-muted block mb-0.5 uppercase">市場・消費者の反応:</span>
                <p>{item.industryImpact.marketReaction}</p>
              </div>
              {item.industryImpact.caseStudy && (
                <div className="pt-2 border-t border-terminal-border">
                  <span className="text-[10px] font-data text-terminal-accent block mb-0.5 uppercase">CASE STUDY:</span>
                  <p className="text-white font-medium">{item.industryImpact.caseStudy.target}</p>
                  <p className="text-terminal-muted text-[10px] mt-0.5">{item.industryImpact.caseStudy.outcome}</p>
                </div>
              )}
            </div>
          </div>

          {/* 関連企業と一次情報ソース */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-data">
            <div className="p-3 bg-terminal-panel border border-terminal-border">
              <span className="text-[10px] text-terminal-muted block mb-2 uppercase">STAKEHOLDERS & TARGETS</span>
              <div className="flex flex-wrap gap-1.5">
                {item.involvedCompanies.map((company, idx) => (
                  <span key={idx} className="bg-terminal-bg text-terminal-text px-2 py-0.5 border border-terminal-border text-[10px]">
                    {company}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-terminal-panel border border-terminal-border flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-terminal-muted block mb-1 uppercase">OFFICIAL SOURCE</span>
                <p className="text-terminal-text text-[11px] font-sans">{item.sourceName}</p>
                <p className="text-[9px] text-terminal-muted">{item.sourceType}</p>
              </div>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-terminal-accent hover:underline text-[10px]"
                >
                  <span>VIEW PRIMARY DOCUMENT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* モーダルフッター */}
        <div className="bg-terminal-panel border-t border-terminal-border p-4 flex items-center justify-between text-[10px] font-data text-terminal-muted">
          <span>DATA RECORD: VERIFIED PRIMARY SOURCE</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-terminal-bg hover:bg-terminal-border text-terminal-text border border-terminal-border text-xs transition-colors font-data"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
