import React from 'react';
import { History, X, Trash2, ArrowUpRight, CheckCircle2, AlertOctagon, RotateCcw } from 'lucide-react';

export default function HistoryDrawer({ 
  isOpen, 
  onClose, 
  history, 
  onSelectScan, 
  onDeleteScan, 
  onClearHistory 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md h-full bg-white dark:bg-[#0E1528] border-l border-slate-300 dark:border-navy-700 shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-navy-700 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-electric-500/20 text-electric-400 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Analysis History</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{history.length} saved scans in localStorage</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scans List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 px-4">
              <History className="w-10 h-10 mb-2 text-slate-600" />
              <p className="text-sm font-medium">No previous scans found</p>
              <p className="text-xs text-slate-500 mt-1">
                Run an analysis on the detector dashboard to save results here automatically.
              </p>
            </div>
          ) : (
            history.map((scan) => {
              const isReal = scan.prediction === 'REAL';
              const dateStr = scan.timestamp ? new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
              return (
                <div 
                  key={scan.id} 
                  className="p-3.5 rounded-xl glass-card border border-slate-200 dark:border-navy-700/80 hover:border-electric-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1 border ${
                      isReal 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {isReal ? <CheckCircle2 className="w-3 h-3" /> : <AlertOctagon className="w-3 h-3" />}
                      <span>{scan.prediction} ({scan.confidence}%)</span>
                    </span>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                      <span>{scan.model_used?.split(' ')[0]}</span>
                      <span>•</span>
                      <span>{dateStr}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 font-mono">
                    "{scan.textSnippet || scan.cleaned_preview || 'Scanned text'}"
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        onSelectScan(scan);
                        onClose();
                      }}
                      className="text-xs text-electric-400 hover:text-electric-300 flex items-center space-x-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Re-load Scan</span>
                    </button>
                    <button
                      onClick={() => onDeleteScan(scan.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Delete from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-[#0A0F1D] flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1.5 font-medium px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
            <span className="text-[11px] text-slate-500">Persisted locally</span>
          </div>
        )}
      </div>
    </div>
  );
}
