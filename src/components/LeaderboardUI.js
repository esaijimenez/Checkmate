import React from "react";
import { Link } from "react-router-dom";
import ClassicalUI from "./ClassicalUI";
import { db } from "../firebase.js";
import { ref, onValue, set } from "firebase/database";
import Navbar from "./Navbar.js";

import "../styles/LeaderboardUI-style.css";

export default class LeaderboardUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      _score: 1,
      allScores: [],
      numScores: 0,
    };
  }

  componentDidMount() {
    this.getScores();
    this.setScores("Test", 1);
  }

  getScores = () => {
    const mateRef = ref(db, "/leaderboards/classical");
    onValue(mateRef, (snapshot) => {
      const count = snapshot.size;

      //Pushes all the puzzles from the database into an array
      let allScores = [];
      snapshot.forEach((scoreSnapshot) => {
        allScores.push({
          name: scoreSnapshot.child("name").val(),
          score: scoreSnapshot.child("score").val(),
        });
      });
      //Sets some of the state variables
      this.setState({
        numScores: count,
        allScores: allScores,
      });
    });
  };

  setScores = (name, score) => {
    let userName = name;
    let userScore = score;
    const mateRef = ref(db, "/leaderboards/classical");
    set(mateRef, {
      name: userName,
      score: userScore,
    });
  };

  render() {
    return (
      <div className="leaderboard">
        <Navbar />

        <h1 className="leaderboard--title">Leaderboard</h1>

        <div className="leaderboard--container">

        <div className = 'classical--leaderboard'>
        <h2>Classical Mate</h2>

        <table class="classical--leaderboard--results">
          <thead>
            <tr>
              <th class="classical--th">Rank</th>
              <th class="classical--th">Name</th>
              <th class="classical--th">Score</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        </div>

        <div className = 'bullet--leaderboard'>
        <h2>Bullet Mate</h2>
        <table class="bullet--leaderboard--results">
          <thead>
            <tr>
              <th class="bullet--th">Rank</th>
              <th class="bullet--th">Name</th>
              <th class="bullet--th">Score</th>
              <th class="bullet--th">Time</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        </div>
      </div>
      </div>
    );
  }
}
