from crypt import methods
from lib2to3.pgen2 import token
from webbrowser import get
import bcrypt
from flask import Flask, render_template, request, redirect, url_for,flash
from datetime import datetime, timedelta
from flask_cors import CORS
import jwt
from requests import session
from flask_bcrypt import Bcrypt

# data base configuration 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
datakeys = credentials.Certificate('firebase/firebaseconfig.json')
firebase_admin.initialize_app(datakeys, {
    'databaseURL': 'https://sem7-project-default-rtdb.firebaseio.com'
})
ref = db.reference()

date = datetime.now()
date = date.strftime("%d/%m/%Y, %H:%M:%S")

app = Flask(__name__)
app.secret_key = "iamfuckingawesome"
CORS(app)
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return render_template("loginregister/login.html")

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        try:
            if bcrypt.check_password_hash(ref.child(username).get()['password'], password):
                session['username'] = username
                session['name'] = ref.child(username).get()['name']
                session['logged_in'] = True
                token = jwt.encode({'username': username, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.secret_key)
                session['token'] = token
                print(token)
                return redirect(url_for('dashboard'))
            else:
                return redirect(url_for('index'))
        except Exception as e:
            return redirect(url_for('index'))

@app.route('/register',methods=['POST','GET'])
def register():
    if request.method == 'GET':
        return render_template("loginregister/register.html")
    if request.method == 'POST':
        if request.form['password'] == request.form['confpassword']:
            try:
                username = request.form['username']
                if ref.child(username).get() == None:
                    pw_hash = bcrypt.generate_password_hash(request.form['password'])
                    print(pw_hash)
                    ref.child(request.form['username']).set({
                        'date': date,
                        'name': request.form['name'],
                        'email': request.form['email'],
                        'username': request.form['username'],
                        'contact': request.form['number'],
                        'password': str(pw_hash)
                    })
                    return redirect(url_for('index'))
                else:
                    return 'user already exists'

            except Exception as e:
                print(e)
                return "register error"
        else:
            return "passwords do not match"


@app.route('/dashboard', methods=['POST','GET'])
def dashboard():
    if session['logged_in'] == True:
        if 'username' in session:
            username = session['username']
            return render_template("dashboard.html", username=username)
        return render_template("dashboard.html")
    else:
        return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)