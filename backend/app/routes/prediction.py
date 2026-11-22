"""
Prediction and Comparison API Endpoints
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

from app.services.prediction_service import prediction_service

router = APIRouter(prefix="", tags=["Prediction"])

class PredictRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=5,
        max_length=50000,
        description="News headline or complete article text to analyze.",
        example="Government announces new environmental policy to expand clean energy subsidies."
    )
    model: Optional[str] = Field(
        default="logistic_regression",
        description="Machine learning model: 'logistic_regression' or 'naive_bayes'"
    )

class CompareRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=5,
        max_length=50000,
        description="News headline or complete article text to analyze with all models."
    )

@router.post("/predict")
async def predict_news(payload: PredictRequest):
    """
    Analyzes news text and predicts whether it is REAL or FAKE.
    Applies original preprocessing, TF-IDF vectorization, and model inference.
    """
    if not payload.text or not payload.text.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="News content cannot be empty."
        )

    try:
        result = prediction_service.predict(payload.text, payload.model)
        return {
            "success": True,
            "data": result
        }
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except RuntimeError as re:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(re)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference error: {str(e)}"
        )

@router.post("/compare")
async def compare_models(payload: CompareRequest):
    """
    Runs inference using BOTH Multinomial Naive Bayes and Logistic Regression
    on the provided news article to compare predictions and confidence scores.
    """
    if not payload.text or not payload.text.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="News content cannot be empty."
        )

    try:
        comparison = prediction_service.compare(payload.text)
        return {
            "success": True,
            "data": comparison
        }
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except RuntimeError as re:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(re)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Comparison error: {str(e)}"
        )

@router.get("/metadata")
async def get_models_metadata():
    """Returns evaluation metrics, TF-IDF settings, and model specifications."""
    return {
        "success": True,
        "data": prediction_service.get_metadata()
    }
