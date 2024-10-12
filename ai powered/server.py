from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pre-trained model once during startup
try:
    model = joblib.load('mentalHealth.pkl')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse incoming JSON data
        data = request.json
        if not data:
            return jsonify({"message": "No data received"}), 400
        
        # Ensure that data is in the form of a pandas DataFrame
        df = pd.DataFrame([data])
        
        # Debugging logs
        print("Received data:", data)
        
        # Make predictions using the loaded model
        predictions = model.predict(df)
        
        # Return the predictions as a JSON response
        return jsonify({"predictions": predictions.tolist()}), 200
    except Exception as e:
        # Handle any errors that occur during prediction
        print(f"Prediction error: {e}")
        return jsonify({"message": "Error during prediction", "error": str(e)}), 500

@app.route('/members', methods=['GET'])
def members():
    return jsonify({"members": ["member1", "member2", "member3"]})

if __name__ == '__main__':
    # Change the port number to 8000 or any other port you desire
    app.run(debug=True, port=8000)
