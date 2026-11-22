"""
TruthLens API - Main FastAPI Application
"""

import os
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router
from app.services.prediction_service import prediction_service

START_TIME = time.time()

app = FastAPI(
    title="TruthLens - Fake News Detection API",
    description="High-performance machine learning backend for detecting fake news using TF-IDF, Logistic Regression, and Naive Bayes.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration for local Vite dev and cloud deployments (Vercel)
ALLOWED_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if os.getenv("ALLOW_ALL_ORIGINS", "true").lower() == "true" else ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routes
app.include_router(prediction_router, prefix="/api")
# Also mount directly at root for convenience (/predict, /compare, /health)
app.include_router(prediction_router, prefix="")

@app.get("/", tags=["General"])
async def root():
    return {
        "app": "TruthLens",
        "tagline": "See Beyond Headlines. Detect What's Real.",
        "status": "online",
        "docs": "/docs",
        "models_ready": prediction_service.is_ready()
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for Render / Docker / Vercel uptime monitoring."""
    uptime_seconds = round(time.time() - START_TIME, 2)
    models_ready = prediction_service.is_ready()
    return {
        "status": "healthy" if models_ready else "degraded",
        "service": "TruthLens Backend",
        "version": "1.0.0",
        "uptime_seconds": uptime_seconds,
        "models_loaded": models_ready,
        "supported_models": ["logistic_regression", "naive_bayes"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
