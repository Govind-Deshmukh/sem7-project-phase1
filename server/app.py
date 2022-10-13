#flask app template 
from crypt import methods
from lib2to3.pgen2 import token
from flask import Flask,request,session,jsonify,make_response
import json
from grpc import Status
import jwt
from datetime import datetime, timedelta
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

datakeys = credentials.Certificate('../firebase/serviceAccountKey.json')

firebase_admin.initialize_app(datakeys, {
    'databaseURL': 'https://sem7-project-default-rtdb.firebaseio.com'
})

ref = db.reference()


app = Flask(__name__)
app.secret_key = 'iamgoodboi'
CORS(app)




@app.route('/auth/verify',methods=['POST','GET'])
def verify():
    dump = request.get_json()
    token = dump['token']
    token = jwt.decode(token, "iamgoodboi", algorithms=["HS256"])
    try:
        if(token['public_id']==ref.child(token['public_id']).get() and token['exp'] > datetime.now().timestamp()):
            return jsonify({"status":True})
        else:
            return jsonify({"status":False})
    except Exception as e:
        return jsonify({"status":False,'error':str(e)})


# # login api route
@app.route('/login',methods = ['POST'])
def login():
    if request.method == 'POST':
        dump = request.get_json()
        try:
            data = ref.child(dump['username']).get()
            if (data == None):
                return make_response(jsonify({'status' : 'False'}))
            else:
                if (data['password'] == dump['password'] and data['username'] == dump['username']):
                    token = jwt.encode({'public_id': dump['username'], 'exp' : datetime.utcnow() + timedelta(hours=10)}, app.config['SECRET_KEY'])
                    return make_response(jsonify({'status' : 'True','token' : token,'username':dump['username'] }))
                else:
                    return make_response(jsonify({'emoji':'error','message' : 'Failed logged in','heading' : 'Error'}))
        except Exception as e:
            return jsonify({'emoji':'error','message': str(e),'ststus':False,'heading' : 'Error','error':str(e)})


#  register api route 
@app.route('/register' , methods=['POST'])
def register():
    if request.method == 'POST':
        dump = request.get_json()
        try:
            if ref.child(dump['username']).get() is not None:
                return make_response(jsonify({'emoji':'warning','message' : 'User already exists','heading' : 'Warning'}))
            else:
                ref.child(dump['username']).set({
                    'name': dump['name'],
                    'email': dump['email'],
                    'contact': dump['contact'],
                    'username': dump['username'],
                    'password': dump['password'],
                })
                return make_response(jsonify({'emoji':'success','message' : 'User registered successfully','heading' : 'Success'}))
        except Exception as e:
            return jsonify({'emoji':'error','message': str(e),'ststus':False,'heading' : 'Error','error':str(e)})


    


# main app running function 
if '__main__' == __name__:
    app.run(debug=True,port=8090)
    