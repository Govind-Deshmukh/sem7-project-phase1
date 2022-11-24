from flask import Flask, request,jsonify
from flask_cors import CORS
import sqlite3

from datetime import datetime

import firebase_admin
from firebase_admin import credentials, db, auth


cred = credentials.Certificate("serviceAccountKey.json")
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
        name = data['name']
        email = data['email']
        temp = email.split('@')
        username = temp[0]
        password = data['password']
        print("\n\n")
        print(name, email, password)
        try:
            if ref.child('users').child(username).get() is None:
                ref.child('users').child(username).set({
                            'name' : name,
                            'username' : username,
                            'email' : email,
                            'password' : password
                })
                
                return jsonify({
                    'status' : True,
                    'message' : 'User created successfully'
                })
            else:
                return jsonify({
                    'status': False, 
                    'message' : 'User already exists'
                })
        except Exception as e:
            return jsonify({'status': False, 
                            'message': 'Error creating user: {}'.format(e)
            })

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['username']
        username = email.split('@')

        password = data['password']
        try:
            data = ref.child('users').child(username).get()
            serverUsername = data['username']
            serverPassword = data['password']

            if (username == serverUsername and password == serverPassword):
                return jsonify({'status': True, 
                                'message': 'Login Successfull',
                                'name': data['name'],
                                'email': username,
                })
            else:
                return jsonify({'status': False, 
                                'message': 'Login Failed',
                })
        except Exception as e:
            return jsonify({'status': False, 
                            'message': 'Error creating user: {}'.format(e)
            })



@app.route('/api/admin/auth/login', methods=['POST'])
def admin():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        try:
            server = ref.child('admin').child('username').get()
            serverUsername = server['username']
            serverPassword = server['password']
            if username == serverUsername and password == serverPassword:
                return jsonify({'status': True,
                                'message': 'Login Successfull',
                                'name': server['name'],
                                'email': username,
                                })
            else:
                return jsonify({'status': False,
                                'message': 'Login Failed',
                                })
        except Exception as e:
            return jsonify({'status': False,
                            'message': 'Error creating user: {}'.format(e)
                            })


@app.route('/api/admin/create/adminAcc', methods=['POST'])
def createAdmin():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        name = data['name']
        verification = data['verification']
        try:
            if verification == 'admin':
                ref.child('admin').child('username').set({
                    'username': username,
                    'password': password,
                    'name': name
                })
                return jsonify({'status': True,
                                'message': 'Admin Account Created',
                                })
            else:
                return jsonify({'status': False,
                                'message': 'Verification Failed. You are not admin',
                                })
        except Exception as e:
            return jsonify({'status': False,
                            'message': 'Error creating user: {}'.format(e)
                            })


@app.route('/api/admin/create/data/announcements', methods=['POST'])
def announcements():
    if request.method == 'POST':
        data = request.get_json()
        title = data['title']
        content = data['content']
        try:
            ref.child("data").child("announcements").child(date).set({
                'title': title,
                'content': content,
                'date_created': date
            })
            return jsonify({'status': True, 
                            'message': 'Announcement Posted'
            })
        except Exception as e:
            return jsonify({'status': False, 
                            'message': 'Error creating user: {}'.format(e)
            })
       
@app.route('/api/admin/create/data/drives', methods=['POST'])
def upcommingDrives():
    if request.method == 'POST':
        data = request.get_json()
        title = data['title']
        content = data['content']
        applyBy = data['applyBy']
        link = data['link']
        try:
            ref.child("data").child("drives").child(date).set({
                'title': title,
                'content': content,
                'applyBy': applyBy,
                'link': link,
                'date_created': date
            })
            return jsonify({'status': True, 
                            'message': 'Drive Posted'
            })
        except Exception as e:
            return jsonify({'status': False, 
                            'message': 'Error creating user: {}'.format(e)
            })

@app.route('/api/get/data/all', methods=['GET'])
def getAllData():
    if request.method == 'GET':
        try:
            data = ref.child('data').get()
            return jsonify({'status': True, 
                            'message': 'Data Fetched',
                            'data': data
            })
        except Exception as e:
            return jsonify({'status': False, 
                            'message': 'Error creating user: {}'.format(e)
            })

if __name__ == '__main__':
    app.run(debug=True)
