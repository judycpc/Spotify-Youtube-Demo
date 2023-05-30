from flask import Flask, request, json, jsonify
import random
from flask_cors import CORS

from model import predict_views, predict_comments, clustering

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    return "Server running..."

@app.route('/predict', methods=['POST'])
def predict():
    data = json.loads(request.data)

    prediction = dict()
    prediction['stream'] = random.randint(500, 5000)
    prediction['views'] = predict_views(data)
    prediction['likes'] = random.randint(100, 3000)
    prediction['comments'] = predict_comments(data)

    similar_work = clustering(data)

    return jsonify({'prediction': prediction, 'similar_work': similar_work})

if __name__ == '__main__':
    app.run(debug=True)