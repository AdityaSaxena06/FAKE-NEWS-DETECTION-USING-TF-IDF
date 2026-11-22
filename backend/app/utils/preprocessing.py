"""
Text Preprocessing Utilities
Implements the exact cleaning pipeline from the original academic project.
"""

import re

def clean_text(text: str) -> str:
    """
    Cleans raw news article text by:
    1. Converting to lowercase
    2. Removing URL links (http://, https://, www.*)
    3. Removing HTML markup tags (<...>)
    4. Removing non-alphanumeric characters (keeping only letters, numbers, spaces)
    5. Normalizing multiple whitespace characters to single spaces
    6. Stripping leading/trailing spaces
    """
    if not isinstance(text, str):
        return ""
    
    # 1. Lowercase
    cleaned = text.lower()
    # 2. Remove URLs
    cleaned = re.sub(r'http\S+|www\S+', '', cleaned)
    # 3. Remove HTML tags
    cleaned = re.sub(r'<.*?>', '', cleaned)
    # 4. Remove non-alphanumeric characters
    cleaned = re.sub(r'[^a-zA-Z0-9\s]', ' ', cleaned)
    # 5. Collapse extra whitespace
    cleaned = re.sub(r'\s+', ' ', cleaned)
    # 6. Trim whitespace
    return cleaned.strip()
