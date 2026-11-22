import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRightLeft, 
  Sliders, 
  Sparkles,
  Info
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { compareModels } from '../services/api';

export default function ModelComparisonPage() {
  const [testText, setTestText] = useState(
    'WASHINGTON (Reuters) - Federal officials announced sweeping updates to energy efficiency standards across commercial facilities.'
  );
  const [compareResult, setCompareResult] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [compareError, setCompareError] = useState(null);

  // Reported metrics data from notebook and README
  const comparisonData = [
    {
      metric: 'Accuracy',
      'Logistic Regression': 99.07,
      'Multinomial Naive Bayes': 95.01,
    },
    {
      metric: 'Precision (Fake)',
      'Logistic Regression': 99.32,
      'Multinomial Naive Bayes': 95.37,
    },
    {
      metric: 'Recall (Fake)',
      'Logistic Regression': 98.91,
      'Multinomial Naive Bayes': 95.12,
    },
    {
      metric: 'F1-Score (Fake)',
      'Logistic Regression': 99.11,
      'Multinomial Naive Bayes': 95.25,
    },
  ];

  const handleRunLiveComparison = async () => {
    if (!testText.trim()) return;
    setIsComparing(true);
    setCompareError(null);
    try {
      const res = await compareModels(testText);
      setCompareResult(res);
    } catch (err) {
      setCompareError(err.message || 'Comparison failed');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-electric-400 mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Empirical Evaluation & Benchmarking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Model Comparison & Architecture Trade-offs
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Detailed comparison of the two classifiers implemented in the original academic project. Both models were trained and evaluated on identical 80/20 stratified splits of the ISOT news corpus (8,938 test samples) with 5,000 TF-IDF features.
        </p>
      </div>

      {/* Reported Benchmarks Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-navy-850/90 border border-amber-200 dark:border-electric-500/30 flex items-start space-x-3 text-xs text-slate-700 dark:text-slate-300">
        <Info className="w-5 h-5 text-amber-600 dark:text-electric-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-900 dark:text-white">Evaluation Context:</strong> The metrics below reflect reported test set evaluations from the original research repository. Real-world generalization may vary depending on shifts in journalistic style, emerging political topics, and adversarial manipulation.
        </p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Accuracy (LogReg)"
          value="99.07%"
          subtitle="+4.06% advantage over Naive Bayes on test set"
          icon={Cpu}
          badge="Top Performer"
          badgeColor="green"
          highlight={true}
        />
        <MetricCard
          title="Precision (LogReg)"
          value="99.32%"
          subtitle="Minimal false positive rate for fake news detection"
          icon={CheckCircle2}
          badge="High Reliability"
          badgeColor="blue"
        />
        <MetricCard
          title="Accuracy (Naive Bayes)"
          value="95.01%"
          subtitle="Strong baseline using probabilistic joint counts"
          icon={Layers}
          badge="Fast Baseline"
          badgeColor="blue"
        />
        <MetricCard
          title="F1-Score (Naive Bayes)"
          value="95.25%"
          subtitle="Balanced harmonic mean of precision & recall"
          icon={BarChart3}
          badge="Stable Score"
          badgeColor="blue"
        />
      </div>

      {/* Interactive Recharts Visualization */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
              Comparative Chart
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Evaluation Metrics Comparison (Test Partition: 8,938 Articles)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Metrics reported for Fake News Class (Label 0)
          </span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A68" opacity={0.3} />
              <XAxis 
                dataKey="metric" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              <YAxis 
                domain={[90, 100]} 
                unit="%" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0E1528', 
                  borderColor: '#2A3A68', 
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="Logistic Regression" fill="#4F8CFF" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Multinomial Naive Bayes" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Side-by-Side Model Specifications Table */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
            Algorithmic Trade-offs
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Model Specifications & Characteristics
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-navy-700/80 text-xs uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Feature / Metric</th>
                <th className="py-3 px-4 text-electric-400 font-bold">Logistic Regression</th>
                <th className="py-3 px-4 text-emerald-400 font-bold">Multinomial Naive Bayes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-navy-800/60 text-slate-700 dark:text-slate-300 font-sans">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Reported Accuracy</td>
                <td className="py-3.5 px-4 font-mono font-bold text-electric-400">99.07%</td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">95.01%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Reported Precision (Fake)</td>
                <td className="py-3.5 px-4 font-mono text-electric-400">99.32%</td>
                <td className="py-3.5 px-4 font-mono text-emerald-400">95.37%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Reported Recall (Fake)</td>
                <td className="py-3.5 px-4 font-mono text-electric-400">98.91%</td>
                <td className="py-3.5 px-4 font-mono text-emerald-400">95.12%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Reported F1-Score (Fake)</td>
                <td className="py-3.5 px-4 font-mono text-electric-400">99.11%</td>
                <td className="py-3.5 px-4 font-mono text-emerald-400">95.25%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Model Nature</td>
                <td className="py-3.5 px-4">Discriminative (Learns P(Y|X))</td>
                <td className="py-3.5 px-4">Generative (Learns P(X,Y))</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Core Assumption</td>
                <td className="py-3.5 px-4">Linear decision boundary across feature space</td>
                <td className="py-3.5 px-4">Conditional independence of all tokens given class</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Inference Latency</td>
                <td className="py-3.5 px-4 font-mono text-xs">~ 1.5 ms vector dot product</td>
                <td className="py-3.5 px-4 font-mono text-xs">~ 0.5 ms log-probability sum</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">Serialized Size</td>
                <td className="py-3.5 px-4 font-mono text-xs">39.9 KB (sparse weights)</td>
                <td className="py-3.5 px-4 font-mono text-xs">157.0 KB (log-likelihood matrix)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Dual-Model Test Console */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-6">
        <div className="flex items-center space-x-2">
          <ArrowRightLeft className="w-5 h-5 text-electric-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Live Dual-Model Cross-Validation
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Run any arbitrary text through both models simultaneously using the backend <code className="font-mono text-electric-400">/compare</code> endpoint to observe decision alignment.
        </p>

        <div className="space-y-3">
          <textarea
            rows={3}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full p-3 rounded-xl bg-white dark:bg-navy-950/80 border border-slate-300 dark:border-navy-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-electric-500 font-sans"
            placeholder="Type or paste sample text here..."
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">{testText.length} characters</span>
            <button
              onClick={handleRunLiveComparison}
              disabled={isComparing || !testText.trim()}
              className="px-5 py-2 rounded-xl bg-electric-500 hover:bg-electric-600 text-white text-xs font-bold transition-all shadow-glow-blue disabled:opacity-50"
            >
              {isComparing ? 'Comparing...' : 'Run Dual Cross-Check'}
            </button>
          </div>
        </div>

        {compareError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {compareError}
          </div>
        )}

        {compareResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-navy-900/60 border border-slate-700/40">
              <span className="text-xs font-bold text-electric-400">Logistic Regression</span>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {compareResult.models.logistic_regression.prediction} ({compareResult.models.logistic_regression.confidence}%)
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                Latency: {compareResult.models.logistic_regression.latency_ms} ms
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-navy-900/60 border border-slate-700/40">
              <span className="text-xs font-bold text-emerald-400">Multinomial Naive Bayes</span>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {compareResult.models.naive_bayes.prediction} ({compareResult.models.naive_bayes.confidence}%)
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                Latency: {compareResult.models.naive_bayes.latency_ms} ms
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
