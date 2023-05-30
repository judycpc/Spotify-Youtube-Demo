# Spotify-Youtube-Demo

## Environment Setup

### Backend

#### Setup Virtual Environment

```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Add Model Files

- Move the `models` folder (submitted to NTU COOL with other code files) to `backend`.
- Structure of the `models` folder:

  ```
  models
  ├── Clustering.joblib
  ├── Commentsmodel.joblib
  ├── Likesmodel.joblib
  ├── Streammodel.joblib
  └── Viewsmodel.joblib
  ```

#### Run Server (http://127.0.0.1:5000)

```
cd backend
source venv/bin/activate
python3 app.py
```

### Frontend

#### Install Frameworks

```
cd frontend
yarn
```

#### Run Frontend (http://127.0.0.1:3000)

```
cd frontend
yarn start
```
