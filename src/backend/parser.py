import json
import requests

with open('/root/hakaton/data.json','r', encoding = 'cp1251',errors = 'ignore') as f:
    data = json.load(f)
    #data = f.read()
#print(data[i])
url = 'http://95.214.63.201:5984/_session'
r = requests.post(url, data={'name': 'admin', 'password': 'Pf[fh42Fkrfi!'})
cook = r.headers['Set-Cookie']
cook = cook.split(';')[0]
header ={'Cookie': cook}

for i in range(2747,len(data)):
    FullName = data[i]['FullName']
    HomesQuantity = data[i]['HomesQuantity']
    AdmArea = data[i]['AdmArea']
    District = data[i]['District']
    Address = data[i]['Address']
    ChiefName = data[i]['ChiefName']
    ChiefPosition = data[i]['ChiefPosition']
    try:
        PublicPhone = data[i]['PublicPhone'][0]['PublicPhone']
    except:
        PublicPhone = "null"
    try:
        WorkingHours = data[i]['WorkingHours'][0]
    except:
        WorkingHours = 'null'
    INN = data[i]['INN']
    OGRN = data[i]['OGRN']
    geoData = data[i]['geoData']
    global_id = data[i]['global_id']

    dat = {'fullname':FullName,'homesquantity':HomesQuantity,'admarea':AdmArea,'district':District,'address':Address,'chiefname':ChiefName,'publicphone':PublicPhone,'workinghours':WorkingHours,'inn':INN,'ogrn':OGRN,'geodata':geoData,'global_id':global_id}
    url = 'http://95.214.63.201:5984/companies/'
    r = requests.post(url, headers=header, json=dat)
    print(r.text)