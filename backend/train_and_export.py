"""
TruthLens - Model Training & Artifact Export Script
Reproduces the exact pipeline from the original academic notebook:
- Dataset: ISOT Fake & Real News Dataset
- Preprocessing: regex stripping HTML, URLs, non-alphanumeric, lowercasing, whitespace
- TF-IDF Vectorizer: max_features=5000, ngram_range=(1, 2)
- Models: MultinomialNB() and LogisticRegression(max_iter=1000, random_state=42)
- Serialization: Joblib
"""

import os
import sys
import re
import json
import time
import urllib.request

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
MODELS_DIR = os.path.join(os.path.dirname(__file__), "app", "models")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(MODELS_DIR, exist_ok=True)

TRUE_URL = "https://huggingface.co/datasets/genesisqu/fake-real-news/resolve/main/True.csv"
FAKE_URL = "https://huggingface.co/datasets/genesisqu/fake-real-news/resolve/main/Fake.csv"

def download_file(url: str, dest_path: str):
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 10000000:
        print(f"[OK] Found existing dataset file: {dest_path} ({os.path.getsize(dest_path) / 1024 / 1024:.2f} MB)")
        return
    print(f"[*] Downloading {url} -> {dest_path}...")
    headers = {"User-Agent": "TruthLens/1.0"}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp, open(dest_path, "wb") as out_file:
        chunk_size = 1024 * 1024
        downloaded = 0
        while True:
            chunk = resp.read(chunk_size)
            if not chunk:
                break
            out_file.write(chunk)
            downloaded += len(chunk)
            print(f"    Downloaded {downloaded / 1024 / 1024:.1f} MB...", end="\r")
    print(f"\n[OK] Successfully downloaded {dest_path}")

def clean_text(text):
    """Exact cleaning logic from notebook cell 33"""
    return re.sub(r'\s+', ' ', re.sub(r'[^a-zA-Z0-9\s]', ' ', re.sub(r'<.*?>', '', re.sub(r'http\S+|www\S+', '', text.lower())))).strip() if isinstance(text, str) else ""

def main():
    print("=" * 60)
    print("  TruthLens - Exact ML Pipeline Training & Artifact Export")
    print("=" * 60)

    true_path = os.path.join(DATA_DIR, "True.csv")
    fake_path = os.path.join(DATA_DIR, "Fake.csv")

    download_file(TRUE_URL, true_path)
    download_file(FAKE_URL, fake_path)

    print("[*] Loading datasets...")
    fake = pd.read_csv(fake_path)
    true = pd.read_csv(true_path)

    print(f"    Fake news shape: {fake.shape}")
    print(f"    True news shape: {true.shape}")

    # Label assignment: 0 = Fake, 1 = Real
    fake["label"] = 0
    true["label"] = 1

    print("[*] Concatenating and shuffling (random_state=42)...")
    df = pd.concat([fake, true], axis=0, ignore_index=True)
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)

    print(f"    Total records before deduplication: {len(df)}")
    df = df.drop_duplicates().reset_index(drop=True)
    print(f"    Total records after deduplication: {len(df)}")

    # Combine title and text
    print("[*] Combining title + text and applying clean_text...")
    df = df[["title", "text", "label"]]
    df["content"] = df["title"].fillna("") + " " + df["text"].fillna("")

    start_clean = time.time()
    df["cleaned_content"] = df["content"].apply(clean_text)
    print(f"[OK] Text cleaned in {time.time() - start_clean:.2f}s")

    X = df["cleaned_content"]
    y = df["label"]

    print("[*] Performing 80/20 stratified train_test_split (random_state=42)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"    Training samples: {len(X_train)}, Testing samples: {len(X_test)}")

    print("[*] Fitting TfidfVectorizer(max_features=5000, ngram_range=(1, 2))...")
    start_tfidf = time.time()
    tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
    X_train_tfidf = tfidf.fit_transform(X_train)
    X_test_tfidf = tfidf.transform(X_test)
    print(f"[OK] TF-IDF fitted in {time.time() - start_tfidf:.2f}s. Matrix shape: {X_train_tfidf.shape}")

    # 1. Multinomial Naive Bayes
    print("\n[*] Training Multinomial Naive Bayes model...")
    nb_start = time.time()
    nb_model = MultinomialNB()
    nb_model.fit(X_train_tfidf, y_train)
    y_pred_nb = nb_model.predict(X_test_tfidf)
    nb_time = time.time() - nb_start

    nb_acc = accuracy_score(y_test, y_pred_nb)
    nb_prec = precision_score(y_test, y_pred_nb, pos_label=0)
    nb_rec = recall_score(y_test, y_pred_nb, pos_label=0)
    nb_f1 = f1_score(y_test, y_pred_nb, pos_label=0)
    print(f"[OK] Naive Bayes trained in {nb_time:.2f}s:")
    print(f"    Accuracy:  {nb_acc * 100:.2f}% (Expected: ~95.01%)")
    print(f"    Precision: {nb_prec * 100:.2f}% (Expected: ~95.37%)")
    print(f"    Recall:    {nb_rec * 100:.2f}% (Expected: ~95.12%)")
    print(f"    F1-Score:  {nb_f1 * 100:.2f}% (Expected: ~95.25%)")

    # 2. Logistic Regression
    print("\n[*] Training Logistic Regression model (max_iter=1000, random_state=42)...")
    lr_start = time.time()
    lr_model = LogisticRegression(max_iter=1000, random_state=42)
    lr_model.fit(X_train_tfidf, y_train)
    y_pred_lr = lr_model.predict(X_test_tfidf)
    lr_time = time.time() - lr_start

    lr_acc = accuracy_score(y_test, y_pred_lr)
    lr_prec = precision_score(y_test, y_pred_lr, pos_label=0)
    lr_rec = recall_score(y_test, y_pred_lr, pos_label=0)
    lr_f1 = f1_score(y_test, y_pred_lr, pos_label=0)
    print(f"[OK] Logistic Regression trained in {lr_time:.2f}s:")
    print(f"    Accuracy:  {lr_acc * 100:.2f}% (Expected: ~99.07%)")
    print(f"    Precision: {lr_prec * 100:.2f}% (Expected: ~99.32%)")
    print(f"    Recall:    {lr_rec * 100:.2f}% (Expected: ~98.91%)")
    print(f"    F1-Score:  {lr_f1 * 100:.2f}% (Expected: ~99.11%)")

    # Confusion matrices
    cm_nb = confusion_matrix(y_test, y_pred_nb).tolist()
    cm_lr = confusion_matrix(y_test, y_pred_lr).tolist()

    # Save artifacts with joblib
    print("\n[*] Saving model artifacts via Joblib to:", MODELS_DIR)
    tfidf_file = os.path.join(MODELS_DIR, "tfidf_vectorizer.joblib")
    nb_file = os.path.join(MODELS_DIR, "naive_bayes_model.joblib")
    lr_file = os.path.join(MODELS_DIR, "logistic_regression_model.joblib")
    meta_file = os.path.join(MODELS_DIR, "model_metadata.json")

    joblib.dump(tfidf, tfidf_file)
    joblib.dump(nb_model, nb_file)
    joblib.dump(lr_model, lr_file)

    metadata = {
        "dataset": "ISOT Fake News Dataset (Kaggle)",
        "samples_total": len(df),
        "samples_train": len(X_train),
        "samples_test": len(X_test),
        "labels": {"0": "Fake", "1": "Real"},
        "vectorizer": {
            "type": "TfidfVectorizer",
            "max_features": 5000,
            "ngram_range": [1, 2],
            "vocab_size": len(tfidf.vocabulary_)
        },
        "reported_metrics": {
            "naive_bayes": {
                "name": "Multinomial Naive Bayes",
                "accuracy": round(nb_acc, 6),
                "precision_fake": round(nb_prec, 6),
                "recall_fake": round(nb_rec, 6),
                "f1_fake": round(nb_f1, 6),
                "confusion_matrix": cm_nb
            },
            "logistic_regression": {
                "name": "Logistic Regression",
                "accuracy": round(lr_acc, 6),
                "precision_fake": round(lr_prec, 6),
                "recall_fake": round(lr_rec, 6),
                "f1_fake": round(lr_f1, 6),
                "confusion_matrix": cm_lr
            }
        },
        "exported_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }

    with open(meta_file, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)

    print(f"[OK] Exported: {tfidf_file} ({os.path.getsize(tfidf_file) / 1024:.1f} KB)")
    print(f"[OK] Exported: {nb_file} ({os.path.getsize(nb_file) / 1024:.1f} KB)")
    print(f"[OK] Exported: {lr_file} ({os.path.getsize(lr_file) / 1024:.1f} KB)")
    print(f"[OK] Exported: {meta_file}")
    print("\nTruthLens ML artifacts successfully created and saved!")

if __name__ == "__main__":
    main()
