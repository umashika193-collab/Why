import React, { useState } from 'react';
import { currentInflowSectorsData } from '../data/mockData';
import type { CurrentInflowSector } from '../types/tracker';

export const MacroMetrics: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<CurrentInflowSector>(currentInflowSectorsData[0]);

  return (
    <section className="bg-terminal-surface border border-terminal-border mb-8">
      {/* セクションヘッダー */}
      <div className="p-4 sm:p-5 border-b border-terminal-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-terminal-panel">
        <div>
          <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider mb-0.5">
            CURRENT CAPITAL FLOW ALLOCATION
          </div>
          <h2 className="text-lg sm:text-xl font-serif text-white font-normal">
            機関投資家 資金流入上位セクター（2026年 リアルタイムデータ）
          </h2>
        </div>
        <div className="text-right font-data text-xs text-terminal-muted">
          <span>AGGREGATED FLOW: <strong className="text-terminal-text">$745B / QTR</strong></span>
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
                    <span className="text-terminal-text font-medium block">{sector.name}</span>
                    <span className="text-[10px] text-terminal-muted font-data">{sector.nameEn}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-terminal-text font-semibold">
                    {sector.inflowAmount}
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
              <span className="text-terminal-muted">{selectedSector.nameEn}</span>
            </div>
            <h3 className="text-lg font-serif text-white">
              {selectedSector.name}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-data">
            <div className="p-2 bg-terminal-panel border border-terminal-border">
              <span className="text-[10px] text-terminal-muted block">流入額</span>
              <span className="font-bold text-terminal-text">{selectedSector.inflowAmount}</span>
            </div>
            <div className="p-2 bg-terminal-panel border border-terminal-border">
              <span className="text-[10px] text-terminal-muted block">成長率 (YoY)</span>
              <span className="font-bold text-terminal-accentGreen">{selectedSector.inflowGrowth}</span>
            </div>
          </div>
        </div>

        {/* 2カラム分析 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          <div className="p-3.5 bg-terminal-panel border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-muted uppercase tracking-wider block mb-1">
              MARKET RATIONALE & CONTEXT
            </span>
            <p className="text-terminal-text text-xs leading-relaxed font-sans">
              {selectedSector.description}
            </p>
          </div>

          <div className="p-3.5 bg-terminal-panel border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-accent uppercase tracking-wider block mb-1">
              INSTITUTIONAL DRIVING FORCE
            </span>
            <p className="text-terminal-text text-xs leading-relaxed font-sans">
              {selectedSector.drivingForce}
            </p>
          </div>
        </div>

        {/* 銘柄一覧 & 買い手ファンド */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          <div className="lg:col-span-8 p-3.5 bg-terminal-panel border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-muted uppercase tracking-wider block mb-2">
              TARGET EQUITIES & PORTFOLIO WEIGHTS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {selectedSector.topTargetStocks.map((stock, idx) => (
                <div key={idx} className="p-2 bg-terminal-bg border border-terminal-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-data font-bold text-terminal-accent block text-[11px]">{stock.ticker}</span>
                    <span className="text-[11px] text-terminal-text truncate block max-w-[110px]">{stock.name.split(' (')[0]}</span>
                  </div>
                  <span className="font-data font-bold text-terminal-text text-[11px]">{stock.weight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 p-3.5 bg-terminal-panel border border-terminal-border flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-data text-terminal-muted uppercase tracking-wider block mb-2">
                DOMINANT INSTITUTIONAL BUYERS
              </span>
              <ul className="space-y-1.5 text-xs font-sans text-terminal-text">
                {selectedSector.dominantBuyers.map((buyer, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-1.5 bg-terminal-bg border border-terminal-border text-[11px]">
                    <span className="w-1 h-1 bg-terminal-accent"></span>
                    <span>{buyer}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-[9px] font-data text-terminal-muted pt-2 border-t border-terminal-border mt-3">
              SOURCE: SEC 13F / GLOBAL MACRO FLOW INDEX 2026
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
