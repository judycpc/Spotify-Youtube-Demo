import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import warnings
import random

warnings.filterwarnings("ignore")

views_model = joblib.load('./models/Viewsmodel.joblib')
comments_model = joblib.load('./models/Commentsmodel.joblib')
cluster_model = joblib.load('./models/Clustering.joblib')

df = pd.read_csv('./Spotify_Youtube.csv')
df.dropna(inplace=True)
df = df[['Danceability', 'Energy', 'Acousticness', 'Valence', 'Tempo', 'Artist', 'Track', 'Uri']]
df = df.rename(columns={'Artist': 'artist', 'Track': 'track', 'Uri': 'link'})

def predict_views(data):
    X = pd.DataFrame(data, index=[0])
    y = views_model.predict(X)[0]
    
    if y == 0: return "0~100K"
    elif y == 1: return "100K~5M"
    elif y == 2: return "5M~16.25M"
    else: return "Above 16.25M"

def predict_comments(data):
    X = pd.DataFrame(data, index=[0])
    y = comments_model.predict(X)[0]

    if y == 0: return "0~50"
    elif y == 1: return "50~900"
    elif y == 2: return "900~2K"
    else: return "Above 2K"

def clustering(data):
    features = ['Danceability', 'Energy', 'Acousticness', 'Valence', 'Tempo']
    X = df[features]    # dataset
    x = pd.DataFrame(data, index=[0], columns=features)    # input

    X = pd.concat([X, x], ignore_index=True).reset_index(drop=True)
    
    # Scaling
    scale_MinMax = MinMaxScaler()
    X = pd.DataFrame(scale_MinMax.fit_transform(X), columns = X.columns)

    y = list(cluster_model.fit_predict(X))
    label = y.pop(-1)   # cluster label of input data

    indices = [i for i, v in enumerate(y) if v == label]
    indices = random.sample(indices, 3)
    result = df[['artist', 'track', 'link']].iloc[indices].to_dict(orient='records')

    for i, d in enumerate(result):
        d.update({'key': i+1})
    
    return result