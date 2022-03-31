from cProfile import run
import pymongo
from datetime import datetime
from constants import godsDict, roles, ranks, slots
from __init__ import client


class GodData:
    def __init__(self, god, mode, queue_type):
        self.name = god
        self.matches = []
        self.mode = mode
        self.queue_type = queue_type

    def insert_ban(self, matchId, rank, entry_datetime, patch):
        mydb = client["single_god_bans"]
        mycol = mydb[self.name]
        mycol.insert_one({
            "matchId": matchId,
            "rank": rank,
            "patch": patch,
            "Entry_Datetime": entry_datetime,
            "mode": self.mode,
        })

    def set_matches(self, data):
        """append match Ids to self.matches when gods in data"""
        for match in data:
            match_bans = 0
            match_picks = 0
            for key in match:
                if "player" in key and match[key]["godName"] == self.name and match_picks == 0:
                    self.matches.append(match)
                    match_picks += 1
                if "Ban" in key and match[key] == self.name and match_bans == 0:
                    try:
                        match_bans += 1
                        self.insert_ban(match["MatchId"], normalize_rank(
                            match["player0"]["Conquest_Tier"]), match["Entry_Datetime"], match["Patch"])
                    except:
                        print("error")

    def get_matches(self):
        return len(self.matches)

    def calc_items(self):
        mydb = client["single_items"]
        mycol = mydb[self.name]
        set = []
        for match in self.matches:
            build = {}
            player_ids = []
            for key in match:
                if "player" in key and match[key]["godName"] == self.name and match[key]["PlayerId"] not in player_ids:
                    player_ids.append(match[key]["PlayerId"])
                    role_played = match[key]["Role"]
                    rank = normalize_rank(match[key]["Conquest_Tier"])
                    win_status = match[key]["Win_Status"]
                    matchId = match[key]["MatchID"]
                    build = {}
                    for player_key in match[key]:
                        if "Item_Purch" in player_key:
                            item, purch, number = player_key.split("_")
                            build[f"slot{number}"] = match[key][player_key]

                    set.append(
                        {
                            self.name: build,
                            "role_played": role_played,
                            "rank": rank,
                            "win_status": win_status,
                            "matchId": matchId,
                            "patch": match["Patch"],
                            "Entry_Datetime": match["Entry_Datetime"],
                            "mode": self.mode,
                            "queue_type": self.queue_type
                        }
                    )
        mycol.insert_many(set)

    def calc_match_stats(self):
        mydb = client["single_match_stats"]
        mycol = mydb[self.name]
        set = []
        for match in self.matches:
            player_ids = []
            for key in match:
                if "player" in key and match[key]["godName"] == self.name and match[key]["PlayerId"] not in player_ids:
                    player_ids.append(match[key]["PlayerId"])
                    build = {}
                    for player_key in match[key]:
                        if "Item_Purch" in player_key:
                            if "S8" in match[key][player_key]:
                                match[key][player_key] = match[key][player_key][2:]
                            item, purch, number = player_key.split("_")
                            build[f"slot{number}"] = match[key][player_key]
                        if "Item_Active" in player_key:
                            if "S8" in match[key][player_key]:
                                match[key][player_key] = match[key][player_key][2:]
                            item, purch, number = player_key.split("_")
                            build[f"relic{number}"] = match[key][player_key]

                    rank = normalize_rank(match[key]["Conquest_Tier"])
                    role = match[key]["Role"]
                    matchId = match[key]["MatchID"]
                    kills = match[key]["Kills_Player"]
                    deaths = match[key]["Deaths"]
                    assists = match[key]["Assists"]
                    damage_player = match[key]["Damage_Player"]
                    damage_taken = match[key]["Damage_Taken"]
                    damage_mitigated = match[key]["Damage_Mitigated"]
                    healing = match[key]["Healing"]
                    healing_self = match[key]["Healing_Player_Self"]
                    win_status = match[key]["Win_Status"]
                    gold = match[key]["Gold_Earned"]
                    damage_bot = match[key]["Damage_Bot"]
                    kills_bot = match[key]["Kills_Bot"]
                    camps_cleared = match[key]["Camps_Cleared"]
                    tower_kills = match[key]["Towers_Destroyed"]
                    phoenix_kills = match[key]["Kills_Phoenix"]
                    tower_damage = match[key]["Structure_Damage"]
                    wards_placed = match[key]["Wards_Placed"]
                    objective_assists = match[key]["Objective_Assists"]
                    player = match[key]["Player_Name"]
                    enemy = ""
                    enemies = []
                    win_status = match[key]["Win_Status"]

                    for key in match:
                        if "player" in key and match[key]["godName"] != self.name and match[key]["Role"] == role:
                            enemy = match[key]["godName"]
                        if "player" in key and match[key]["godName"] != self.name and match[key]["Win_Status"] != win_status:
                            enemies.append(match[key]["godName"])

                    set.append({
                        "player": player,
                        "rank": rank,
                        "role": role,
                        "matchId": matchId,
                        "kills": kills,
                        "deaths": deaths,
                        "assists": assists,
                        "damage_player": damage_player,
                        "damage_taken": damage_taken,
                        "damage_mitigated": damage_mitigated,
                        "healing": healing,
                        "healing_self": healing_self,
                        "gold": gold,
                        "damage_bot": damage_bot,
                        "kills_bot": kills_bot,
                        "camps_cleared": camps_cleared,
                        "tower_kills": tower_kills,
                        "phoenix_kills": phoenix_kills,
                        "tower_damage": tower_damage,
                        "objective_assists": objective_assists,
                        "wards_placed": wards_placed,
                        "win_status": win_status,
                        "patch": match["Patch"],
                        "enemy": enemy,
                        "enemies": enemies,
                        "Entry_Datetime": match["Entry_Datetime"],
                        "time": match["Match_Duration"],
                        "mode": self.mode,
                        "queue_type": self.queue_type,
                        "build": build,
                        "god": self.name,
                        self.name: build
                    })
        if len(self.matches) > 0:
            mycol.insert_many(set)


def normalize_rank(tier):
    rank = "Error"
    if tier <= 5:
        rank = "Bronze"
    elif tier <= 10:
        rank = "Silver"
    elif tier <= 15:
        rank = "Gold"
    elif tier <= 20:
        rank = "Platinum"
    elif tier <= 25:
        rank = "Diamond"
    elif tier == 26:
        rank = "Masters"
    elif tier == 27:
        rank = "Grandmaster"
    return rank


def get_date():
    time = datetime.now()
    return f"{time.month}/{time.day}/{time.year}"


# {"Entry_Datetime": {"$lte": "8/30/2021", "$gte": "8/27/2021" }}
def run_format(patch, date, mode, queue_type):
    sum_gods = 0
    mydb = client["Matches"]
    mycol = mydb[f"{patch} Joust Matches"]
    set_matches = []
    count = 0
    for match in mycol.find():
        set_matches.append(match)

    for god in godsDict:

        godsDict[god] = GodData(god, mode, queue_type)
        godsDict[god].set_matches(set_matches)
        sum_gods += godsDict[god].get_matches()
        # godsDict[god].calc_matchups()
        # godsDict[god].calc_items()
        godsDict[god].calc_match_stats()
        # godsDict[god].calc_objective_stats()
        count += godsDict[god].get_matches()
        print(f"{god}: {godsDict[god].get_matches()}")
    print(count)


def format_no_query(match, mode, queue_type):
    for god in godsDict:
        godsDict[god] = GodData(god, mode, queue_type)
        godsDict[god].set_matches(match)
        godsDict[god].calc_match_stats()


if __name__ == "__main__":
    run_format("9.3", "", "Joust", "Ranked")
