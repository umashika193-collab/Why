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
              INSTITUTIONAL INVESTOR ALLOCATION & MANDATE TRACKER
            </div>
            <h1 className="text-xl sm:text-2xl font-serif text-white font-normal tracking-tight">
              Capital Flow & Policy Tracker
            </h1>
            <p className="text-xs text-terminal-muted mt-0.5 font-sans">
              世界主要機関投資家の投資方針、議決権行使、および実体経済（製品・サプライチェーン・雇用）への影響を追跡する独立データベース
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
