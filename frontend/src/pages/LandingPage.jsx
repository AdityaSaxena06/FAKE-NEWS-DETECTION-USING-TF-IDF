import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Activity,
  Layers,
  FileCheck2
} from 'lucide-react';
import PipelineDiagram from '../components/PipelineDiagram';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-8">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-electric-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Tagline Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-navy-800/80 border border-electric-500/30 text-xs font-semibold text-electric-400 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-electric-400 animate-pulse" />
          <span>Next-Generation Natural Language Processing</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          See Beyond Headlines. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-blue-500 to-cyan-400">
            Detect What's Real.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          TruthLens is an AI-powered Fake News Detection platform transforming academic NLP research into a high-performance verification suite. Instant authenticity classification powered by TF-IDF and Scikit-Learn estimators.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-electric-500 hover:bg-electric-600 text-white font-bold text-base flex items-center justify-center space-x-2.5 shadow-glow-blue transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Analyze News Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onNavigate('technology')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-navy-850 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-800 dark:text-slate-200 font-bold text-base border border-slate-300 dark:border-navy-700 transition-all duration-200"
          >
            <span>Explore Technology</span>
          </button>
        </div>

        {/* Live Key Metrics Pill Row */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-navy-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">99.07%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Reported Accuracy (LogReg)</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">5,000</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">TF-IDF n-gram Features</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">44,689</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cleaned Corpus Articles</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">&lt; 20 ms</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Inference Response Time</div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Engineered for Precision & Clarity
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Every layer from regex text cleaning to probability calibration is built on reproducible machine learning standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80">
            <div className="w-12 h-12 rounded-2xl bg-electric-500/15 text-electric-400 flex items-center justify-center mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Dual-Engine Classification
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Toggle between high-accuracy Logistic Regression (99.07% test benchmark) and probabilistic Multinomial Naive Bayes (95.01%) for consensus validation.
            </p>
            <div className="text-xs text-electric-400 font-semibold flex items-center space-x-1">
              <span>Compare both simultaneously</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-5">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              TF-IDF Feature Space
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Transforms natural language headlines and lengthy articles into 5,000 statistical unigram and bigram tokens weighted by inverse document rarity.
            </p>
            <div className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
              <span>Sub-20ms vectorization</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-5">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Exportable Audit Reports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Generate structured Markdown audit summaries with token diagnostics, probability splits, and metadata ready for archival and portfolio presentation.
            </p>
            <div className="text-xs text-cyan-400 font-semibold flex items-center space-x-1">
              <span>One-click download & copy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Pipeline Architecture Diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PipelineDiagram />
      </section>

      {/* Model Benchmark Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-electric-500/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
                Evaluation Benchmarks
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 mb-4">
                Tested on 8,938 Unseen Articles
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Trained with an 80/20 stratified split on the ISOT News corpus. Both estimators demonstrate strong classification power on stylistic patterns, with Logistic Regression achieving near-perfect separation on test benchmarks.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span><strong>Logistic Regression:</strong> 99.07% Accuracy | 99.32% Precision | 99.11% F1</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span><strong>Multinomial Naive Bayes:</strong> 95.01% Accuracy | 95.37% Precision | 95.25% F1</span>
                </div>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('comparison')}
                  className="px-6 py-3 rounded-xl bg-electric-500 hover:bg-electric-600 text-white font-bold text-sm shadow-glow-blue transition-all"
                >
                  View Full Metric Comparison
                </button>
              </div>
            </div>

            {/* Comparison Visual Mini-Card */}
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-navy-950/80 border border-slate-700/50 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Reported Test Performance
              </h4>

              {/* LogReg Bar */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-900 dark:text-white">
                  <span>Logistic Regression</span>
                  <span className="font-mono text-electric-400">99.07%</span>
                </div>
                <div className="h-2.5 w-full bg-navy-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-electric-400 rounded-full" style={{ width: '99.07%' }} />
                </div>
              </div>

              {/* Naive Bayes Bar */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-900 dark:text-white">
                  <span>Multinomial Naive Bayes</span>
                  <span className="font-mono text-cyan-400">95.01%</span>
                </div>
                <div className="h-2.5 w-full bg-navy-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full" style={{ width: '95.01%' }} />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-800">
                Evaluation results reported on the 8,938 test partition in original research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Section */}
      <section className="text-center max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Ready to verify news articles?
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Paste any headline or article into the TruthLens workspace for instant AI-backed analysis.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="mt-6 px-8 py-3.5 rounded-2xl bg-electric-500 hover:bg-electric-600 text-white font-bold text-sm shadow-glow-blue transition-all"
        >
          Launch News Detection Console
        </button>
      </section>
    </div>
  );
}
