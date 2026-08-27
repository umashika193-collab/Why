import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';

interface HeaderProps {
  onOpenAbout: () => void;
  onOpenFlow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAbout,
  onOpenFlow,
}) => {
  const { lang, toggleLang, isJa } = useLanguage();
  const t = translations[lang];

  return (
    <header className="border-b border-terminal-border bg-terminal-bg sticky top-0 z-30">
      {/* メインヘッダー */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-data tracking-widest text-terminal-accent uppercase mb-0.5">
              {t.tagline}
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
                {t.brandTitle}
              </h1>
              <span className="text-sm font-sans text-terminal-muted border-l border-terminal-border pl-3 font-normal">
                {t.brandSub}
              </span>
            </div>
            <p className="text-xs text-terminal-muted mt-1 font-sans">
              {t.headerDesc}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-data shrink-0">
            {/* 言語切り替えトグル */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 border border-terminal-accent text-terminal-accent bg-terminal-surface hover:bg-terminal-border/40 px-3 py-1 font-semibold transition-all shadow-sm"
              title={isJa ? 'Switch to English' : '日本語に切り替え'}
            >
              <span>🌐</span>
              <span className={!isJa ? 'font-bold underline' : 'opacity-60'}>EN</span>
              <span className="opacity-40">/</span>
              <span className={isJa ? 'font-bold underline' : 'opacity-60'}>JA</span>
            </button>

            <button 
              onClick={onOpenFlow}
              className="text-terminal-muted hover:text-terminal-text transition-colors border border-terminal-border bg-terminal-surface px-2.5 py-1"
            >
              {t.navFlow}
            </button>
            <button 
              onClick={onOpenAbout}
              className="text-terminal-muted hover:text-terminal-text transition-colors border border-terminal-border bg-terminal-surface px-2.5 py-1"
            >
              {t.navAbout}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
