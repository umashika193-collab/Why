import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MacroMetrics } from './components/MacroMetrics';
import { FlowDiagram } from './components/FlowDiagram';
import { PolicyCard } from './components/PolicyCard';
import { ShareholderMatrix } from './components/ShareholderMatrix';
import { DetailModal } from './components/DetailModal';
import { AboutModal } from './components/AboutModal';
import { trackerItemsData } from './data/mockData';
import type { CategoryType, TrackerItem } from './types/tracker';

export function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedItem, setSelectedItem] = useState<TrackerItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isFlowOpen, setIsFlowOpen] = useState<boolean>(false);
  const [activeMainTab, setActiveMainTab] = useState<'inflows' | 'matrix' | 'feed'>('inflows');

  const categories: { id: CategoryType; label: string; count: number }[] = [
    { id: 'all', label: 'ALL SECTORS', count: trackerItemsData.length },
    { id: 'tech', label: 'AI & REGULATION', count: trackerItemsData.filter(i => i.category === 'tech').length },
    { id: 'gaming', label: 'GAMING / ENTERTAINMENT', count: trackerItemsData.filter(i => i.category === 'gaming').length },
    { id: 'governance', label: 'TAKEOVER & BUYBACK', count: trackerItemsData.filter(i => i.category === 'governance').length },
    { id: 'macro_finance', label: 'DEFENSE & PENSION', count: trackerItemsData.filter(i => i.category === 'macro_finance').length },
    { id: 'energy', label: 'SCOPE 3 & ENERGY', count: trackerItemsData.filter(i => i.category === 'energy').length },
    { id: 'supply_chain', label: 'CHIPS & RESHORING', count: trackerItemsData.filter(i => i.category === 'supply_chain').length },
  ];

  // フィルタリング処理（カテゴリ選択のみで極めてシンプル）
  const filteredItems = useMemo(() => {
    return trackerItemsData.filter((item) => {
      return activeCategory === 'all' || item.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text flex flex-col font-sans">
      {/* ヘッダー */}
      <Header
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenFlow={() => setIsFlowOpen(true)}
      />

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        
        {/* メイン機能切り替えナビゲーション */}
        <div className="border-b border-terminal-border mb-6">
          <div className="flex flex-wrap items-center gap-2 font-data text-xs pb-3">
            <button
              onClick={() => setActiveMainTab('inflows')}
              className={`px-4 py-2 border transition-all ${
                activeMainTab === 'inflows'
                  ? 'border-terminal-accent text-terminal-accent bg-terminal-surface font-semibold shadow-sm'
                  : 'border-terminal-border text-terminal-muted hover:text-terminal-text bg-terminal-bg'
              }`}
            >
              [ 01. 資金流入上位セクター ]
            </button>

            <button
              onClick={() => setActiveMainTab('matrix')}
              className={`px-4 py-2 border transition-all ${
                activeMainTab === 'matrix'
                  ? 'border-terminal-accent text-terminal-accent bg-terminal-surface font-semibold shadow-sm'
                  : 'border-terminal-border text-terminal-muted hover:text-terminal-text bg-terminal-bg'
              }`}
            >
              [ 02. 主要運用会社 ＆ 保有マトリクス ]
            </button>

            <button
              onClick={() => setActiveMainTab('feed')}
              className={`px-4 py-2 border transition-all ${
                activeMainTab === 'feed'
                  ? 'border-terminal-accent text-terminal-accent bg-terminal-surface font-semibold shadow-sm'
                  : 'border-terminal-border text-terminal-muted hover:text-terminal-text bg-terminal-bg'
              }`}
            >
              [ 03. 政策 ＆ 産業インパクト・フィード ({filteredItems.length}) ]
            </button>
          </div>
        </div>

        {/* 画面1: 資金流入上位セクター */}
        {activeMainTab === 'inflows' && (
          <MacroMetrics />
        )}

        {/* 画面2: 主要運用会社＆保有マトリクス */}
        {activeMainTab === 'matrix' && (
          <ShareholderMatrix />
        )}

        {/* 画面3: 政策＆産業インパクト・フィード */}
        {activeMainTab === 'feed' && (
          <section className="bg-terminal-surface border border-terminal-border p-5">
            {/* セクションヘッダー */}
            <div className="pb-4 border-b border-terminal-border flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider mb-0.5">
                  DISCLOSURE & REGULATORY FEED
                </div>
                <h2 className="text-lg sm:text-xl font-serif text-white font-normal">
                  アジェンダ別 政策分析 ＆ 産業インパクト・フィード
                </h2>
                <p className="text-xs text-terminal-muted mt-0.5">
                  機関投資家の方針発表、法規制動向、および産業現場（ゲーム、映画、製造業等）への波及記録
                </p>
              </div>

              <div className="text-xs font-data text-terminal-muted">
                <span>FILTERED RESULTS: <strong className="text-terminal-accent">{filteredItems.length}</strong> RECORDS</span>
              </div>
            </div>

            {/* セクター選択ボタン（検索窓を排除し、ボタンのみで完結） */}
            <div className="py-3.5 border-b border-terminal-border bg-terminal-bg/50 -mx-5 px-5 my-0">
              <div className="text-[10px] font-data text-terminal-muted uppercase tracking-wider mb-2">
                FILTER BY SECTOR / AGENDA:
              </div>
              <div className="flex flex-wrap gap-1.5 font-data text-xs">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 border text-[11px] transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'border-terminal-accent bg-terminal-panel text-terminal-accent font-semibold shadow-sm'
                          : 'border-terminal-border bg-terminal-bg text-terminal-muted hover:text-terminal-text hover:border-terminal-borderLight'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                        isSelected ? 'bg-terminal-accent text-terminal-bg font-bold' : 'bg-terminal-panel text-terminal-muted'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 記事カード一覧 */}
            <div className="mt-5">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <PolicyCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItem}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-terminal-muted font-data text-xs bg-terminal-bg border border-terminal-border">
                  <p className="text-terminal-text font-medium mb-1">NO MATCHING DISCLOSURES</p>
                  <p className="text-terminal-muted">選択したセクターに該当するデータがありません。</p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-4 px-4 py-1.5 bg-terminal-panel hover:bg-terminal-border text-terminal-text border border-terminal-border transition-colors text-[11px]"
                  >
                    RESET TO ALL SECTORS
                  </button>
                </div>
              )}
            </div>

          </section>
        )}

      </main>

      {/* フッター */}
      <footer className="border-t border-terminal-border bg-terminal-bg py-6 text-xs text-terminal-muted font-data">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-terminal-text font-semibold">CAPITAL FLOW & POLICY TRACKER (CFPT)</span>
            <span className="mx-2 text-terminal-borderLight">|</span>
            <span>INDEPENDENT FINANCIAL INTELLIGENCE DATABASE</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span>DATA SOURCES: SEC EDGAR, COMPANY IR, US CONGRESS & PROXY STATEMENTS</span>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-terminal-text underline">
              EDITORIAL POLICY
            </button>
          </div>
        </div>
      </footer>

      {/* 詳細モーダル */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* マネーフローモーダル */}
      {isFlowOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-terminal-bg/85 backdrop-blur-sm">
          <div className="max-w-4xl w-full">
            <FlowDiagram onClose={() => setIsFlowOpen(false)} isModal={true} />
          </div>
        </div>
      )}

      {/* アバウトモーダル */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

export default App;
