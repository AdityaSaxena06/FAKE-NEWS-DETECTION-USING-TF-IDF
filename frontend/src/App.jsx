import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HistoryDrawer from './components/HistoryDrawer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ModelComparisonPage from './pages/ModelComparisonPage';
import AboutTechnologyPage from './pages/AboutTechnologyPage';

import { useTheme } from './hooks/useTheme';
import { checkHealth } from './services/api';
import { getHistory, deleteScan, clearHistory } from './services/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [backendStatus, setBackendStatus] = useState('connecting');

  const { isDark, toggleTheme } = useTheme();

  // Load history from storage
  const refreshHistory = () => {
    setHistory(getHistory());
  };

  useEffect(() => {
    refreshHistory();

    // Check backend health
    checkHealth().then((health) => {
      if (health && health.status === 'healthy') {
        setBackendStatus('healthy');
      } else {
        setBackendStatus('offline');
      }
    });

    // Re-check health every 30 seconds
    const interval = setInterval(() => {
      checkHealth().then((health) => {
        setBackendStatus(health && health.status === 'healthy' ? 'healthy' : 'offline');
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteScan = (id) => {
    const updated = deleteScan(id);
    setHistory(updated);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleSelectScan = (scan) => {
    setActiveTab('dashboard');
    // Pre-populate input in dashboard if needed
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0B1020] dark:text-slate-100 transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        historyCount={history.length}
        openHistory={() => setHistoryOpen(true)}
        backendStatus={backendStatus}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage onScanCompleted={refreshHistory} />
        )}

        {activeTab === 'comparison' && (
          <ModelComparisonPage />
        )}

        {activeTab === 'technology' && (
          <AboutTechnologyPage />
        )}
      </main>

      {/* Slide-out History Drawer */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onSelectScan={handleSelectScan}
        onDeleteScan={handleDeleteScan}
        onClearHistory={handleClearHistory}
      />

      {/* Global Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}
