import bcrypt
from flask import Flask, render_template, request, redirect, url_for,flash, session
from datetime import datetime, timedelta
from flask_cors import CORS
import jwt
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

@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        return render_template("loginregister/login.html")
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        str1 = ref.child(username).get()['password']
        str1 = str1[2:-1]
        try:
            if bcrypt.check_password_hash(str1, password):
                session['username'] = username
                session['name'] = ref.child(username).get()['name']
                session['logged_in'] = True
                token = jwt.encode({'username': username, 'exp': datetime.utcnow() + timedelta(minutes=30)}, app.secret_key)
                print(token)
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
    if request.method == 'GET':
        try:
            if session['logged_in'] == True:
                if 'username' in session:
                    data = {
                        'username': session['username'],
                    }
                    return render_template("dashboard/dashboard.html", data = data)
                else:
                    return redirect(url_for('index'))
        except Exception as e:
            return redirect(url_for('index'))

@app.route('/dashboard/configuration', methods=['POST','GET'])
def configureation():
    if request.method == 'GET':
        try:
            if session['logged_in'] == True:
                if 'username' in session:
                    data = {
                        'user':ref.child(session['username']).get(),
                        'username': session['username'],
                    }
                    return render_template("dashboard/configuration.html", data = data)
                else:
                    return redirect(url_for('index'))
        except Exception as e:
            return redirect(url_for('index'))
    if request.method == 'POST':
        try:
            if session['logged_in'] == True:
                if 'username' in session:
                    pass
                else:
                    return redirect(url_for('index'))
        except Exception as e:
            return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)