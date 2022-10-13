import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

credential = credentials.Certificate('firebase/serviceAccountKey.json')
firebase_admin.initialize_app(credential, {
    'databaseURL': 'link to db'
})
ref = db.reference()


# import json
# set data for a particular user
# ref.set({

#                 'box001': {
#                     'color': 'red',
#                     'width': 1,
#                     'height': 3,
#                     'length': 2
#                 },
#                 'box002': {
#                     'color': 'green',
#                     'width': 1,
#                     'height': 2,
#                     'length': 3
#                 },
#                 'box003': {
#                     'color': 'yellow',
#                     'width': 3,
#                     'height': 2,
#                     'length': 1
#                 }
#         })

# update data for a particular user
# ref.update({
#     'box001/color': 'blue',
#     'box002/color': 'blue',
#     'box003/color': 'blue'
# })


#delete data for a particular user
# ref.delete({'box001/color': 'blue'})



# Read data and print to the console
data = ref.child('govind').get()
print(data)
print()