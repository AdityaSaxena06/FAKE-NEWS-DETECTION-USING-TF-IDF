# 📰 Fake News Detection Using TF-IDF

<p align="center">
  <strong>An NLP and Machine Learning Based Approach to Detect Fake and Real News</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.x-blue?logo=python" />
  <img src="https://img.shields.io/badge/Machine%20Learning-Scikit--learn-orange" />
  <img src="https://img.shields.io/badge/NLP-TF--IDF-green" />
  <img src="https://img.shields.io/badge/Status-Completed-success" />
</p>

---

## 📌 Project Overview

Fake news has become a major challenge in the digital world. The rapid spread of misleading and fabricated information through online platforms makes it increasingly difficult to distinguish between authentic and unreliable news.

**Fake News Detection Using TF-IDF** is a Machine Learning project that uses Natural Language Processing (NLP) techniques to classify news articles as **Fake News or Real News**.

The project applies text preprocessing, TF-IDF (Term Frequency–Inverse Document Frequency) feature extraction, and two Machine Learning classification algorithms:

- Multinomial Naive Bayes
- Logistic Regression

Both models are trained and evaluated using the same training and testing datasets to compare their classification performance.

## 🎯 Project Objectives

- Understand and preprocess news article datasets.
- Perform Exploratory Data Analysis (EDA).
- Clean and normalize textual data.
- Convert news text into numerical features using TF-IDF.
- Implement Machine Learning classification algorithms.
- Evaluate and compare model performance.
- Analyze incorrect predictions and model limitations.
- Test the trained models on new news articles.

## ✨ Key Features

- **Data Preprocessing:** Cleaning and normalization of news text.
- **Exploratory Data Analysis:** Understanding dataset distribution and structure.
- **TF-IDF Vectorization:** Transforming text into numerical feature vectors.
- **Machine Learning Models:** Implementation of Naive Bayes and Logistic Regression.
- **Performance Evaluation:** Accuracy, Precision, Recall, and F1-Score.
- **Model Comparison:** Visual comparison of both classifiers.
- **Error Analysis:** Examination of incorrect predictions.
- **New Article Prediction:** Testing the trained models on unseen news text.
- **Explainability:** Discussion of dataset bias and model limitations.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Core programming language |
| Pandas | Data manipulation and analysis |
| NumPy | Numerical operations |
| Matplotlib | Data visualization |
| Seaborn | Statistical visualization |
| Scikit-learn | Machine Learning and model evaluation |
| TF-IDF | Text feature extraction |
| Jupyter Notebook / Google Colab | Development environment |

## 📂 Project Structure

```text
Fake-News-Detection-Using-TF-IDF/
│
├── Fake_News_Detection_Using_TF-IDF.ipynb
├── README.md
├── requirements.txt
└── .gitignore
```

## 🔄 Project Workflow

The project follows a structured Machine Learning workflow:

1. **Dataset Loading** – Importing the news datasets.
2. **Dataset Inspection** – Understanding columns, records, and data types.
3. **Label Assignment** – Assigning labels to fake and real news.
4. **Dataset Combination** – Combining the datasets.
5. **Data Shuffling** – Randomizing records.
6. **Exploratory Data Analysis** – Examining class distribution.
7. **Data Cleaning** – Handling duplicate records and preparing text.
8. **Text Preprocessing** – Cleaning and normalizing news content.
9. **Train-Test Split** – Dividing the dataset into training and testing sets using an 80:20 ratio and stratified sampling.
10. **TF-IDF Feature Extraction** – Converting text into numerical vectors.
11. **Naive Bayes Classification** – Training the first classification model.
12. **Logistic Regression Classification** – Training the second classification model.
13. **Model Evaluation** – Comparing classification metrics.
14. **Error Analysis** – Examining model prediction errors.
15. **Dataset Bias and Limitations** – Understanding possible weaknesses.
16. **New Article Testing** – Predicting whether new articles are fake or real.

## 🧠 Machine Learning Methodology

### 1. TF-IDF Vectorization

TF-IDF stands for Term Frequency–Inverse Document Frequency. It is a text feature extraction technique that converts textual data into numerical representations.

It assigns importance to words based on their frequency in a document and their relative rarity across the collection of documents.

This allows Machine Learning algorithms to process and learn patterns from news articles.

### 2. Multinomial Naive Bayes

Multinomial Naive Bayes is a probabilistic classification algorithm commonly used for text classification tasks.

It predicts the class of a news article based on the probability of its extracted textual features.

### 3. Logistic Regression

Logistic Regression is a supervised Machine Learning classification algorithm that estimates the probability of a given input belonging to a particular class.

It is used to classify news articles into Fake News or Real News categories.

## 📊 Model Performance & Results

Both models were evaluated using the same testing dataset.

| Evaluation Metric | Multinomial Naive Bayes | Logistic Regression |
|---|---:|---:|
| Accuracy | 95.01% | 99.07% |
| Precision | 95.37% | 99.32% |
| Recall | 95.12% | 98.91% |
| F1-Score | 95.25% | 99.11% |

**Note:** Accuracy represents overall classification performance. Precision, Recall, and F1-Score in this comparison are calculated specifically for the Fake News class (label 0).

### 🏆 Key Observation

Logistic Regression achieved better performance than Multinomial Naive Bayes across all four comparison metrics in this experiment.

Based on the evaluated results, Logistic Regression performed better on the given testing dataset.

## 📈 Evaluation Techniques

The project uses the following evaluation techniques:

- Accuracy Score
- Precision Score
- Recall Score
- F1-Score
- Classification Report
- Confusion Matrix
- Model Performance Comparison Visualization
- Error Analysis

## ⚙️ Installation & Execution

### Prerequisites

- Python 3.x
- Jupyter Notebook or Google Colab
- Required Python libraries

### Step 1: Clone the Repository

```bash
git clone https://github.com/AdityaSaxena06/FAKE-NEWS-DETECTION-USING-TF-IDF.git
```

### Step 2: Navigate to the Project Directory

```bash
cd FAKE-NEWS-DETECTION-USING-TF-IDF
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Run the Notebook

Open the notebook using Jupyter Notebook or upload it to Google Colab.

**Important:** Make sure the required dataset files are available in the expected location before executing the notebook. Update dataset paths if necessary.

## ⚠️ Dataset Bias & Model Limitations

Although the models achieved strong results on the testing dataset, some limitations should be considered:

- Model performance depends on the quality and diversity of the training dataset.
- Biased or imbalanced datasets may affect classification performance.
- TF-IDF primarily captures word frequency and importance, not the complete contextual meaning of a statement.
- Sarcasm, satire, misleading headlines, and changing news contexts can be difficult to classify.
- High test accuracy does not guarantee correct predictions for every real-world news article.

The system should be treated as an educational Machine Learning project and not as a substitute for professional fact-checking.

## 🚀 Future Scope

Possible improvements include:

- Integrating advanced NLP models such as BERT.
- Using larger and more diverse news datasets.
- Exploring deep learning classification approaches.
- Improving contextual understanding of news content.
- Developing a web-based interface for real-time predictions.
- Adding explainable AI techniques to understand model predictions.

## 👥 Team Members & Responsibilities

This project was developed collaboratively by a team of 14 members.

| No. | Team Member | Role & Responsibilities |
|---:|---|---|
| 1 | **Aditya Saxena** | Project Lead & TF-IDF – Overall coordination, implementation, and TF-IDF feature extraction |
| 2 | **Nandani Singh** | Documentation & Presentation – Project report, presentation, and dataset-related assistance |
| 3 | **Jaspreet Kaur** | Model Evaluation |
| 4 | **Yashvi Singh** | Model Evaluation |
| 5 | **Shikhar Gangwar** | Data Processing |
| 6 | **Suryansh Shrivastava** | Data Processing |
| 7 | **Naman Deep Singh** | Data Understanding |
| 8 | **Abhishek Singh** | Data Understanding |
| 9 | **Peehu Chaudhary** | Exploratory Data Analysis (EDA) |
| 10 | **Vibhuti Agarwal** | Exploratory Data Analysis (EDA) |
| 11 | **Natasha Jena** | Model Development |
| 12 | **Sanchita** | Model Development and PPT Preparation |
| 13 | **Ashish Pratap** | Dataset Structure |
| 14 | **Himanshu Singh** | Machine Learning Model Understanding |

## 🤝 Collaboration

This project was developed as a collaborative learning initiative. Team members contributed to different stages of the project, including data understanding, preprocessing, exploratory analysis, model development, evaluation, and documentation.

Contributions and suggestions are welcome.

## 📜 License

This project is intended for educational and academic purposes.

A formal open-source license can be added separately if required.

## 🙌 Acknowledgements

We would like to thank our faculty, mentors, and all team members for their guidance, contributions, and collaboration throughout the development of this project.

---

<p align="center">
  <strong>Built with Python, NLP & Machine Learning ❤️</strong>
</p>

<p align="center">
  <em>Learning • Experimenting • Building Together</em>
</p>
