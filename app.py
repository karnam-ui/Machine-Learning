import streamlit as st
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

@st.cache_resource
def train_model():
    df = pd.read_csv("/Users/suhaas/Downloads/creditcard.csv")
    X = df.drop("Class", axis=1)
    y = df["Class"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )

    model = GradientBoostingClassifier()
    model.fit(X_train, y_train)
    return model, X_test

model, X_test = train_model()

threshold = st.slider("Fraud Threshold", 0.0, 1.0, 0.8)

if st.button("Predict"):
    sample = X_test.iloc[[0]]
    prob = model.predict_proba(sample)[0][1]
    prediction = int(prob > threshold)

    st.write("Fraud Probability:", round(prob, 4))
    st.write("Prediction:", "Fraud" if prediction else "Legit")
