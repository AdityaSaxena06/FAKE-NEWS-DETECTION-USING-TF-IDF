import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertOctagon, 
  Copy, 
  Check, 
  Download, 
  Clock, 
  Layers, 
  FileText, 
  Info,
  Share2
} from 'lucide-react';

export default function PredictionCard({ result, rawText }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const isReal = result.prediction === 'REAL';
  const confidence = result.confidence || 0;
  const probFake = Math.round((result.probabilities?.fake || 0) * 10000) / 100;
  const probReal = Math.round((result.probabilities?.real || 0) * 10000) / 100;

  const handleCopy = () => {
    const summary = `[TruthLens Analysis Result]
Prediction: ${result.prediction} (${confidence}% Confidence)
Model: ${result.model_used}
Probabilities: Real: ${probReal}%, Fake: ${probFake}%
Latency: ${result.latency_ms} ms
Input Snippet: "${rawText.slice(0, 160)}..."
Evaluated via TruthLens AI (https://github.com/AdityaSaxena06/FAKE-NEWS-DETECTION-USING-TF-IDF)`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadReport = () => {
    const report = `# TruthLens AI - News Authenticity Analysis Report
Generated: ${new Date().toUTCString()}
Platform: TruthLens AI Fake News Detector (TF-IDF + Scikit-Learn)

------------------------------------------------------------
VERDICT: ${result.prediction}
CONFIDENCE SCORE: ${confidence}%
PRIMARY MODEL: ${result.model_used}
INFERENCE LATENCY: ${result.latency_ms} ms
------------------------------------------------------------

## Probabilistic Class Distribution
- Probability [REAL]: ${probReal}%
- Probability [FAKE]: ${probFake}%

## Document Diagnostics
- Original Character Count: ${result.raw_char_count || rawText.length}
- Word Count: ${result.word_count || rawText.split(/\s+/).length}

## Preprocessed Text Representation (TF-IDF Input)
${result.cleaned_preview || 'Cleaned via regex pipeline'}

## Raw Article Analyzed
${rawText}

------------------------------------------------------------
DISCLAIMER:
This report was generated using Machine Learning models trained on the ISOT News Dataset. 
Probabilities reflect stylistic and vocabulary correlations with historical fake news patterns 
and must be considered alongside professional journalism and independent fact-checking.
`;

    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TruthLens_Report_${result.prediction}_${Date.now()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
      isReal 
        ? 'bg-gradient-to-b from-[#0F2322]/90 to-[#0B151F]/90 border-emerald-500/40 shadow-glow-real' 
        : 'bg-gradient-to-b from-[#2B1019]/90 to-[#150B14]/90 border-rose-500/40 shadow-glow-fake'
    }`}>
      {/* Top Header Badge Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-700/40">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isReal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}>
            {isReal ? <CheckCircle2 className="w-7 h-7" /> : <AlertOctagon className="w-7 h-7" />}
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Prediction Verdict
            </span>
            <div className="flex items-center space-x-3">
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isReal ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {result.prediction} NEWS
              </h2>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-200 dark:bg-navy-800/80 text-slate-800 dark:text-slate-200 hover:bg-navy-700 transition-colors border border-slate-300 dark:border-navy-700"
            title="Copy analysis summary to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-electric-500/20 text-electric-300 hover:bg-electric-500/30 transition-colors border border-electric-500/30"
            title="Download full Markdown report"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Metrics Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {/* Confidence Card */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-700/30">
          <span className="text-xs text-slate-500 dark:text-slate-400">Model Confidence</span>
          <div className="mt-1 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {confidence}%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Probability assigned to the predicted class
          </p>
        </div>

        {/* Model Engine Card */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-700/30">
          <span className="text-xs text-slate-500 dark:text-slate-400">Classifier Used</span>
          <div className="mt-1 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-electric-400" />
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {result.model_used}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            {result.model_id === 'logistic_regression' ? '99.07% reported benchmark' : '95.01% reported benchmark'}
          </p>
        </div>

        {/* Inference Latency Card */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-700/30">
          <span className="text-xs text-slate-500 dark:text-slate-400">Inference Latency</span>
          <div className="mt-1 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {result.latency_ms} <span className="text-sm font-normal text-slate-400">ms</span>
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            {result.word_count || 0} words analyzed
          </p>
        </div>
      </div>

      {/* Class Probability Distribution Meter */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-navy-900/60 border border-slate-700/30">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-rose-400 flex items-center space-x-1">
            <span>Fake Probability:</span>
            <span className="font-mono text-sm">{probFake}%</span>
          </span>
          <span className="text-emerald-400 flex items-center space-x-1">
            <span>Real Probability:</span>
            <span className="font-mono text-sm">{probReal}%</span>
          </span>
        </div>

        {/* Dual Stacked Progress Bar */}
        <div className="h-3.5 w-full bg-navy-950 rounded-full overflow-hidden flex p-0.5 border border-slate-700/50">
          <div 
            style={{ width: `${probFake}%` }} 
            className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-l-full transition-all duration-500" 
            title={`Fake: ${probFake}%`}
          />
          <div 
            style={{ width: `${probReal}%` }} 
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-r-full transition-all duration-500" 
            title={`Real: ${probReal}%`}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
          <span>0.0 (Unlikely Real)</span>
          <span className="text-slate-500">50% Decision Threshold</span>
          <span>1.0 (Highly Likely Real)</span>
        </div>
      </div>

      {/* Cleaned Preprocessing Preview */}
      {result.cleaned_preview && (
        <div className="mt-4 p-3.5 rounded-xl bg-slate-100 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            <FileText className="w-3.5 h-3.5 text-electric-400" />
            <span>Normalized TF-IDF Input (Regex Preprocessed):</span>
          </div>
          <p className="text-xs font-mono text-slate-700 dark:text-slate-300 line-clamp-2">
            "{result.cleaned_preview}"
          </p>
        </div>
      )}

      {/* Subtle Disclaimer Banner */}
      <div className="mt-5 flex items-center space-x-2 text-[11px] text-slate-600 dark:text-slate-400/90">
        <Info className="w-3.5 h-3.5 text-electric-400 shrink-0" />
        <p>
          TruthLens provides ML-based statistical estimates. Confidence reflects similarity to training patterns, not absolute factual certainty.
        </p>
      </div>
    </div>
  );
}
