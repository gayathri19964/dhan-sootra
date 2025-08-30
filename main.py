from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

class ExpenseInput(BaseModel):
    Entertainment: float
    Rent: float
    Healthcare: float
    Eating_Out: float
    Groceries: float
    Transport: float

@app.post("/predict")
def predict_expense(data: ExpenseInput):
    X = np.array([[data.Entertainment, data.Rent, data.Healthcare,
                   data.Eating_Out, data.Groceries, data.Transport]])
    X_scaled = scaler.transform(X)
    predictions = model.predict(X_scaled)[0]

    categories = ["Entertainment", "Rent", "Healthcare", "Eating_Out", "Groceries", "Transport"]
    max_cat = categories[np.argmax(predictions)]
    min_cat = categories[np.argmin(predictions)]

    return {
        "highest_predicted_category": max_cat,
        "lowest_predicted_category": min_cat
    }
