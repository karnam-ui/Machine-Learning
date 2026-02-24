import streamlit as st
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

st.title("Credit Card Fraud Detection")

df = pd.read_csv(r"/Users/suhaas/Downloads/creditcard.csv")

X = df.drop("Class", axis=1)
y = df["Class"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

model = GradientBoostingClassifier()
model.fit(X_train, y_train)

threshold = st.slider("Fraud Threshold", 0.0, 1.0, 0.5)

if st.button("Predict on Test Sample"):
    sample = X_test.iloc[[0]]
    prob = model.predict_proba(sample)[0][1]
    prediction = int(prob > threshold)

    st.write("Fraud Probability:", prob)
    st.write("Prediction:", "Fraud" if prediction else "Legit")

