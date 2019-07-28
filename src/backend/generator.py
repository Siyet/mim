import random 
import requests
import json
import datetime
import random
import time


def strTimeProp(start, end, format, prop):
    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def randomDate(start, end, prop):
    return strTimeProp(start, end, '%m/%d/%Y %I:%M %p', prop)

#print(randomDate("1/1/2015 1:30 PM", "1/1/2017 4:50 AM", random.random()))

typelist2 = list()
typelist2.append("engine")
typelist2.append("cage")
typelist2.append("sensors")
typelist2.append("other")

url = 'http://95.214.63.201:5984/_session'
r = requests.post(url, data={'name': 'admin', 'password': 'Pf[fh42Fkrfi!'})
cook = r.headers['Set-Cookie']
cook = cook.split(';')[0]
header ={'Cookie': cook}

comp = list()
comp.append({"_id": "a0cdb12d7eab605ad6f5a44b644d19cb","_rev": "1-58fc5b8eee1408448541a9be95a41a84"})
comp.append({"_id": "a0cdb12d7eab605ad6f5a44b644d50b2","_rev": "1-14270ea2ffe2c8d5bbb4f1ab149a01c0"})
comp.append({"_id": "a0cdb12d7eab605ad6f5a44b645c0810","_rev": "1-7a24399dece881389a0e518222ec5ccb"})

max_floorlist = list()
max_floorlist.append(9)
max_floorlist.append(12)
max_floorlist.append(18)

typelist = list()
typelist.append("ukl") 
typelist.append("uel") 
typelist.append("otis") 

for k in range(1,100):


    tmp = random.randint(0,2)
    parent = comp[tmp]

    tmp = random.randint(0,2)
    max_floor = max_floorlist[tmp]
    height = max_floor*5

    tmp = random.randint(1,3)
    for j in range(tmp):

        tmp = random.randint(1,4)
        for i in range(tmp):
            nid = i

            address = "город Москва, Люблинская улица, дом "+str(k)+', п'+str(j+1)

            mechanic_phone = "+7(999)123-45-67"

            elements = list()
            maxsteps = 0

            for el in typelist2:
                steps = (random.randint(10,36)*365*3)
                data = {'type':el,'is_current':True,'install_at':str(randomDate("1/1/2015 1:30 PM", "1/1/2017 4:50 AM", random.random())),
        '       replacement_at':'null','steps':steps}
                elements.append(data)
                if steps > maxsteps:
                    maxsteps = steps


            tmp = random.randint(0,2)
            typ = typelist[tmp]

            data = {'parent':parent,'nid':nid,'address':address,'mechanic_phone':mechanic_phone,
            'type':typ,'max_floor':max_floor,"height":height,'schemes':[elements[0],elements[1],elements[2],elements[3]],'maxsteps':maxsteps}
            
            url = 'http://95.214.63.201:5984/lifts2/'
            r = requests.post(url, headers=header, json=data)