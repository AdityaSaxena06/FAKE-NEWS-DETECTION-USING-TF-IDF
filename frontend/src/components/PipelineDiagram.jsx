import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  ArrowDown, 
  Info 
} from 'lucide-react';

export default function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'input',
      title: '1. Raw Text Ingestion',
      icon: FileText,
      badge: 'String Payload',
      description: 'Accepts raw headline or complete article text submitted via REST API or the dashboard interface.',
      details: 'Accepts up to 50,000 characters. Preserves sentence structure and token order prior to cleaning.',
    },
    {
      id: 'cleaning',
      title: '2. Regex Preprocessing',
      icon: Sparkles,
      badge: 'Normalization',
      description: 'Executes the exact 5-step regex pipeline from the academic notebook to sanitize noise.',
      details: '1. Lowercasing • 2. URL removal (http/www) • 3. HTML tag stripping (<...>) • 4. Non-alphanumeric removal • 5. Whitespace consolidation.',
    },
    {
      id: 'tfidf',
      title: '3. TF-IDF Vectorization',
      icon: Layers,
      badge: '5,000 Dimensions',
      description: 'Maps the cleaned string into a sparse 5,000-dimensional numerical feature space.',
      details: 'Configured with ngram_range=(1, 2) to capture individual unigrams and contextual bigrams. Evaluates term frequency weighted by inverse document rarity.',
    },
    {
      id: 'inference',
      title: '4. Model Inference',
      icon: Cpu,
      badge: 'Dual Classifiers',
      description: 'Evaluates the vector representation using trained Scikit-Learn estimators.',
      details: 'Logistic Regression (99.07% benchmark accuracy) computes linear decision boundary; Multinomial Naive Bayes (95.01%) computes joint token probabilities.',
    },
    {
      id: 'output',
      title: '5. Calibrated Verdict',
      icon: CheckCircle,
      badge: 'REAL or FAKE',
      description: 'Generates the final binary classification alongside confidence probability scores.',
      details: 'Outputs class probabilities (predict_proba), millisecond execution latency, and formatted analysis diagnostics.',
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
            System Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            End-to-End Prediction Pipeline
          </h3>
        </div>
        <span className="text-xs text-slate-600 dark:text-slate-400">
          Click any stage to view algorithmic specifications
        </span>
      </div>

      {/* Pipeline Flow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'bg-electric-500/15 border-electric-500 shadow-glow-blue scale-[1.02]'
                  : 'bg-slate-100 dark:bg-navy-900/60/60 border-slate-200 dark:border-navy-700/70 hover:border-slate-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-electric-500 text-white' : 'bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Step {idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {step.title.split('. ')[1]}
                </h4>
                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-electric-400 font-mono mb-2">
                  {step.badge}
                </span>
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-2">
                {step.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Step Deep Dive Panel */}
      <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-navy-950/80 border border-electric-500/30 flex items-start space-x-4">
        <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {steps[activeStep].title} — Technical Deep Dive
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
            {steps[activeStep].details}
          </p>
        </div>
      </div>
    </div>
  );
}
