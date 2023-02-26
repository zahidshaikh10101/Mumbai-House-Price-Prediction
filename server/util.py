import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(Location,Area,Bhk,Gym,Lift,Car,Security,Garden,Pool):
    try:
        loc_index = __data_columns.index(Location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = Area
    x[1] = Bhk
    x[2] = Gym
    x[3] = Lift
    x[4] = Car
    x[5] = Security
    x[6] = Garden
    x[7] = Pool

    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __locations

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[9:]  

    global __model
    if __model is None:
        with open('./artifacts/mumbai_house_prices_prediction.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('airoli',1300,2,1,1,1,1,1,1))