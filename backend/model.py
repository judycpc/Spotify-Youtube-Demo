import joblib
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import warnings
import random

warnings.filterwarnings("ignore")

stream_model = None
views_model = None
likes_model = None
comments_model = None
cluster_model = None

df = None

def load_models():
    global stream_model, views_model, likes_model, comments_model, cluster_model

    print('Models loading...')

    stream_model = joblib.load('./models/Streammodel.joblib')
    views_model = joblib.load('./models/Viewsmodel.joblib')
    likes_model = joblib.load('./models/Likesmodel.joblib')
    comments_model = joblib.load('./models/Commentsmodel.joblib')
    cluster_model = joblib.load('./models/Clustering.joblib')

    print('Models loaded.')

def load_database():
    global df

    print('Database loading...')

    df = pd.read_csv('./Spotify_Youtube.csv')
    df.dropna(inplace=True)
    df = df[['Danceability', 'Energy', 'Acousticness', 'Valence', 'Tempo', 'Artist', 'Track', 'Uri']]
    df = df.rename(columns={'Artist': 'artist', 'Track': 'track', 'Uri': 'link'})

    print('Database loaded.')


def classification(data):
    print('Classification start...')
    
    X = pd.DataFrame(data, index=[0])

    prediction = dict()

    y_stream = stream_model.predict(X)[0]
    stream_labels = ["0~1M", "1M~20M", "20M~90M", "Above 90M"]
    prediction['stream'] = stream_labels[y_stream]

    y_views = views_model.predict(X)[0]
    views_labels = ["0~100K", "100K~5M", "5M~16.25M", "Above 16.25M"]
    prediction['views'] = views_labels[y_views]

    y_likes = likes_model.predict(X)[0]
    likes_labels = ["0~1K", "1K~50K", "5K~180K", "Above 180K"]
    prediction['likes'] = likes_labels[y_likes]

    y_comments = comments_model.predict(X)[0]
    comments_labels = ["0~50", "50~900", "900~2K", "Above 2K"]
    prediction['comments'] = comments_labels[y_comments]

    print('Classification done.')

    return prediction


def clustering(data):
    print('Clustering start...')

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
    
    print('Clustering done.')
    
    return result