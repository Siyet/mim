
from flask import Flask
from flask import request
from flask import abort
import requests
import datetime
import json
#import MySQLdb
#import mysql.connector
#from secret import passSQL
#from flask import jsonify

app = Flask(__name__)

r = requests.get('https://google.com/')
print('start')

url = 'http://95.214.63.201:5984/_session'
r = requests.post(url, data={'name': 'admin', 'password': 'Pf[fh42Fkrfi!'})
cook = r.headers['Set-Cookie']
cook = cook.split(';')[0]
header ={'Cookie': cook}

@app.route('/', methods=['GET'])
def apipage():
    try:

	uid = request.args.get('u')
        time = request.args.get('t')
        status = request.args.get('s')
	error = request.args.get('e', default='null')
	milliseconds = 0
        if len(time) == 13:
            milliseconds = int(time[-3:])
        time = float(time[0:-3])

        the_date = datetime.datetime.fromtimestamp(time)
        the_date += datetime.timedelta(milliseconds=milliseconds)
 	
	dat = {'lid':uid,'date':(str(the_date).replace(' ','T')+'Z'),'status':status, 'error':error}
	url = 'http://95.214.63.201:5984/status'
	r = requests.post(url, headers=header, json=dat)
	return r.text

        #return str(uid)+str(the_date)+str(status)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
'''
@app.route('/api/err/', methods=['GET'])
def errorsget():
    try:
        cursor.execute("SELECT * FROM errors")
        row = str(cursor.fetchall())
        t = row.split('), (')
        t[0] = t[0].replace('((','')
        t[-1] = t[-1].replace('))','')
        row = ''
        for el in t:
            row = row + str(el)+'\n'
        return str(row)
    except Exception as e:
        return '500 '+str(e)
'''
