from flask import Flask, request, json, jsonify
from flask_cors import CORS

from model import load_models, load_database, classification, clustering

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.before_first_request
def initialize():
    load_models()
    load_database()

@app.route('/')
def index():
    return "Server running..."

@app.route('/predict', methods=['POST'])
def predict():
    data = json.loads(request.data)

    prediction = classification(data)
    similar_work = clustering(data)

    return jsonify({'prediction': prediction, 'similar_work': similar_work})

if __name__ == '__main__':
    app.run(debug=True)