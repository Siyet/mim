from flask import Flask
from flask import request
from flask import abort
import requests
import datetime
import json

app = Flask(__name__)

r = requests.get('https://google.com/')
print('start')

url = 'http://95.214.63.201:5984/_session'
r = requests.post(url, data={'name': 'admin', 'password': 'secret'})
cook = r.headers['Set-Cookie']
cook = cook.split(';')[0]
header = {'Cookie': cook}


@app.route('/', methods=['GET'])
def apipage():
    try:

	uid = request.args.get('u')
        status = request.args.get('s')
	error = request.args.get('e', default='null')
	milliseconds = 0

	url = 'http://95.214.63.201:5984/lifts/'+str(uid)
	r = requests.get(url, headers=header)
	if 'error' in r.text:
		return 'authentication failed'
	js = json.loads(r.text)
	parentid = js['_id']
	parentrev = js['_rev']

  the_date = datetime.datetime.now()
 	
	status = str(status)
	floor = 1+int(status[0:5], 2)
	doors = status[5]
	if doors == '1':
  	  doors = 'false'
	else:
 	   doors = 'true'

	passenger = status[6]
	if passenger == '1':
	    passenger = 'false'
	else:
	    passenger = 'true'

	dat = {'parent':{'_id':parentid,'_rev':parentrev},'date':(str(the_date).replace(' ','T')+'Z'),'floor':floor,'is_open':doors,'is_empy':passenger, 'error':error}
	url = 'http://95.214.63.201:5984/status'
	r = requests.post(url, headers=header, json=dat)
	return r.text

    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
