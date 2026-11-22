import React, { useState } from 'react';
import { 
  Sparkles, 
  Trash2, 
  Send, 
  Loader2, 
  AlertCircle, 
  Cpu, 
  Layers, 
  ArrowRightLeft,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { predictNews, compareModels } from '../services/api';
import { saveScan } from '../services/storage';
import PredictionCard from '../components/PredictionCard';
import ComparisonWidget from '../components/ComparisonWidget';
import SampleNewsSelector from '../components/SampleNewsSelector';

export default function DashboardPage({ onScanCompleted }) {
  const [text, setText] = useState('');
  const [selectedModel, setSelectedModel] = useState('logistic_regression');
  const [runComparison, setRunComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) {
      setError('Please paste or type a news headline or article to analyze.');
      return;
    }
    if (text.trim().length < 5) {
      setError('Text is too short. Please provide at least 5 characters.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setPredictionResult(null);
    setComparisonResult(null);

    try {
      if (runComparison) {
        const comp = await compareModels(text);
        setComparisonResult(comp);
        setPredictionResult(comp.models.logistic_regression);

        // Save scan to history
        saveScan({
          textSnippet: text.slice(0, 160),
          prediction: comp.primary_prediction,
          confidence: comp.models.logistic_regression.confidence,
          model_used: 'Consensus (Both Models)',
          raw_char_count: charCount,
          word_count: wordCount,
        });
      } else {
        const res = await predictNews(text, selectedModel);
        setPredictionResult(res);

        // Save scan to history
        saveScan({
          textSnippet: text.slice(0, 160),
          prediction: res.prediction,
          confidence: res.confidence,
          model_used: res.model_used,
          raw_char_count: charCount,
          word_count: wordCount,
        });
      }

      if (onScanCompleted) onScanCompleted();
    } catch (err) {
      console.error('Inference error:', err);
      setError(err.message || 'Failed to complete analysis. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setPredictionResult(null);
    setComparisonResult(null);
    setError(null);
  };

  const handleSelectSample = (sampleText) => {
    setText(sampleText);
    setError(null);
    // Smooth scroll to input
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-electric-400 mb-1">
          <Cpu className="w-4 h-4" />
          <span>Real-Time Inference Console</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          News Detection Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Paste any headline, social media claim, or full-length journalistic article to run real-time classification against our TF-IDF and Scikit-Learn models.
        </p>
      </div>

      {/* Main Analysis Workspace */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-6">
        {/* Model Selection Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-700/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mr-1">
              Select Estimator:
            </span>

            {/* Model Pill 1: Logistic Regression */}
            <button
              type="button"
              onClick={() => {
                setSelectedModel('logistic_regression');
                setRunComparison(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                selectedModel === 'logistic_regression' && !runComparison
                  ? 'bg-electric-500 text-white shadow-glow-blue'
                  : 'bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-navy-700'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Logistic Regression (99.07%)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 font-bold">Recommended</span>
            </button>

            {/* Model Pill 2: Naive Bayes */}
            <button
              type="button"
              onClick={() => {
                setSelectedModel('naive_bayes');
                setRunComparison(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                selectedModel === 'naive_bayes' && !runComparison
                  ? 'bg-electric-500 text-white shadow-glow-blue'
                  : 'bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-navy-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Multinomial NB (95.01%)</span>
            </button>
          </div>

          {/* Dual Consensus Mode Toggle */}
          <button
            type="button"
            onClick={() => setRunComparison(!runComparison)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-2 border transition-all ${
              runComparison
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                : 'bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-navy-700 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dual Consensus Mode</span>
            {runComparison && <span className="text-[10px] font-bold text-cyan-300">ACTIVE</span>}
          </button>
        </div>

        {/* Text Input Area */}
        <div className="space-y-2">
          <label htmlFor="news-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Article or Headline Content
          </label>
          <div className="relative">
            <textarea
              id="news-input"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a news headline or article here... (supports both short breaking headlines and full-length investigative pieces)"
              className="w-full p-4 rounded-2xl bg-white dark:bg-navy-950/80 border border-slate-300 dark:border-navy-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500 text-sm leading-relaxed transition-all resize-y font-sans"
            />
          </div>

          {/* Input Counters & Diagnostics */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1">
            <div className="flex items-center space-x-4">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{charCount} characters</span>
              {wordCount > 0 && wordCount < 10 && (
                <span className="text-amber-400/90 text-[11px]">
                  (Short headline detected)
                </span>
              )}
            </div>

            <div className="text-[11px] text-slate-500">
              Cleaned via lowercasing, regex URL/HTML stripping, and unigram/bigram tokenization
            </div>
          </div>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleClear}
            disabled={!text && !predictionResult}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-navy-800 transition-colors flex items-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Input</span>
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isLoading || !text.trim()}
            className="px-8 py-3 rounded-2xl bg-electric-500 hover:bg-electric-600 text-white font-bold text-sm shadow-glow-blue transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running TF-IDF Inference...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{runComparison ? 'Compare Both Models' : 'Analyze News Authenticity'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {predictionResult && (
        <div className="space-y-6 animate-fadeIn">
          <PredictionCard result={predictionResult} rawText={text} />
          {comparisonResult && (
            <ComparisonWidget comparisonData={comparisonResult} />
          )}
        </div>
      )}

      {/* Sample News Chips Selector */}
      <div className="pt-4">
        <SampleNewsSelector onSelectSample={handleSelectSample} />
      </div>
    </div>
  );
}
