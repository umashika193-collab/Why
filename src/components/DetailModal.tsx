import React from 'react';
import type { TrackerItem } from '../types/tracker';
import { X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';

interface DetailModalProps {
  item: TrackerItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  const { lang, isJa } = useLanguage();
  const t = translations[lang];

  if (!item) return null;

  const title = isJa ? item.title : (item.titleEn || item.title);
  const summary = isJa ? item.summary : (item.summaryEn || item.summary);
  const statusLabel = isJa ? item.statusLabel : (item.statusLabelEn || item.statusLabel);
  const institution = isJa ? item.institution : (item.institutionEn || item.institution);
  
  const primaryTitle = isJa ? item.primaryPolicy.title : (item.primaryPolicy.titleEn || item.primaryPolicy.title);
  const primaryDesc = isJa ? item.primaryPolicy.description : (item.primaryPolicy.descriptionEn || item.primaryPolicy.description);
  const primaryKeyPoints = isJa ? item.primaryPolicy.keyPoints : (item.primaryPolicy.keyPointsEn || item.primaryPolicy.keyPoints);

  const capitalTitle = isJa ? item.capitalIncentive.title : (item.capitalIncentive.titleEn || item.capitalIncentive.title);
  const capitalDesc = isJa ? item.capitalIncentive.description : (item.capitalIncentive.descriptionEn || item.capitalIncentive.description);
  const capitalRationale = isJa ? item.capitalIncentive.financialRationale : (item.capitalIncentive.financialRationaleEn || item.capitalIncentive.financialRationale);

  const industryTitle = isJa ? item.industryImpact.title : (item.industryImpact.titleEn || item.industryImpact.title);
  const industryDesc = isJa ? item.industryImpact.description : (item.industryImpact.descriptionEn || item.industryImpact.description);
  const industryReaction = isJa ? item.industryImpact.marketReaction : (item.industryImpact.marketReactionEn || item.industryImpact.marketReaction);
  const caseOutcome = item.industryImpact.caseStudy 
    ? (isJa ? item.industryImpact.caseStudy.outcome : (item.industryImpact.caseStudy.outcomeEn || item.industryImpact.caseStudy.outcome))
    : '';

  const tags = isJa ? item.tags : (item.tagsEn || item.tags);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-terminal-bg/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-terminal-surface border border-terminal-borderLight max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* モーダルヘッダー */}
        <div className="sticky top-0 bg-terminal-panel border-b border-terminal-border p-5 flex items-start justify-between gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-data text-terminal-muted mb-1">
              <span className="text-terminal-accent font-semibold">{item.date}</span>
              <span>|</span>
              <span>{institution}</span>
              <span>|</span>
              <span>STATUS: <strong className="text-terminal-text uppercase">{statusLabel}</strong></span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-white font-normal leading-snug">
              {title}
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
              {summary.map((point, idx) => (
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
              {isJa ? '1. OFFICIAL POLICY & DISCLOSURE (一次情報)' : '1. OFFICIAL POLICY & DISCLOSURE (PRIMARY SOURCE)'}
            </div>
            <h4 className="text-sm font-serif text-white mb-2">{primaryTitle}</h4>
            <p className="text-terminal-text text-xs leading-relaxed mb-3">
              {primaryDesc}
            </p>
            <div className="bg-terminal-panel p-3 border border-terminal-border">
              <span className="text-[10px] font-data text-terminal-muted block mb-1.5 uppercase">
                {isJa ? 'KEY PROVISIONS / 決定条項：' : 'KEY PROVISIONS & CLAUSES:'}
              </span>
              <ul className="space-y-1.5 text-[11px] text-terminal-text">
                {primaryKeyPoints.map((point, idx) => (
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
              {isJa ? '2. CAPITAL INCENTIVE & FINANCIAL RATIONALE (資本の動機)' : '2. CAPITAL INCENTIVE & FINANCIAL RATIONALE'}
            </div>
            <h4 className="text-sm font-serif text-white mb-2">{capitalTitle}</h4>
            <p className="text-terminal-text text-xs leading-relaxed mb-3">
              {capitalDesc}
            </p>
            <div className="bg-terminal-panel p-3 border border-terminal-border text-[11px] text-terminal-text leading-relaxed">
              <strong className="text-terminal-accent font-data block mb-1">
                {isJa ? '受託者責任・財務根拠:' : 'Fiduciary Mandate & Financial Rationale:'}
              </strong>
              {capitalRationale}
            </div>
          </div>

          {/* 3. 実体経済と産業への波及 */}
          <div className="p-4 bg-terminal-bg border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-muted uppercase tracking-wider mb-1">
              {isJa ? '3. INDUSTRIAL IMPACT & MARKET FEEDBACK (現場影響)' : '3. INDUSTRIAL IMPACT & MARKET FEEDBACK'}
            </div>
            <h4 className="text-sm font-serif text-white mb-2">{industryTitle}</h4>
            <p className="text-terminal-text text-xs leading-relaxed mb-3">
              {industryDesc}
            </p>
            <div className="p-3 bg-terminal-panel border border-terminal-border text-[11px] text-terminal-text space-y-2">
              <div>
                <span className="text-[10px] font-data text-terminal-muted block mb-0.5 uppercase">
                  {isJa ? '市場・消費者の反応:' : 'Market & Consumer Reaction:'}
                </span>
                <p>{industryReaction}</p>
              </div>
              {item.industryImpact.caseStudy && (
                <div className="pt-2 border-t border-terminal-border">
                  <span className="text-[10px] font-data text-terminal-accent block mb-0.5 uppercase">CASE STUDY:</span>
                  <p className="text-white font-medium">{item.industryImpact.caseStudy.target}</p>
                  <p className="text-terminal-muted text-[10px] mt-0.5">{caseOutcome}</p>
                </div>
              )}
            </div>
          </div>

          {/* 関連企業と一次情報ソース */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-data">
            <div className="p-3 bg-terminal-panel border border-terminal-border">
              <span className="text-[10px] text-terminal-muted uppercase block mb-1">
                {t.involvedLabel}
              </span>
              <div className="flex flex-wrap gap-1">
                {item.involvedCompanies.map((c, idx) => (
                  <span key={idx} className="bg-terminal-bg px-2 py-0.5 border border-terminal-border text-terminal-text">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-terminal-panel border border-terminal-border">
              <span className="text-[10px] text-terminal-muted uppercase block mb-1">
                {t.sourceLabel}
              </span>
              <div className="text-terminal-text text-[11px] mb-2">
                {item.sourceName} ({item.sourceType})
              </div>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-terminal-accent hover:underline text-[11px]"
                >
                  {t.viewOriginalFiling} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* タグ */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-terminal-border font-data text-[10px]">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-terminal-panel px-2 py-0.5 border border-terminal-border text-terminal-muted">
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* モーダルフッター */}
        <div className="p-4 bg-terminal-panel border-t border-terminal-border text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-terminal-border bg-terminal-bg text-terminal-text hover:bg-terminal-surface text-xs font-data transition-colors"
          >
            {t.closeModal}
          </button>
        </div>

      </div>
    </div>
  );
};
