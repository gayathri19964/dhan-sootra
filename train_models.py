import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load dataset (place your 'data.csv' in the same folder)
data = pd.read_csv('data.csv')

# Convert categorical columns to dummy variables
data = pd.get_dummies(data, columns=['City_Tier', 'Occupation'], drop_first=True)

# Features and targets
X = data.drop(columns=['Entertainment', 'Rent', 'Healthcare', 'Eating_Out', 'Groceries', 'Transport'])
y_entertainment = data['Entertainment']
y_rent = data['Rent']

# Train models
model_entertainment = RandomForestRegressor(n_estimators=100, random_state=42)
model_entertainment.fit(X, y_entertainment)

model_rent = RandomForestRegressor(n_estimators=100, random_state=42)
model_rent.fit(X, y_rent)

# Save models
joblib.dump(model_entertainment, 'model_entertainment.joblib')
joblib.dump(model_rent, 'model_rent.joblib')

print("Models trained and saved successfully.")
