import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  Filter, 
  Database, 
  AlertTriangle, 
  ShieldCheck, 
  Code2, 
  GitBranch,
  CheckCircle2
} from 'lucide-react';
import PipelineDiagram from '../components/PipelineDiagram';

export default function AboutTechnologyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-electric-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Technical Architecture & ML Foundations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About TruthLens & Underlying Machine Learning
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          TruthLens is a complete reimagining of the academic project <strong>Fake News Detection Using TF-IDF</strong>. Below is the in-depth breakdown of the natural language processing pipeline, mathematical representations, dataset properties, and ethical limitations.
        </p>
      </div>

      {/* Architecture Pipeline Visualizer */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-electric-400" />
          <span>System Pipeline Architecture</span>
        </h2>
        <PipelineDiagram />
      </section>

      {/* 1. What is Fake News Detection? */}
      <section className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-electric-500/15 text-electric-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. The Fake News Challenge in Digital Media
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Fake news encompasses fabricated stories, misleading headlines, hyper-partisan propaganda, and sensationalist clickbait designed to mimic authentic journalism. With millions of articles generated daily across decentralized platforms, manual fact-checking organizations cannot scale at the speed of virality. Automated machine learning classification assists by detecting subtle lexical, stylistic, and vocabulary anomalies indicative of deceptive reporting.
        </p>
      </section>

      {/* 2. Text Preprocessing Pipeline */}
      <section className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Exact Preprocessing Pipeline (<code className="text-sm font-mono text-cyan-400">clean_text</code>)
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Raw internet text contains noise such as hyperlinks, HTML tags, punctuation, and non-standard whitespace that skew frequency counts. TruthLens preserves the exact 5-step regex pipeline from notebook cell 33:
        </p>
        
        <div className="p-4 rounded-2xl bg-navy-950 font-mono text-xs text-slate-200 border border-slate-800 overflow-x-auto">
          <code>
            {`def clean_text(text):
    if not isinstance(text, str):
        return ""
    # 1. Lowercase -> 2. Strip URLs -> 3. Strip HTML -> 4. Alphanumeric only -> 5. Normalize whitespace
    return re.sub(r'\\s+', ' ', 
           re.sub(r'[^a-zA-Z0-9\\s]', ' ', 
           re.sub(r'<.*?>', '', 
           re.sub(r'http\\S+|www\\S+', '', text.lower())))).strip()`}
          </code>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300 pt-2">
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Eliminates tracking parameters & web markup</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Harmonizes capital letters and punctuation variance</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Normalizes consecutive line breaks into single space</span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ensures byte-level parity between training and inference</span>
          </li>
        </ul>
      </section>

      {/* 3. TF-IDF Vectorization */}
      <section className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-electric-500/15 text-electric-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. TF-IDF Feature Engineering (<code className="text-sm font-mono text-electric-400">TfidfVectorizer</code>)
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Term Frequency–Inverse Document Frequency (TF-IDF) converts textual strings into numerical vectors. Rather than simply counting word presence, TF-IDF measures the statistical importance of a word in a specific article relative to the entire corpus.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-navy-950/70 border border-slate-300 dark:border-slate-800">
            <span className="text-xs font-bold text-electric-400 font-mono">Term Frequency: TF(t, d)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              The number of times token t appears in document d, divided by total words in d.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-navy-950/70 border border-slate-300 dark:border-slate-800">
            <span className="text-xs font-bold text-electric-400 font-mono">Inverse Document Frequency: IDF(t)</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Logarithmic ratio of total corpus documents N to documents containing token t: log(N / (1 + df(t))).
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
          <strong>Hyperparameters:</strong> TruthLens initializes <code className="font-mono text-slate-300">max_features=5000</code> and <code className="font-mono text-slate-300">ngram_range=(1, 2)</code>. This enables the model to identify both isolated terms (unigrams) and two-word collocations (bigrams) such as "white house", "breaking news", or "anonymous source".
        </p>
      </section>

      {/* 4. Machine Learning Estimators */}
      <section className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. Machine Learning Classifiers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logistic Regression */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-navy-950/70 border border-slate-300 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Logistic Regression</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-electric-500/20 text-electric-300 font-mono">99.07% Accuracy</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Supervised discriminative linear model mapping feature dot products to probabilities using the sigmoid activation function:
            </p>
            <div className="font-mono text-xs text-electric-400 py-1 bg-navy-900/60 p-2 rounded-lg border border-slate-800">
              P(Y=1|X) = 1 / (1 + exp(-(w^T x + b)))
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Trained with <code className="font-mono">max_iter=1000</code> and L2 regularization to prevent overfitting on rare vocabulary.
            </p>
          </div>

          {/* Multinomial Naive Bayes */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-navy-950/70 border border-slate-300 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Multinomial Naive Bayes</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">95.01% Accuracy</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generative probabilistic classifier applying Bayes Theorem under the conditional independence assumption:
            </p>
            <div className="font-mono text-xs text-emerald-400 py-1 bg-navy-900/60 p-2 rounded-lg border border-slate-800">
              P(C|X) ∝ P(C) * ∏ P(x_i | C)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Applies Laplace smoothing to handle unseen n-grams gracefully without producing zero-probability collapses.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dataset & Methodology */}
      <section className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-300 dark:border-navy-700/80 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. Dataset Architecture & Verification
          </h2>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The models were trained on the widely cited <strong>ISOT Fake News Dataset</strong> (Clément Bisaillon, University of Victoria). The corpus contains real articles compiled from Reuters news wires and fake articles sourced from flagged unverified websites.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-800">
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">23,481</div>
            <div className="text-[10px] text-slate-400">Fake News Articles</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-800">
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">21,417</div>
            <div className="text-[10px] text-slate-400">Real News Articles</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-800">
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">209</div>
            <div className="text-[10px] text-slate-400">Duplicates Pruned</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-800">
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">80 : 20</div>
            <div className="text-[10px] text-slate-400">Stratified Split</div>
          </div>
        </div>
      </section>

      {/* 6. Limitations & Ethical Notice */}
      <section className="p-6 sm:p-8 rounded-3xl bg-amber-50/80 dark:bg-navy-900/90 border border-amber-300 dark:border-amber-500/40 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            6. Dataset Bias & Critical Limitations
          </h2>
        </div>
        
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          While the test partition yielded an evaluated 99.07% accuracy, real-world deployment requires acknowledging fundamental statistical limitations:
        </p>

        <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <li className="flex items-start space-x-2">
            <span className="text-amber-400 font-bold">•</span>
            <span><strong>Corpus Source Bias:</strong> Real news articles in the ISOT dataset predominantly begin with standard Reuters news wire signatures (e.g., "WASHINGTON (Reuters)"). Models often learn publisher syntax as strong predictive signals.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-400 font-bold">•</span>
            <span><strong>Lack of World Knowledge:</strong> TF-IDF models assess vocabulary distribution and stylistic tone, not real-time factual truth or empirical database verification.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-400 font-bold">•</span>
            <span><strong>Satire, Sarcasm & Parody:</strong> Nuanced forms of satire (such as The Onion) often use journalistic syntax while describing absurd concepts, which statistical n-grams may misclassify.</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-400 font-bold">•</span>
            <span><strong>Temporal Concept Drift:</strong> Vocabulary evolves rapidly over time. Articles referencing newly emerging political figures or scientific breakthroughs not present in the 2016-2017 training corpus may receive ambiguous probabilities.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
