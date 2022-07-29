import dataclasses
from main import client
import json
## the idea
# before pulling item changes from api
#
#
#
##
item1 = "Pridwen"
item2 = "Breastplate of Valor"
mydb = client["Item_Data"]
mycol = mydb[item1]
mycol1 = mydb[item2]
item1_stats,item2_stats = [], []


for x in mycol.find({}, {"ItemDescription": 1}): 
    for stat in x["ItemDescription"]["Menuitems"]:
        item1_stats.append(stat["Description"] +  ":" + stat["Value"]) 


for x in mycol1.find({}, {"ItemDescription": 1}): 
    for stat in x["ItemDescription"]["Menuitems"]:
        item2_stats.append(stat["Description"] +  ":" + stat["Value"]) 

item1_stats = json.loads(json.dumps(dict(stats.split(':') for stats in item1_stats)))        
item2_stats = json.loads(json.dumps(dict(stats.split(':') for stats in item2_stats)))
#print(item1_stats)
#print(item2_stats)

changes = []
keys = list(item2_stats.keys())
for key in item1_stats:
    if key in item2_stats:
        changes.append(key + ":" + (str)((int)("".join(filter(str.isdigit,item1_stats[key])))-(int)("".join(filter(str.isdigit,item2_stats[key])))))
        keys.remove(key)
    else:
        changes.append(key + ":" + (str)((int)("".join(filter(str.isdigit,item1_stats[key])))))
for key in keys:
    changes.append(key + ":" + (str)("-" + "".join(filter(str.isdigit,item2_stats[key]))))




changes = json.loads(json.dumps(dict(stats.split(':') for stats in changes)))

print("Differences between " + item1 + " and " + item2 + ":\n" )
print(changes)
