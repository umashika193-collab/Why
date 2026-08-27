import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-terminal-bg/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-terminal-surface border border-terminal-borderLight max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-terminal-border">
          <div>
            <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider">
              EDITORIAL & DATA POLICY
            </div>
            <h3 className="text-lg font-serif text-white font-normal mt-0.5">
              データ収集基準 ＆ 分析フレームワーク
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-terminal-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs font-sans text-terminal-text leading-relaxed">
          
          <div className="p-4 bg-terminal-panel border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-accent uppercase mb-1">
              1. 3要素による構造化分析
            </div>
            <p className="text-terminal-muted text-xs">
              すべての収録データを「① 発表された方針（一次情報）」「② 資本のインセンティブ（収益性・受託者責任・規制リスク）」「③ 実体経済・現場への波及（製品・売上・市場反応）」の3軸で厳密に整理・アーカイブします。
            </p>
          </div>

          <div className="p-4 bg-terminal-panel border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-muted uppercase mb-1">
              2. 公的開示データ（一次資料）の準拠
            </div>
            <p className="text-terminal-muted text-xs">
              米SEC提出書類（Form 13F, 10-K）、機関投資家の年次議決権行使ガイドライン、株主総会の投票開示結果、連邦議会公聴会記録などの公的ドキュメントをソースとして採用しています。
            </p>
          </div>

          <div className="p-4 bg-terminal-panel border border-terminal-border">
            <div className="text-[10px] font-data text-terminal-muted uppercase mb-1">
              3. 独立した市場インテリジェンス
            </div>
            <p className="text-terminal-muted text-xs">
              特定のイデオロギーや感情的批判を排し、資本市場のルールとインセンティブ構造から実体経済の動きを淡々と読み解くためのオープンインテリジェンスを提供します。
            </p>
          </div>

        </div>

        <div className="pt-4 border-t border-terminal-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-terminal-bg hover:bg-terminal-panel border border-terminal-border text-terminal-text font-data text-xs transition-colors"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
