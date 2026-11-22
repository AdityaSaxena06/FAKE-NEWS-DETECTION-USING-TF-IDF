import React from 'react';
import { CheckCircle2, AlertTriangle, Layers, ArrowRightLeft, ShieldAlert } from 'lucide-react';

export default function ComparisonWidget({ comparisonData }) {
  if (!comparisonData) return null;

  const { agreement, confidence_diff, models } = comparisonData;
  const lr = models?.logistic_regression;
  const nb = models?.naive_bayes;

  if (!lr || !nb) return null;

  return (
    <div className="p-6 rounded-3xl glass-card border border-slate-300 dark:border-navy-700">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-navy-700">
        <div className="flex items-center space-x-2">
          <ArrowRightLeft className="w-5 h-5 text-electric-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Dual-Model Consensus Analysis
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${
            agreement 
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
              : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
          }`}>
            {agreement ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Models In Full Agreement</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Model Predictions Diverged</span>
              </>
            )}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-navy-800 text-slate-300 border border-navy-700">
            Δ {confidence_diff}% Confidence
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logistic Regression Card */}
        <div className={`p-5 rounded-2xl border transition-all ${
          lr.prediction === 'REAL' 
            ? 'bg-emerald-950/20 border-emerald-500/30' 
            : 'bg-rose-950/20 border-rose-500/30'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
              Logistic Regression (Primary)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-electric-500/20 text-electric-300 border border-electric-500/30">
              99.07% Benchmark
            </span>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-black ${
              lr.prediction === 'REAL' ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {lr.prediction}
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              {lr.confidence}%
            </span>
          </div>

          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Real Probability:</span>
              <span className="font-mono text-emerald-400">{Math.round(lr.probabilities.real * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Fake Probability:</span>
              <span className="font-mono text-rose-400">{Math.round(lr.probabilities.fake * 100)}%</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-700/40 text-[11px]">
              <span>Latency:</span>
              <span className="font-mono">{lr.latency_ms} ms</span>
            </div>
          </div>
        </div>

        {/* Multinomial Naive Bayes Card */}
        <div className={`p-5 rounded-2xl border transition-all ${
          nb.prediction === 'REAL' 
            ? 'bg-emerald-950/20 border-emerald-500/30' 
            : 'bg-rose-950/20 border-rose-500/30'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Multinomial Naive Bayes
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              95.01% Benchmark
            </span>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-black ${
              nb.prediction === 'REAL' ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {nb.prediction}
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              {nb.confidence}%
            </span>
          </div>

          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Real Probability:</span>
              <span className="font-mono text-emerald-400">{Math.round(nb.probabilities.real * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Fake Probability:</span>
              <span className="font-mono text-rose-400">{Math.round(nb.probabilities.fake * 100)}%</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-700/40 text-[11px]">
              <span>Latency:</span>
              <span className="font-mono">{nb.latency_ms} ms</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong>Engine Consensus Note:</strong> Logistic Regression computes a high-dimensional hyperplane separating token weights, while Naive Bayes computes joint word frequencies assuming independence. Mutual agreement increases confidence in stylistic detection.
      </p>
    </div>
  );
}
