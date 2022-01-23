import React, { useState, useEffect, useContext } from "react";
import { DamageContext } from "./DamageContext";

export default function CombatStatSection(props) {
    const [drop, allgods, board, setBoard, god, setGod, build, setBuild, dropItem] =
    useContext(DamageContext);
    console.log(props.combatStats)
    return(
        <div className="content-section">
            <div className="content-section_header">
                {god} Stats
            </div>
            <div className="combat-stats-list">
                {Object.keys(props.combatStats).map(stat => {
                    return (
                        <p>{stat}: {props.combatStats[stat]}</p>
                    )
                })}
            </div>
        </div>
    )
}