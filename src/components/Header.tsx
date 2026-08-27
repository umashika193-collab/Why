import React from 'react';

interface HeaderProps {
  onOpenAbout: () => void;
  onOpenFlow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAbout,
  onOpenFlow,
}) => {
  return (
    <header className="border-b border-terminal-border bg-terminal-bg sticky top-0 z-30">
      {/* メインヘッダー */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-data tracking-widest text-terminal-accent uppercase mb-0.5">
              CAPGAZER // INSTITUTIONAL MONEY FLOW & POLICY OBSERVATORY
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
                CapGazer
              </h1>
              <span className="text-sm font-sans text-terminal-muted border-l border-terminal-border pl-3 font-normal">
                資本ゲイザー — 世の中のお金の流れを眺める
              </span>
            </div>
            <p className="text-xs text-terminal-muted mt-1 font-sans">
              世界の巨大資本（BlackRock等）の保有株式、投資方針、および産業現場への波及を米SEC一次開示から淡々と眺めるデータプラットフォーム
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-data shrink-0">
            <button 
              onClick={onOpenFlow}
              className="text-terminal-muted hover:text-terminal-text transition-colors border border-terminal-border bg-terminal-surface px-2.5 py-1"
            >
              [ 構造プロセス図 ]
            </button>
            <button 
              onClick={onOpenAbout}
              className="text-terminal-muted hover:text-terminal-text transition-colors border border-terminal-border bg-terminal-surface px-2.5 py-1"
            >
              [ データ基準 ]
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
