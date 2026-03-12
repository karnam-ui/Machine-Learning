from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("churn_model.pkl")

@app.get("/")
def home():
    return {"message": "Churn Prediction API running"}

@app.post("/predict")
def predict(data: dict):
    try:
        df = pd.DataFrame([data])
        print(f"Input data: {data}")
        print(f"DataFrame shape: {df.shape}")
        print(f"DataFrame columns: {df.columns.tolist()}")
        
        prob = model.predict_proba(df)[0][1]

        return {
            "churn_probability": float(prob)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

