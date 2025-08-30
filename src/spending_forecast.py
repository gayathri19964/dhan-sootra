import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
from datetime import timedelta

# Step 1: Load your dataset
# Example CSV format:
# Date,Amount
# 2023-01-01,450
# 2023-02-01,500
df = pd.read_csv("data.csv", parse_dates=["Date"])

# Step 2: Preprocess data
df = df.sort_values("Date")
df.set_index("Date", inplace=True)
df = df.resample("M").sum()  # Aggregate by month

# Step 3: Fit SARIMAX model
model = SARIMAX(df['Amount'], order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
results = model.fit()

# Step 4: Forecast next month
forecast = results.forecast(steps=1)
print("Next Month Predicted Spending:", forecast.iloc[0])

# Optional: Plot
df['Amount'].plot(label='Historical', figsize=(10, 4))
forecast.plot(label='Forecast', style='--')
plt.legend()
plt.title("Monthly Spending Forecast")
plt.xlabel("Date")
plt.ylabel("Spending")
plt.grid(True)
plt.show()
