from flask import Flask, request,jsonify
from flask_cors import CORS
import jwt 
from datetime import datetime, timedelta

import firebase_admin
from firebase_admin import credentials, db

try:
    cred = credentials.Certificate("./firebase/firebaseconfig.json")
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://sem7-project-default-rtdb.firebaseio.com",
    })
    ref = db.reference()
except Exception as e:
    print(e)
    print("Error connecting firebase")



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

        temp = email.split('@')
        temp_user = temp[0]
        try:
            if ref.child('users').child(temp_user).get() is None:
                ref.child('users').child(temp_user).set({
                            'name' : name,
                            'username' : temp_user,
                            'email' : email,
                            'password' : password,
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
        print(data)
        try:
            serverdata = ref.child('users').child(lst[0]).get()
            serverUsername = serverdata['email']
            serverPassword = serverdata['password']
            if serverUsername == email and serverPassword == password:
                    return jsonify({
                        'status': True,
                        'message': 'Login successful',
                        'code' : 'Success',
                        'token' : jwt.encode({'user' : serverUsername, 'exp' : datetime.utcnow() + timedelta(hours=12)}, app.secret_key),
                        'data' : serverdata
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

@app.route('/smtpConfig', methods=['POST'])
def smtpConfig():
    if request.method =="POST":
        data = request.get_json()
        user = data['user']
        smtp = data['smtp']
        try:
            ref.child('users').child(user).child('smtpConfig').set({
                'host' : smtp["serverAddress"],
                'port' : smtp['port'],
                'email' : smtp['email'],
                'password' : smtp['password']
            })
            data = ref.child('users').child(user).get()
            # print(data)
            return jsonify({
                'status': True,
                'message': 'SMTP Configured',
                'code' : 'Success',
                'data' : data
            })
        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while configuring SMTP : {}'.format(e),
                'code' : 'Error'
            })

@app.route('/contactList', methods=['POST'])
def contactList():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user = data['user']
            segment = data['segment']
            listName = segment['segmentName']
            temp_contacts = segment['segmentData']
            # print(data)
            print(user,'\n',listName,'\n')

            contacts = []
            for i in temp_contacts:
                contacts.append(i[0])
            print(contacts)

            ref.child('users').child(user).child('contactList').child(listName).set({
                'listName' : listName,
                'contacts' : contacts
                
            })
            serverdata = ref.child('users').child(user).get()
        
            return jsonify({
                    'status': True,
                    'message': 'Created successful',
                    'code' : 'Success',
                    'data' : serverdata
                })

        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while creating contact list : {}'.format(e),
                'code' : 'Error'
            })

@app.route('/sendMail', methods=['POST'])
def sendMail():
    if request.method == 'POST':
        data = request.get_json()
        user = data['user']
        mail = data['mail']
        try:
            smtpdata = ref.child('users').child(user).child('smtpConfig').get()
            print("smtpdata:",smtpdata)
            import smtplib
            import ssl
            port = smtpdata['port']
            smtp_server = smtpdata['host']
            sender_email = "vyankatesht246@gmail.com"
            receiver_email = "vtuppalwad@gmail.com"  # Enter receiver address
            password=smtpdata['password']
            message = mail['message']
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message)
            return jsonify({
                'status': True,
                'message': 'Mail sent',
                'code' : 'Success'
            })
        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while sending mail : {}'.format(e),
                'code' : 'Error'
            })

@app.route('/deleteContact', methods=['POST'])
def deleteList():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user = data['user']
            listName = data['contact']
            print("Deleting the list of ",user,' : ',listName,'\n')

            # delete the list
            ref.child('users').child(user).child('contactList').child(listName).delete()
            serverdata = ref.child('users').child(user).get()
            return jsonify({
                    'status': True,
                    'message': 'deleted successful',
                    'code' : 'Success',
                    'data' : serverdata
                })
        except Exception as e:
            print(e)
            return jsonify({
                'status': False, 
                'message': 'Error while deleting contact list : {}'.format(e),
                'code' : 'Error'
            })

if __name__ == '__main__':
    app.run(debug=True)
