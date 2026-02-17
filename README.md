# Machine-Learning
Model Implementation
1.building a credit card fraud detection model
Built an end-to-end binary classification system to detect fraudulent credit card transactions on an imbalanced dataset (~70k samples).

Compared Logistic Regression, Random Forest, and Gradient Boosting using precision, recall, F1-score, and ROC-AUC.

Selected Gradent Boosting based on superior ROC-AUC and better precision–recall tradeoff.

Implemented threshold-based decision logic to control false positives vs false negatives depending on business priority.

Deployed the trained model using Streamlit for real-time fraud probability prediction.

Serialized model using joblib and structured the project with separate training and deployment layers.
