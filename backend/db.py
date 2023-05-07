import pandas as pd

df = pd.read_csv('./Spotify_Youtube.csv', usecols=['Artist', 'Track', 'Uri'])
df = df.rename(columns={'Artist': 'artist', 'Track': 'track', 'Uri': 'link'})

def get_works(idx):
    result = df.iloc[idx].to_dict(orient='records')

    for i, d in enumerate(result):
        d.update({'key': i+1})

    return result
