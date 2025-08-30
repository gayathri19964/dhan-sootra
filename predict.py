import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load your dataset
df = pd.read_csv("data.csv")

# Optional: Drop rows with missing values (if any)
df.dropna(inplace=True)

# Select features and target (6 spending categories)
X = df[["Income", "Age", "City_Tier", "Occupation"]]
Y = df[["Entertainment", "Rent", "Healthcare", "Eating_Out", "Groceries", "Transport"]]

# One-hot encode categorical variables
X = pd.get_dummies(X, columns=["City_Tier", "Occupation"], drop_first=True)

# Standardize input features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_scaled, Y)

# Save the model and scaler
joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Model and scaler saved successfully.")
