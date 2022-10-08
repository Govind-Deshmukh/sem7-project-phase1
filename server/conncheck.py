import mysql.connector

try:
    mydb = mysql.connector.connect(
	host = "localhost", # your host address (yourservice.com)
	user = "root", # your yasername for sql database
	password = "", # your password 
    database = "sem7_project" # your database name
    )

    cursor = mydb.cursor()
    print("connected to db")
except Exception as e:
    print(e)
