from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    Area = float(request.form['Area'])
    Location = request.form['Location']
    Bhk = int(request.form['Bhk'])
    Gym = int(request.form['Gym'])
    Lift = int(request.form['Lift'])
    Car = int(request.form['Car'])
    Security = int(request.form['Security'])
    Garden = int(request.form['Garden'])
    Pool = int(request.form['Pool'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(Location,Area,Bhk,Gym,Lift,Car,Security,Garden,Pool)
        })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()