import React, { useState } from 'react';
import { topAssetManagersData } from '../data/mockData';
import type { AssetManagerProfile } from '../types/tracker';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';

export const ShareholderMatrix: React.FC = () => {
  const { lang, isJa } = useLanguage();
  const t = translations[lang];
  const [selectedManager, setSelectedManager] = useState<AssetManagerProfile>(topAssetManagersData[0]);

  return (
    <section className="bg-terminal-surface border border-terminal-border mb-8">
      {/* セクションヘッダー */}
      <div className="p-4 sm:p-5 border-b border-terminal-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-terminal-panel">
        <div>
          <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider mb-0.5">
            GLOBAL CAPITAL & SHAREHOLDER MANDATE MATRIX
          </div>
          <h2 className="text-lg sm:text-xl font-serif text-white font-normal">
            {t.matrixTitle}
          </h2>
          <p className="text-xs text-terminal-muted mt-0.5 font-sans">
            {t.matrixDesc}
          </p>
        </div>

        <div className="text-[11px] font-data text-terminal-muted sm:text-right">
          <span>
            {isJa 
              ? <>世界の主要巨大資本 <strong className="text-terminal-accent">{topAssetManagersData.length}</strong> 社・機関を収録</>
              : <>Tracking Top <strong className="text-terminal-accent">{topAssetManagersData.length}</strong> Global Asset Managers</>
            }
          </span>
        </div>
      </div>

      {/* 2カラム・データスプリットビュー */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-terminal-border">
        
        {/* 左側: 資本主体一覧リスト (4カラム) */}
        <div className="lg:col-span-4 bg-terminal-bg/50 max-h-[600px] overflow-y-auto">
          <div className="p-2.5 border-b border-terminal-border text-[10px] font-data text-terminal-muted uppercase tracking-wider bg-terminal-panel flex items-center justify-between">
            <span>INSTITUTION / ENTITY</span>
            <span className="text-terminal-text font-bold">CAPITAL SCALE</span>
          </div>
          <div className="divide-y divide-terminal-border">
            {topAssetManagersData.map((manager) => {
              const isSelected = selectedManager.id === manager.id;
              const displayName = isJa ? manager.name.split(' (')[0] : (manager.nameEn || manager.name);
              const aumDisplay = isJa ? manager.aum.split(' (')[0] : (manager.aumEn?.split(' (')[0] || manager.aum);

              return (
                <button
                  key={manager.id}
                  onClick={() => setSelectedManager(manager)}
                  className={`w-full text-left p-3 transition-colors flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-terminal-panel border-l-2 border-l-terminal-accent text-white'
                      : 'hover:bg-terminal-panel/50 text-terminal-muted hover:text-terminal-text'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-data font-bold text-terminal-accent text-xs">
                        #{manager.rank}
                      </span>
                      <span className="font-sans font-medium text-xs text-terminal-text">
                        {displayName}
                      </span>
                    </div>
                    <div className="text-[10px] font-data text-terminal-muted mt-0.5">
                      {isJa ? manager.country : (manager.countryEn || manager.country)} | {aumDisplay}
                    </div>
                  </div>

                  <span className="text-[10px] font-data text-terminal-borderLight">
                    {isSelected ? '▶' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 右側: 選択された資本主体の詳細インテリジェンス (8カラム) */}
        <div className="lg:col-span-8 p-5 bg-terminal-panel/30 flex flex-col justify-between">
          <div>
            {/* ヘッダー情報 */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-terminal-border">
              <div>
                <div className="flex items-center gap-2 text-xs font-data mb-1">
                  <span className="text-terminal-accent font-bold">#{selectedManager.rank}</span>
                  <span className="text-terminal-borderLight">|</span>
                  <span className="text-terminal-muted">{isJa ? selectedManager.country : (selectedManager.countryEn || selectedManager.country)}</span>
                  <span className="text-terminal-borderLight">|</span>
                  <span className="text-terminal-muted">{isJa ? selectedManager.headquarters : (selectedManager.headquartersEn || selectedManager.headquarters)}</span>
                </div>
                <h3 className="text-xl font-serif text-white font-normal">
                  {isJa ? selectedManager.name : (selectedManager.nameEn || selectedManager.name)}
                </h3>
              </div>

              <div className="sm:text-right bg-terminal-panel p-2.5 border border-terminal-border">
                <span className="text-[9px] font-data text-terminal-muted block uppercase">{t.aumLabel}</span>
                <span className="text-sm font-data font-bold text-terminal-accent">
                  {isJa ? selectedManager.aum : (selectedManager.aumEn || selectedManager.aum)}
                </span>
              </div>
            </div>

            {/* 1. 主な保有銘柄と持分比率 */}
            <div className="mt-4">
              <div className="text-[10px] font-data text-terminal-muted uppercase tracking-wider mb-2">
                {isJa ? 'MAJOR BENEFICIAL HOLDINGS (主な保有銘柄 ＆ 実質持分比率)' : 'MAJOR BENEFICIAL HOLDINGS & EQUITY STAKES'}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-data">
                {selectedManager.majorHoldings.map((stock, idx) => (
                  <div key={idx} className="p-2 bg-terminal-bg border border-terminal-border flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-terminal-text">{stock.ticker}</span>
                      <span className="font-bold text-terminal-accent">{stock.stakeRatio}</span>
                    </div>
                    <span className="text-[10px] text-terminal-muted font-sans truncate mt-0.5">
                      {isJa ? stock.name : (stock.nameEn || stock.name)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. 企業に対するコア要求方針（スチュワードシップ） */}
            <div className="mt-5">
              <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider mb-2">
                {isJa ? 'CORE STEWARDSHIP DEMANDS (株主総会におけるコア要求・議決権基準)' : 'CORE STEWARDSHIP DEMANDS & PROXY VOTING BENCHMARKS'}
              </div>
              <div className="space-y-3">
                {selectedManager.coreDemands.map((demand, idx) => (
                  <div key={idx} className="p-3 bg-terminal-bg border border-terminal-border/80">
                    <h4 className="font-sans font-semibold text-xs text-terminal-text mb-1">
                      {isJa ? demand.title : (demand.titleEn || demand.title)}
                    </h4>
                    <p className="text-xs font-sans text-terminal-muted leading-relaxed">
                      {isJa ? demand.description : (demand.descriptionEn || demand.description)}
                    </p>
                    <div className="mt-2 pt-2 border-t border-terminal-border/40 flex items-center gap-1.5 text-[11px] font-sans">
                      <span className="text-terminal-accent font-data text-[10px] uppercase font-bold">
                        {isJa ? '[ 行使基準 ]' : '[ ENFORCEMENT ]'}
                      </span>
                      <span className="text-terminal-text">
                        {isJa ? demand.enforcement : (demand.enforcementEn || demand.enforcement)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. 議決権行使のスタンス ＆ 直近のシフト */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 bg-terminal-panel border border-terminal-border">
                <span className="text-[9px] font-data text-terminal-muted uppercase tracking-wider block mb-1">
                  {t.votingStyleLabel}
                </span>
                <p className="text-terminal-text font-sans leading-relaxed">
                  {isJa ? selectedManager.votingStyle : (selectedManager.votingStyleEn || selectedManager.votingStyle)}
                </p>
              </div>

              <div className="p-3 bg-terminal-panel border border-terminal-border">
                <span className="text-[9px] font-data text-terminal-accent uppercase tracking-wider block mb-1">
                  {t.recentShiftLabel}
                </span>
                <p className="text-terminal-text font-sans leading-relaxed">
                  {isJa ? selectedManager.recentShift : (selectedManager.recentShiftEn || selectedManager.recentShift)}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
