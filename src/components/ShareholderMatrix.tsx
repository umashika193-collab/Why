import React, { useState } from 'react';
import { topAssetManagersData } from '../data/mockData';
import type { AssetManagerProfile } from '../types/tracker';

export const ShareholderMatrix: React.FC = () => {
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
            世界の巨大資本（メガファンド・公的年金）：保有株式 ＆ 企業への要求方針マトリクス
          </h2>
        </div>

        <div className="text-[11px] font-data text-terminal-muted sm:text-right">
          <span>世界の主要巨大資本 <strong className="text-terminal-accent">{topAssetManagersData.length}</strong> 社・機関を収録</span>
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
                        {manager.name.split(' (')[0]}
                      </span>
                    </div>
                    <div className="text-[10px] font-data text-terminal-muted mt-0.5">
                      {manager.country} | 運用規模: <strong className="text-terminal-text font-semibold">{manager.aum.split(' (')[0]}</strong>
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
                  <span className="text-terminal-muted">{selectedManager.country}</span>
                  <span className="text-terminal-borderLight">|</span>
                  <span className="text-terminal-muted">{selectedManager.headquarters}</span>
                </div>
                <h3 className="text-xl font-serif text-white font-normal">
                  {selectedManager.name}
                </h3>
              </div>

              <div className="sm:text-right bg-terminal-panel p-2.5 border border-terminal-border">
                <span className="text-[9px] font-data text-terminal-muted block uppercase">資産規模 (AUM)</span>
                <span className="text-sm font-data font-bold text-terminal-accent">
                  {selectedManager.aum}
                </span>
              </div>
            </div>

            {/* 1. 主な保有銘柄と持分比率 */}
            <div className="mt-4">
              <div className="text-[10px] font-data text-terminal-muted uppercase tracking-wider mb-2">
                MAJOR BENEFICIAL HOLDINGS (主な保有銘柄 ＆ 実質持分比率)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedManager.majorHoldings.map((holding, idx) => (
                  <div key={idx} className="p-2.5 bg-terminal-panel border border-terminal-border flex items-center justify-between text-xs">
                    <div>
                      <span className="font-data font-bold text-terminal-accent block text-[11px]">{holding.ticker}</span>
                      <span className="font-sans text-[11px] text-terminal-text truncate block max-w-[95px]">{holding.name}</span>
                      <span className="text-[9px] text-terminal-muted block">{holding.sector}</span>
                    </div>
                    <span className="font-data font-bold text-terminal-text text-xs">{holding.stakeRatio}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. 企業への要求方針 */}
            <div className="mt-5">
              <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider mb-2">
                CORE STEWARDSHIP & PROXY VOTING MANDATES (投資基準 ＆ 企業への要求方針)
              </div>

              <div className="space-y-2">
                {selectedManager.coreDemands.map((demand, idx) => (
                  <div key={idx} className="p-3 bg-terminal-panel border border-terminal-border text-xs">
                    <div className="font-sans font-semibold text-white text-xs mb-1">
                      {demand.title}
                    </div>
                    <p className="text-terminal-muted text-[11px] leading-relaxed font-sans mb-1.5">
                      {demand.description}
                    </p>
                    <div className="text-[10px] font-data text-terminal-accent/90 border-t border-terminal-border/80 pt-1">
                      <strong>不適合時の議決権行使:</strong> {demand.enforcement}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. 議決権行使の特徴・最近のシフト */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-terminal-panel border border-terminal-border">
                <span className="text-[10px] font-data text-terminal-muted uppercase block mb-1">
                  VOTING BEHAVIOR & STYLE
                </span>
                <p className="text-terminal-text text-[11px] leading-relaxed font-sans">
                  {selectedManager.votingStyle}
                </p>
              </div>

              <div className="p-3 bg-terminal-panel border border-terminal-border">
                <span className="text-[10px] font-data text-terminal-muted uppercase block mb-1">
                  RECENT STRATEGIC SHIFT
                </span>
                <p className="text-terminal-text text-[11px] leading-relaxed font-sans">
                  {selectedManager.recentShift}
                </p>
              </div>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-terminal-border text-[9px] font-data text-terminal-muted flex items-center justify-between">
            <span>SOURCE: OFFICIAL DISCLOSURES & PROXY STATEMENTS</span>
            <span>CFPT TERMINAL v1.0</span>
          </div>
        </div>

      </div>
    </section>
  );
};
