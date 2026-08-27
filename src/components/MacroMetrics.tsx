import React, { useState } from 'react';
import { currentInflowSectorsData } from '../data/mockData';
import type { CurrentInflowSector } from '../types/tracker';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';

export const MacroMetrics: React.FC = () => {
  const { lang, isJa } = useLanguage();
  const t = translations[lang];
  const [selectedSector, setSelectedSector] = useState<CurrentInflowSector>(currentInflowSectorsData[0]);

  // 上位5セクターの合計流入額（$B）を動的に合算
  const totalFlowNum = currentInflowSectorsData.reduce((acc, sec) => {
    const match = sec.inflowAmountEn?.match(/\$([0-9.]+)B/);
    if (match) {
      return acc + parseFloat(match[1]);
    }
    const matchJa = sec.inflowAmount.match(/\$([0-9.]+)/);
    return acc + (matchJa ? parseFloat(matchJa[1]) : 0);
  }, 0);

  const aggregatedFlowDisplay = isJa 
    ? `$${Math.round(totalFlowNum)} 億 / 四半期` 
    : `$${totalFlowNum.toFixed(1)}B / QTR`;

  return (
    <section className="bg-terminal-surface border border-terminal-border mb-8">
      {/* セクションヘッダー */}
      <div className="p-4 sm:p-5 border-b border-terminal-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-terminal-panel">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-data text-terminal-accent uppercase tracking-wider">
              CURRENT CAPITAL FLOW ALLOCATION
            </span>
            <span className="text-[9px] px-1.5 py-0.2 bg-terminal-accent/15 border border-terminal-accent/40 text-terminal-accent font-data rounded-none">
              {isJa ? '動的選定 (3層フィルター準拠)' : 'DYNAMIC ALLOCATION (3-TIER)'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif text-white font-normal">
            {t.inflowsTitle}
          </h2>
          <p className="text-xs text-terminal-muted mt-0.5 font-sans">
            {t.inflowsDesc}
          </p>
        </div>
        <div className="text-right font-data text-xs text-terminal-muted">
          <span className="block text-[10px] text-terminal-muted/80">{isJa ? '5大セクター合計流入額' : 'AGGREGATED 5-SECTOR FLOW'}</span>
          <span className="text-sm font-bold text-terminal-text">{aggregatedFlowDisplay}</span>
        </div>
      </div>

      {/* 5大セクター比較テーブル（金融端末型データシート） */}
      <div className="overflow-x-auto border-b border-terminal-border">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-terminal-bg/80 border-b border-terminal-border text-[10px] font-data text-terminal-muted uppercase tracking-wider">
              <th className="py-2.5 px-4 font-normal">RANK</th>
              <th className="py-2.5 px-4 font-normal">SECTOR / THEME</th>
              <th className="py-2.5 px-4 font-normal text-right">INFLOW / QTR</th>
              <th className="py-2.5 px-4 font-normal text-right">YOY GROWTH</th>
              <th className="py-2.5 px-4 font-normal">SHARE</th>
              <th className="py-2.5 px-4 font-normal text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-terminal-border font-data">
            {currentInflowSectorsData.map((sector) => {
              const isSelected = selectedSector.id === sector.id;
              const sectorDisplayName = isJa ? sector.name : sector.nameEn;
              const sectorSubName = isJa ? sector.nameEn : sector.name;
              const inflowDisplay = isJa ? sector.inflowAmount : (sector.inflowAmountEn || sector.inflowAmount);

              return (
                <tr
                  key={sector.id}
                  onClick={() => setSelectedSector(sector)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-terminal-panel text-white font-medium'
                      : 'hover:bg-terminal-bg/50 text-terminal-muted hover:text-terminal-text'
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-terminal-accent">
                    #{sector.rank}
                  </td>
                  <td className="py-3 px-4 font-sans text-xs">
                    <span className="text-terminal-text font-medium block">{sectorDisplayName}</span>
                    <span className="text-[10px] text-terminal-muted font-data">{sectorSubName}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-terminal-text font-semibold">
                    {inflowDisplay}
                  </td>
                  <td className="py-3 px-4 text-right text-terminal-accentGreen font-bold">
                    {sector.inflowGrowth}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-terminal-bg h-1.5 border border-terminal-border">
                        <div 
                          className="bg-terminal-accent h-full" 
                          style={{ width: `${sector.shareRatio * 2}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-terminal-muted">{sector.shareRatio}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-[10px] px-2 py-0.5 border ${
                      isSelected 
                        ? 'border-terminal-accent text-terminal-accent bg-terminal-accent/10' 
                        : 'border-terminal-border text-terminal-muted'
                    }`}>
                      {isSelected ? 'SELECTED' : 'INSPECT'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 選択されたセクターの詳細データパネル */}
      <div className="p-5 bg-terminal-bg/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-terminal-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-data mb-1">
              <span className="text-terminal-accent font-bold">#0{selectedSector.rank} SELECTED INTELLIGENCE</span>
              <span className="text-terminal-borderLight">|</span>
              <span className="text-terminal-muted">{isJa ? selectedSector.nameEn : selectedSector.name}</span>
            </div>
            <h3 className="text-lg font-serif text-white">
              {isJa ? selectedSector.name : selectedSector.nameEn}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-data">
            <div className="p-2 bg-terminal-panel border border-terminal-border">
              <span className="text-[10px] text-terminal-muted block">{t.inflowAmountLabel}</span>
              <span className="font-bold text-terminal-text">{isJa ? selectedSector.inflowAmount : (selectedSector.inflowAmountEn || selectedSector.inflowAmount)}</span>
            </div>
            <div className="p-2 bg-terminal-panel border border-terminal-border">
              <span className="text-[10px] text-terminal-muted block">{t.inflowGrowthLabel}</span>
              <span className="font-bold text-terminal-accentGreen">{selectedSector.inflowGrowth}</span>
            </div>
          </div>
        </div>

        {/* 2カラム分析 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          <div className="p-3.5 bg-terminal-panel border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-muted uppercase tracking-wider block mb-1">
              {isJa ? 'セクター概要 ＆ 資本集中動向' : 'SECTOR OVERVIEW & CONCENTRATION'}
            </span>
            <p className="text-terminal-text font-sans leading-relaxed">
              {isJa ? selectedSector.description : (selectedSector.descriptionEn || selectedSector.description)}
            </p>
          </div>

          <div className="p-3.5 bg-terminal-panel border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-muted uppercase tracking-wider block mb-1">
              {t.drivingForceLabel}
            </span>
            <p className="text-terminal-text font-sans leading-relaxed">
              {isJa ? selectedSector.drivingForce : (selectedSector.drivingForceEn || selectedSector.drivingForce)}
            </p>
          </div>
        </div>

        {/* 銘柄 ＆ 買い手ファンド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          <div className="p-3.5 bg-terminal-surface border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-accent uppercase tracking-wider block mb-2">
              {t.topTargetStocksLabel}
            </span>
            <div className="space-y-2">
              {selectedSector.topTargetStocks.map((stock, idx) => (
                <div key={idx} className="flex items-center justify-between font-data bg-terminal-bg px-2.5 py-1.5 border border-terminal-border/60">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-terminal-text">{stock.ticker}</span>
                    <span className="text-terminal-muted text-[11px] font-sans">
                      {isJa ? stock.name : (stock.nameEn || stock.name)}
                    </span>
                  </div>
                  <span className="font-semibold text-terminal-accentGreen">{stock.weight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-terminal-surface border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-accent uppercase tracking-wider block mb-2">
              {t.dominantBuyersLabel}
            </span>
            <ul className="space-y-1.5 font-sans">
              {(isJa ? selectedSector.dominantBuyers : (selectedSector.dominantBuyersEn || selectedSector.dominantBuyers)).map((buyer, idx) => (
                <li key={idx} className="flex items-center gap-2 text-terminal-text bg-terminal-bg px-2.5 py-1.5 border border-terminal-border/60">
                  <span className="text-terminal-accent text-xs">◆</span>
                  <span>{buyer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
