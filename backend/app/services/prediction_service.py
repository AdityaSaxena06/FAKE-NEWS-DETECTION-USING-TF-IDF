"""
Prediction Service
Loads models and executes inference pipelines with probability calibration.
"""

import os
import time
import json
import logging
from typing import Dict, Any, Optional, Tuple
import joblib
import numpy as np

from app.utils.preprocessing import clean_text

logger = logging.getLogger("truthlens.prediction_service")

MODELS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "models"))
TFIDF_PATH = os.path.join(MODELS_DIR, "tfidf_vectorizer.joblib")
NB_PATH = os.path.join(MODELS_DIR, "naive_bayes_model.joblib")
LR_PATH = os.path.join(MODELS_DIR, "logistic_regression_model.joblib")
METADATA_PATH = os.path.join(MODELS_DIR, "model_metadata.json")

class PredictionService:
    def __init__(self):
        self.tfidf = None
        self.nb_model = None
        self.lr_model = None
        self.metadata = {}
        self.loaded = False
        self.load_models()

    def load_models(self):
        """Loads vectorizer and model binaries from disk."""
        try:
            if os.path.exists(TFIDF_PATH) and os.path.exists(LR_PATH) and os.path.exists(NB_PATH):
                logger.info("Loading ML models from %s", MODELS_DIR)
                self.tfidf = joblib.load(TFIDF_PATH)
                self.nb_model = joblib.load(NB_PATH)
                self.lr_model = joblib.load(LR_PATH)
                self.loaded = True
                logger.info("Models loaded successfully. TF-IDF features: %d", len(self.tfidf.vocabulary_))
            else:
                logger.warning("Model files not found in %s. Run train_and_export.py first.", MODELS_DIR)
                self.loaded = False

            if os.path.exists(METADATA_PATH):
                with open(METADATA_PATH, "r", encoding="utf-8") as f:
                    self.metadata = json.load(f)
            else:
                # Default reported evaluation metrics from README & notebook
                self.metadata = {
                    "reported_metrics": {
                        "naive_bayes": {
                            "name": "Multinomial Naive Bayes",
                            "accuracy": 0.9501,
                            "precision_fake": 0.9537,
                            "recall_fake": 0.9512,
                            "f1_fake": 0.9525,
                            "confusion_matrix": [[4467, 229], [217, 4025]]
                        },
                        "logistic_regression": {
                            "name": "Logistic Regression",
                            "accuracy": 0.9907,
                            "precision_fake": 0.9932,
                            "recall_fake": 0.9891,
                            "f1_fake": 0.9911,
                            "confusion_matrix": [[4645, 51], [32, 4210]]
                        }
                    }
                }
        except Exception as e:
            logger.error("Error loading models: %s", str(e), exc_info=True)
            self.loaded = False

    def is_ready(self) -> bool:
        return self.loaded and (self.tfidf is not None) and (self.lr_model is not None)

    def _get_model(self, model_id: str):
        normalized = model_id.lower().replace("-", "_").strip()
        if normalized in ["naive_bayes", "multinomial_nb", "nb"]:
            return self.nb_model, "Multinomial Naive Bayes", "naive_bayes"
        # Default to Logistic Regression
        return self.lr_model, "Logistic Regression", "logistic_regression"

    def predict(self, text: str, model_id: str = "logistic_regression") -> Dict[str, Any]:
        """
        Executes prediction on given text using the selected model.
        Returns prediction ('REAL' or 'FAKE'), confidence %, probabilities, latency, and details.
        """
        if not self.is_ready():
            raise RuntimeError("Models are not loaded on backend. Please ensure model files exist.")

        start_time = time.perf_counter()

        raw_length = len(text)
        word_count = len(text.split())

        # Preprocessing: notebook clean_text
        cleaned = clean_text(text)
        if not cleaned:
            raise ValueError("Input text is empty or contains no alphanumeric characters after preprocessing.")

        # Vectorization
        vec = self.tfidf.transform([cleaned])

        # Selected model
        model, model_display_name, normalized_id = self._get_model(model_id)

        # Prediction and probabilities
        pred_label = int(model.predict(vec)[0])
        probabilities = model.predict_proba(vec)[0]  # [prob_0(fake), prob_1(real)]

        prob_fake = float(probabilities[0])
        prob_real = float(probabilities[1])

        # Label: 0 = Fake, 1 = Real
        prediction = "REAL" if pred_label == 1 else "FAKE"
        confidence = prob_real if pred_label == 1 else prob_fake

        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)

        return {
            "prediction": prediction,
            "label": pred_label,
            "confidence": round(confidence * 100, 2),
            "probabilities": {
                "fake": round(prob_fake, 4),
                "real": round(prob_real, 4)
            },
            "model_used": model_display_name,
            "model_id": normalized_id,
            "latency_ms": latency_ms,
            "cleaned_preview": cleaned[:240] + ("..." if len(cleaned) > 240 else ""),
            "raw_char_count": raw_length,
            "word_count": word_count,
            "disclaimer": "This is an ML-based probabilistic prediction, not factual verification."
        }

    def compare(self, text: str) -> Dict[str, Any]:
        """Runs both models on the same text and returns comparative breakdown."""
        lr_result = self.predict(text, "logistic_regression")
        nb_result = self.predict(text, "naive_bayes")

        agreement = lr_result["prediction"] == nb_result["prediction"]
        conf_diff = round(abs(lr_result["confidence"] - nb_result["confidence"]), 2)

        return {
            "agreement": agreement,
            "confidence_diff": conf_diff,
            "models": {
                "logistic_regression": lr_result,
                "naive_bayes": nb_result
            },
            "primary_prediction": lr_result["prediction"],
            "primary_model": "Logistic Regression"
        }

    def get_metadata(self) -> Dict[str, Any]:
        """Returns model metadata and reported evaluation metrics."""
        return {
            "loaded": self.loaded,
            "vectorizer": {
                "type": "TfidfVectorizer",
                "max_features": 5000,
                "ngram_range": [1, 2]
            },
            "reported_metrics": self.metadata.get("reported_metrics", {}),
            "supported_models": [
                {
                    "id": "logistic_regression",
                    "name": "Logistic Regression",
                    "accuracy": 0.9907,
                    "recommended": True,
                    "description": "High-precision linear classifier optimizing cross-entropy loss."
                },
                {
                    "id": "naive_bayes",
                    "name": "Multinomial Naive Bayes",
                    "accuracy": 0.9501,
                    "recommended": False,
                    "description": "Probabilistic model based on Bayes' theorem with feature independence."
                }
            ]
        }

# Singleton instance
prediction_service = PredictionService()
