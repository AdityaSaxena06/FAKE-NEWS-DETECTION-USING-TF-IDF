import React from 'react';
import { ShieldCheck, ExternalLink, AlertTriangle, Heart } from 'lucide-react';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-navy-700/60 bg-slate-50 dark:bg-[#070A14] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-electric-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                Truth<span className="text-electric-500">Lens</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              An AI-powered full-stack platform transforming academic NLP research into a production-grade Fake News Detection suite. Built with Scikit-learn, TF-IDF feature extraction, FastAPI, and React.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-xs rounded-md bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-mono">
                TF-IDF (5,000 n-grams)
              </span>
              <span className="px-2.5 py-1 text-xs rounded-md bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-mono">
                Logistic Regression (99.07%)
              </span>
              <span className="px-2.5 py-1 text-xs rounded-md bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-mono">
                Multinomial NB (95.01%)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-electric-400 transition-colors">
                  Overview & Hero
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-electric-400 transition-colors">
                  News Detection Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('comparison')} className="hover:text-electric-400 transition-colors">
                  Model Benchmark Comparison
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('technology')} className="hover:text-electric-400 transition-colors">
                  NLP Pipeline & Math
                </button>
              </li>
            </ul>
          </div>

          {/* Open Source & Original Project */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-3">
              Source & Research
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a 
                  href="https://github.com/AdityaSaxena06/FAKE-NEWS-DETECTION-USING-TF-IDF" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-electric-400 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Original GitHub Repo</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Based on research by Aditya Saxena & collaborative team
                </span>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Dataset: ISOT News Dataset (44,689 articles)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical & Machine Learning Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-navy-800/80">
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-amber-50/80 dark:bg-navy-850/80 border border-amber-200/80 dark:border-navy-700/60 text-xs text-slate-700 dark:text-slate-400">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-900 dark:text-slate-200">Academic & Evaluative Notice:</strong> TruthLens produces statistical estimates using textual feature patterns extracted from its training corpus. Confidence scores reflect model certainty within the learned TF-IDF feature space and do NOT represent an absolute guarantee or a substitute for independent fact-checking and reputable editorial verification.
            </p>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TruthLens Platform. Built for portfolio & showcase.</p>
            <p className="flex items-center space-x-1 mt-2 sm:mt-0">
              <span>Engineered with Python, FastAPI & React</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
