import joblib
import pandas as pd

views_model = joblib.load('model1.joblib')

def predict_views(data):
    X = pd.DataFrame(data, index=[0])
    y = views_model.predict(X)[0]

    if y == 0: return "0~2M"
    elif y == 1: return "2M~15M"
    else: return "Above 15M"