import joblib
import pandas as pd

views_model = joblib.load('Viewsmodel.joblib')

def predict_views(data):
    X = pd.DataFrame(data, index=[0])
    y = views_model.predict(X)[0]

    if y == 0: return "0~100K"
    elif y == 1: return "100K~5M"
    elif y == 2: return "5M~16.25M"
    else: return "Above 16.25M"