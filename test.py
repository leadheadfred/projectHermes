import dataclasses
from main import client
import json
## the idea
# Detect an item change when an update happens
# Feed the changed item into item 2, use the item currently in the DB for item 1
# Return a json of stat changes
# Do something with that
# This only works with basic stats, not passive
##
item1 = "Winged Blade"
item2 = "Relic Dagger"
mydb = client["Item_Data"]
mycol = mydb[item1]
mycol1 = mydb[item2]
item1_stats,item2_stats = [], []

#Formats item stats in a more useable way
for x in mycol.find({}, {"relativePrice": 1}): 
    item1_stats.append("Relative price"+  ":" + (str)(x["relativePrice"]))

for x in mycol.find({},{"absolutePrice" : 1}):
    item1_stats.append("Absolute price"+  ":" + (str)(x["absolutePrice"]))

for x in mycol.find({}, {"ItemDescription": 1}): 
    for stat in x["ItemDescription"]["Menuitems"]:
        item1_stats.append(stat["Description"] +  ":" + stat["Value"]) 


for x in mycol1.find({}, {"relativePrice": 1}): 
    item2_stats.append("Relative price"+  ":" + (str)(x["relativePrice"]))

for x in mycol1.find({},{"absolutePrice" : 1}):
    item2_stats.append("Absolute price"+  ":" + (str)(x["absolutePrice"]))

for x in mycol1.find({}, {"ItemDescription": 1}): 
    for stat in x["ItemDescription"]["Menuitems"]:
        item2_stats.append(stat["Description"] +  ":" + stat["Value"]) 

item1_stats = dict(stats.split(':') for stats in item1_stats)      
item2_stats = dict(stats.split(':') for stats in item2_stats)

#rint(item1_stats)
#print(item2_stats)

# Compares item stats 

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

changes = dict(stats.split(':') for stats in changes)

print("Differences between " + item1 + " and " + item2 + ":\n" )
print(changes)
