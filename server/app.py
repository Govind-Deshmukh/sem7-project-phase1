from flask import Flask, request,jsonify
from flask_cors import CORS
import jwt 
from datetime import datetime, timedelta

import firebase_admin
from firebase_admin import credentials, db


cred = credentials.Certificate("./firebase/firebaseconfig.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://sem7-project-default-rtdb.firebaseio.com",

})
ref = db.reference()


app = Flask(__name__)
app.secret_key = 'iamfuckingcreazy'
# session configuration
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# cors config
CORS(app)
# getting date and time
date = datetime.now()
date = date.strftime("%d-%m-%Y,%H:%M:%S")


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        name = data["name"]
        email = data["email"]
        password = data['password']
        password = password.encode('utf-8')

        temp = email.split('@')
        temp_user = temp[0]
        print("\n\n")
        print(name, email, password,temp_user)
        print("\n\n")

        try:
            if ref.child('users').child(temp_user).get() is None:
                ref.child('users').child(temp_user).set({
                            'name' : name,
                            'username' : temp_user,
                            'email' : email,
                            'password' : password
                })
                
                return jsonify({
                    'status' : True,
                    'message' : 'User created successfully',
                    'code' : 'Success'
                })
            else:
                return jsonify({
                    'status': False, 
                    'message' : 'User already exists',
                    'code' : 'Error'
                })
        except Exception as e:
            return jsonify({
                'status': False, 
                'message': 'Error creating user: {}'.format(e),
                'code' : 'Error'
            })

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        lst = email.split('@')
        try:
            data = ref.child('users').child(lst[0]).get()
            serverUsername = data['email']
            serverPassword = data['password']

            if serverUsername == email and serverPassword == password:
                return jsonify({
                    'status': True,
                    'message': 'Login successful',
                    'code' : 'Success',
                    'token' : jwt.encode({'user' : serverUsername, 'exp' : datetime.utcnow() + timedelta(hours=12)}, app.secret_key),
                    'data' : data
                })
            else:
                return jsonify({
                    'status': False, 
                    'message': 'Login Failed',
                    'code' : 'Error'
                })
        except Exception as e:
            return jsonify({
                'status': False, 
                'message': 'Error while log in : {}'.format(e),
                'code' : 'Error'
            })


if __name__ == '__main__':
    app.run(debug=True)
