import { GameStats } from "../GeneralInterface"

export interface IMatch {
    Entry_Datetime: string,
    Mode: string,
    Queue_Type: string,
    MatchId: number,
    Minutes: number,
    Ban0: string,
    Ban1: string,
    Ban2: string,
    Ban3: string,
    Ban4: string,
    Ban5: string,
    Ban6: string,
    Ban7: string,
    Ban8: string,
    Ban9: string,
    player0?: IPlayer,
    player1: IPlayer,
    player2: IPlayer,
    player3?: IPlayer,
    player4?: IPlayer,
    player5?: IPlayer,
    player6?: IPlayer,
    player7?: IPlayer,
    player8?: IPlayer,
    player9?: IPlayer,
} 

export interface Team {
    bans: string[],
    gods: string[],
    mmr: number[],
    team: string,
    carryPlayer: string,
    carryScore: number,
}

export interface IPlayer extends GameStats {
    godName: string,
    Ranked_Stat_Conq: number,
    Account_Level: number,
    Assists: number,
    Camps_Cleared: number,
    Conquest_Points: number,
    Conquest_Tier: number,
    Damage_Bot: number,
    Damage_Done_Magical: number,
    Damage_Done_Physical: number,
    Damage_Player: number,
    Damage_Mitigated: number,
    Damage_Taken: number,
    Damage_Taken_Magical: number,
    Damage_Taken_Physical: number,
    Distance_Traveled: number,
    Deaths: number,
    Final_Match_Level: number,
    godId: number,
    Gold_Earned: number,
    Gold_Per_Minute: number,
    Healing: number,
    Healing_Bot: number,
    Healing_Player_Self: number,
    Item_Purch_1: string,
    Item_Purch_2: string,
    Item_Purch_3: string,
    Item_Purch_4: string,
    Item_Purch_5: string,
    Item_Purch_6: string,
    Item_Active_1: string,
    Item_Active_2: string,
    Item_Active_3: string,
    Item_Active_4: string,
    Kills_Bot: number,
    Killing_Spree: number,
    Kills_Double: number,
    Kills_Fire_Giant: number,
    Kills_First_Blood: number,
    Kills_Gold_Fury: number,
    Kills_Penta: number,
    Kills_Phoenix: number,
    Kills_Player: number,
    Kills_Quadra: number,
    Kills_Single: number,
    Kills_Triple: number,
    Multi_kill_Max: number,
    Objective_Assists: number,
    Region: string,
    Role: string,
    Skin: string,
    Structure_Damage: number,
    Time_Dead: number,
    Towers_Destroyed: number,
    PlayerId: string,
    Player_Name: string,
    Wards_Placed: number,
    Win_Status: string,
    MatchID: number,
    Mode: string, 
    Queue_Type: string,
    godBuild: IBuild[]
}

export interface IBuild {
    slot1: IItem,
    slot2: IItem,
    slot3: IItem,
    slot4: IItem,
    slot5: IItem,
    slot6: IItem,
}

export interface IItem {
    DeviceName: string,
    ItemDescription?: {},
    ItemTier: number,
    ShortDesc: string,
    absolutePrice: number,
    itemIcon_URL: string,
    relativePrice: string,
}