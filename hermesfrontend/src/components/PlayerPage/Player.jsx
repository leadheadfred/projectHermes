import React, { useState, useEffect } from 'react';
import PlayerHeader from './PlayerHeader';
import RankDisplay from './RankDisplay';
import GodDisplay from './GodDisplay';
import { MatchDisplay } from '..';


class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: "" };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
      this.props.setPlayer(event.target[0].value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          {" "}
          <label style={{color: "white"}}>
            Player Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />{" "}
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

const compare = (a, b) => {
  return b.matches - a.matches
}

export default function Player(props) {
    const [player, setPlayer] = useState("")
    const [playerLevel, setPlayerLevel] = useState(-1)
    const [icon, setIcon] = useState("")
    const [rank, setRank] = useState("")
    const [tier, setTier] = useState("")
    const [winRate, setWinRate] = useState("")
    const [games, setGames] = useState(0)
    const [godList, setGodList] = useState([])
    useEffect(() => {
      fetch("/getplayergods/".concat(player)).then((res) =>
        res.json().then((data) => {
          let newData = Object.values(data).sort(compare)
          setGodList([])
          Object.keys(newData).map((god, index) => {
            if (index < 10) {
              if (Object.keys(newData[god]).indexOf("god") !== -1){
              setGodList((godList) => [
                ...godList,
                {
                  ...newData[god]
                }
              ])
            }
            }
          })
        })
      );
  }, [player]);
    const [matchList, setMatchList] = useState([])
    useEffect(() => {
        fetch("/getplayermatch/".concat(player)).then((res) =>
          res.json().then((data) => {
              console.log(data)
              Object.keys(data).map((match) => {
              setMatchList((matchList) => [
                ...matchList,
                {
                  ...data[match]
                },
              ]);
            })
          })
        );
      }, [player]);
      console.log(matchList)
  //   useEffect(() => {
  //     fetch("/getplayergeneral/".concat(player)).then((res) =>
  //       res.json().then((data) => {
  //           console.log(data)
  //           setPlayerLevel(data.level)
  //           setIcon(data.avatar)
  //           setRank(data.rank)
  //           setTier(data.tier)
  //           setWinRate(data.winRate)
  //           setGames(data.games)
  //       })
  //     );
  // }, [player]);
      // <NameForm setPlayer={setPlayer} />
    return(
      <div className="player-profile-page" style={{paddingTop: "100px"}}>
        <div className="player-profile-container content-side-padding">
          <div className="content-side-padding background-image-container">

          </div>
          <PlayerHeader player={player} level={playerLevel} icon={icon}/>
          <RankDisplay rank={rank} tier={tier} winrate={winRate} games={games}/>
<<<<<<< HEAD
          <GodDisplay godList={godList}/>
=======
          <GodDisplay />
          <MatchDisplay matchList={matchList} player={player}/>
>>>>>>> c03b427c592424aaa5a30a0be252a6aca175fafe
          <NameForm setPlayer={setPlayer} />
        </div>
      </div>
    )
}