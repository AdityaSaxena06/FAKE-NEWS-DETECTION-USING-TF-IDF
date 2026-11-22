import React, { useState } from 'react';
import { SAMPLE_NEWS } from '../services/sampleNews';
import { Sparkles, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function SampleNewsSelector({ onSelectSample }) {
  const [filter, setFilter] = useState('ALL');

  const filteredSamples = SAMPLE_NEWS.filter(sample => {
    if (filter === 'REAL') return sample.type === 'REAL';
    if (filter === 'FAKE') return sample.type === 'FAKE';
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-electric-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Pre-loaded Test Samples
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-1.5 text-xs">
          {['ALL', 'REAL', 'FAKE'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filter === type
                  ? 'bg-electric-500 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {type === 'ALL' ? 'All Samples' : type === 'REAL' ? 'Verified Real' : 'Known Fake'}
            </button>
          ))}
        </div>
      </div>

      {/* Samples Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filteredSamples.map(sample => {
          const isReal = sample.type === 'REAL';
          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample.fullText)}
              className="p-3 rounded-xl glass-card border border-slate-300 dark:border-navy-700/60 hover:border-electric-500/50 cursor-pointer group transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isReal
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {sample.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {sample.fullText.split(/\s+/).length} words
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-electric-400 transition-colors">
                  {sample.title}
                </h4>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-electric-400 group-hover:translate-x-0.5 transition-transform">
                <span>Load Sample</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
