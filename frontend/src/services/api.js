/**
 * TruthLens API Service
 * Communicates with the FastAPI backend.
 */

const API_BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`Health check returned status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API Health check failed:', err);
    return { status: 'offline', error: err.message };
  }
}

export async function predictNews(text, model = 'logistic_regression') {
  if (!text || !text.trim()) {
    throw new Error('Please enter a headline or article text to analyze.');
  }

  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      text: text.trim(),
      model: model,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.detail || (data.message) || `Inference request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data.data;
}

export async function compareModels(text) {
  if (!text || !text.trim()) {
    throw new Error('Please enter text to compare models.');
  }

  const response = await fetch(`${API_BASE}/compare`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      text: text.trim(),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.detail || (data.message) || `Comparison request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data.data;
}

export async function getModelMetadata() {
  try {
    const res = await fetch(`${API_BASE}/metadata`);
    if (!res.ok) throw new Error(`Failed to load metadata: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Could not fetch remote model metadata:', err);
    return null;
  }
}
