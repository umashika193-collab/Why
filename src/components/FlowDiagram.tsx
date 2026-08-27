import React, { useState } from 'react';
import { flowNodesData } from '../data/mockData';
import { X } from 'lucide-react';
import type { FlowNode } from '../types/tracker';

interface FlowDiagramProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ onClose, isModal = false }) => {
  const [selectedNode, setSelectedNode] = useState<FlowNode>(flowNodesData[0]);

  return (
    <div className={`bg-terminal-surface border border-terminal-border p-5 ${isModal ? 'shadow-2xl' : 'mb-8'}`}>
      <div className="flex items-center justify-between pb-3 border-b border-terminal-border">
        <div>
          <div className="text-[10px] font-data text-terminal-accent uppercase tracking-wider">
            CAPITAL TRANSMISSION MECHANISM
          </div>
          <h3 className="text-base font-serif text-white font-normal mt-0.5">
            構造プロセス：資本の投資基準が現場に伝わる5段階の経路
          </h3>
        </div>
        {isModal && onClose && (
          <button 
            onClick={onClose}
            className="p-1 text-terminal-muted hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ステップナビゲーション */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-4">
        {flowNodesData.map((node, index) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3 text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-terminal-panel border-terminal-accent text-white'
                  : 'bg-terminal-bg border-terminal-border text-terminal-muted hover:text-terminal-text hover:border-terminal-borderLight'
              }`}
            >
              <div>
                <span className={`text-[10px] font-data font-bold block mb-1 ${isSelected ? 'text-terminal-accent' : 'text-terminal-muted'}`}>
                  STAGE 0{index + 1}
                </span>
                <span className="text-xs font-sans font-medium leading-tight line-clamp-2">
                  {node.label.split('. ')[1] || node.label}
                </span>
              </div>
              <div className="mt-2 text-[9px] font-data text-terminal-muted truncate">
                {node.example}
              </div>
            </button>
          );
        })}
      </div>

      {/* 選択されたステップの詳細パネル */}
      <div className="bg-terminal-panel p-4 border border-terminal-border mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-terminal-border">
          <div>
            <span className="text-[10px] font-data text-terminal-accent uppercase tracking-wider">
              STAGE DETAILS & RATIONALE
            </span>
            <h4 className="text-sm font-serif text-white mt-0.5">
              {selectedNode.label}
            </h4>
          </div>
          <div className="text-[10px] font-data text-terminal-muted bg-terminal-bg px-2.5 py-1 border border-terminal-border">
            REPRESENTATIVE: <span className="text-terminal-text font-semibold">{selectedNode.example}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs font-sans">
          <div className="p-3 bg-terminal-bg border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-muted uppercase block mb-1">
              PRIMARY FUNCTION & ROLE
            </span>
            <p className="text-terminal-text text-xs leading-relaxed">
              {selectedNode.role}
            </p>
          </div>

          <div className="p-3 bg-terminal-bg border border-terminal-border">
            <span className="text-[10px] font-data text-terminal-accent uppercase block mb-1">
              ECONOMIC INCENTIVE & MOTIVATION
            </span>
            <p className="text-terminal-text text-xs leading-relaxed">
              {selectedNode.motivation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
