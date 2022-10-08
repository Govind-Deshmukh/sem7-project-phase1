#flask app template 
from flask import Flask,request,session,jsonify,make_response
import json
import mysql.connector
import jwt
from datetime import datetime, timedelta
from flask_cors import CORS

import sqlite3

app = Flask(__name__)
app.secret_key = 'iamfuckingcreazy'
CORS(app)
# this is configuration for sql database connection 

try:
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    print('SQLite database started')
    cursor.execute('select sqlite_version();')
    print('SQLite Version is {}'.format(cursor.fetchall()))
except sqlite3.Error as e:
    print(e)


# mydb = mysql.connector.connect(
# 	host = "localhost", # your host address (yourservice.com)
# 	user = "root", # your yasername for sql database
# 	password = "", # your password 
#     database = "codechef" # your database name
# )

# cursor = mydb.cursor()

@app.route('/check',methods = ['POST'])
def check():
    if request.method == 'POST':
        # get data from front end session stroage
        dump = request.get_json()
        # get token from session 
        token = dump['token']
        # decode token and find username from it
        new = jwt.decode(token, app.config['SECRET_KEY'])
        # username = username encoded in jwt token 
        username =  new['public_id']
        # get username from database 
        cursor.execute("SELECT username FROM users WHERE username = '"+username+"';")
        data = cursor.fetchall()
        # got list of tuple from sql db
        data = data[0]
        # create var database user to verify further
        dbusername = data[0]
        # check if user from database and local storage are matching
        if (dbusername != username):
            return make_response(jsonify({'status' : 'Flase'}))
        else:
            return make_response(jsonify({'status' : 'True'}))

# login api route 
@app.route('/login' , methods=['POST'])
def login():
    if request.method == 'POST':
        dump = request.get_json()
        username = dump['username']
        password =  dump['password']
        cursor.execute("SELECT * FROM users WHERE username = '"+username+"' AND password = '"+password+"';")
        data = cursor.fetchall()
        if (len(data)==0 or len(data)>1):
            resp = jsonify({'message' : 'Invalid username or password'})
            resp.status_code = 400
            return resp
        else:
            # added username in session
            session['username'] = username
            # return jwt token 
            token = jwt.encode({'public_id': username,'exp' : datetime.utcnow() + timedelta(hours= 12)}, app.config['SECRET_KEY'])
            
            return make_response(jsonify({'token' : token.decode('UTF-8'),'username' : username }), 201)

#  register api route 
@app.route('/register' , methods=['POST'])
def register():
    if request.method == 'POST':
        #check confirm passowrd and password
        if request.form['password'] != request.form['confpassword']:
            resp = jsonify({'message':'Password and Confirm Password does not match'})
            resp.status_code = 401
            return make_response(resp)
        #check if username already exists
        else:
            username = request.form['username']
            cursor.execute("SELECT * FROM users WHERE username = %s", [username])
            user = cursor.fetchone()
            if user:
                resp = jsonify({'message':'User already exists'})
                resp.status_code = 401
                return make_response(resp)
            else:
                name = request.form['name']
                email = request.form['email']
                contact = request.form['contact']
                username = request.form['username']
                password = request.form['password']
                cursor.execute("INSERT INTO users (name,email,contact,username,password) VALUES (%s,%s,%s,%s,%s)",(name,email,contact,username,password))
                mydb.commit()
                return make_response(jsonify({'message' : 'You are now registered and can log in'}))


# logout route
@app.route('/logout', methods=['GET','POST'])
def logout():
    session.clear()
    return make_response(jsonify({'message' : 'You successfully logged out'}))


# main app running function 
if '__main__' == __name__:
    app.run(debug=True,port=8090)
    