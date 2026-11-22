/**
 * LocalStorage Service for TruthLens Analysis History
 */

const STORAGE_KEY = 'truthlens_history_v1';
const MAX_HISTORY = 25;

export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse history from localStorage:', err);
    return [];
  }
}

export function saveScan(scan) {
  try {
    const existing = getHistory();
    const entry = {
      id: `scan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...scan,
    };
    const updated = [entry, ...existing.filter(item => item.id !== entry.id)].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return entry;
  } catch (err) {
    console.error('Failed to save scan to localStorage:', err);
    return scan;
  }
}

export function deleteScan(id) {
  try {
    const existing = getHistory();
    const filtered = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete scan from localStorage:', err);
    return [];
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (err) {
    console.error('Failed to clear history from localStorage:', err);
    return [];
  }
}
