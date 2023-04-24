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
      numBulletSubmissions: 0,
      bulletSubmissions: [],
      numClassicalSubmissions: 0,
      classicalSubmissions: [],
      classicalScoreArray: [],
      name: "",
      score: 0,
      time: "",
      showRefreshPage: false,
    };
  }

  componentDidMount() {
    this.getBulletScores();
    this.getClassicalScores();
  }

  getBulletScores = () => {
    const mateRef = ref(db, "/leaderboards/bullet");
    onValue(mateRef, (snapshot) => {
      const count = snapshot.size;

      //Pushes all the puzzles from the database into an array
      let bulletSubmissions = [];
      snapshot.forEach((scoreSnapshot) => {
        bulletSubmissions.push({
          name: scoreSnapshot.child("name").val(),
          score: scoreSnapshot.child("score").val(),
          time: scoreSnapshot.child("time").val(),
        });
      });

      for (let i = count; i >= 0; i--) {
        this.setState({
          bulletSubmissions: bulletSubmissions,
        });
      }

      this.setState({
        numBulletSubmissions: count
      });

      this.bullet()

      console.log("NumBullet: " + this.state.numBulletSubmissions);
      console.log("Count: " + count);

      this.addRowToBulletTable(this.state.numBulletSubmissions)

      if (this.state.numBulletSubmissions === 0) {
        this.setState({
          showRefreshPage: true
        })
      }
    });
  };

  getClassicalScores = () => {
    const mateRef = ref(db, "/leaderboards/classical");
    onValue(mateRef, (snapshot) => {
      const count = snapshot.size;

      //Pushes all the puzzles from the database into an array
      let classicalSubmissions = [];
      snapshot.forEach((scoreSnapshot) => {
        classicalSubmissions.push({
          name: scoreSnapshot.child("name").val(),
          score: scoreSnapshot.child("score").val(),
        });
      });

      for (let i = count; i >= 0; i--) {

        this.setState({
          classicalSubmissions: classicalSubmissions,
        });
      }

      this.setState({
        numClassicalSubmissions: count
      });

      this.classical()

      console.log("NumClassical: " + this.state.numClassicalSubmissions);
      console.log("Count: " + count);

      this.addRowToClassicalTable(this.state.numClassicalSubmissions)

      if (this.state.numClassicalSubmissions === 0) {
        this.setState({
          showRefreshPage: true
        })
      }
    });
  };

  addRowToBulletTable = (numBulletSubmissions) => {
    const table = document.getElementById("bullet--leaderboard--results");
    const tbody = table.getElementsByTagName("tbody")[0];
    for (let i = 0; i < numBulletSubmissions; i++) {
      const row = document.createElement("tr");

      const rank = document.createElement("td");
      rank.textContent = [i + 1];
      row.appendChild(rank);

      const name = document.createElement("td");
      console.log("this.state.bulletSubmissions[i].name: ", this.state.bulletSubmissions[i].name);
      name.textContent = this.state.bulletSubmissions[i].name;
      row.appendChild(name);

      const score = document.createElement("td");
      score.textContent = this.state.bulletSubmissions[i].score;
      row.appendChild(score);

      const time = document.createElement("td");
      time.textContent = this.state.bulletSubmissions[i].time;
      row.appendChild(time);

      tbody.appendChild(row);
    }
  }

  addRowToClassicalTable = (numClassicalSubmissions) => {
    const table = document.getElementById("classical--leaderboard--results");
    const tbody = table.getElementsByTagName("tbody")[0];
    for (let i = 0; i < numClassicalSubmissions; i++) {
      const row = document.createElement("tr");

      const rank = document.createElement("td");
      rank.textContent = [i + 1];
      row.appendChild(rank);

      const name = document.createElement("td");
      name.textContent = this.state.classicalSubmissions[i].name;
      row.appendChild(name);

      const score = document.createElement("td");
      score.textContent = this.state.classicalSubmissions[i].score;
      row.appendChild(score);

      tbody.appendChild(row);
    }
  }

  classical = () => {
    let _classicalSubmissions = this.state.classicalSubmissions.sort((a, b) => b.score - a.score);

    this.setState({
      classicalSubmissions: [],
      numClassicalSubmissions: _classicalSubmissions.length
    })

    console.log("numClassicalSubmissions: ", this.state.numClassicalSubmissions)

    if (this.state.numClassicalSubmissions >= 10) {
      for (let i = 0; i < 10; i++) {
        console.log("i: ", _classicalSubmissions[i])
        this.state.classicalSubmissions.push(_classicalSubmissions[i])
      }
    } else {
      for (let i = 0; i < this.state.numClassicalSubmissions; i++) {
        console.log("i: ", _classicalSubmissions[i])
        this.state.classicalSubmissions.push(_classicalSubmissions[i])
      }
    }



    console.log(this.state.classicalSubmissions)
  }

  bullet = () => {
    let _battleSubmissions = this.state.bulletSubmissions.sort((a, b) => b.score - a.score);

    this.setState({
      bulletSubmissions: [],
      numBulletSubmissions: _battleSubmissions.length
    })

    console.log("numBulletSubmissions: ", this.state.numBulletSubmissions)

    if (this.state.numBulletSubmissions >= 10) {
      for (let i = 0; i < 10; i++) {
        console.log("i: ", _battleSubmissions[i])
        this.state.bulletSubmissions.push(_battleSubmissions[i])
      }
    }
    else {
      for (let i = 0; i < this.state.numBulletSubmissions; i++) {
        console.log("i: ", _battleSubmissions[i])
        this.state.bulletSubmissions.push(_battleSubmissions[i])
      }
    }


    console.log(this.state.bulletSubmissions)

  }

  handleRefreshPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <div className="leaderboard">
        <Navbar />

        <h1 className="leaderboard--title">Leaderboard</h1>

        {this.state.showRefreshPage && <button className="refresh-button" onClick={this.handleRefreshPage}>Refresh List</button>}

        <div className="leaderboard--container">

          <div className='classical--leaderboard'>
            <h2>Classical Mate</h2>

            <table id="classical--leaderboard--results">
              <thead>
                <tr>
                  <th class="classical--th">Rank</th>
                  <th class="classical--th--name">Name</th>
                  <th class="classical--th">Score</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>


          <div className='bullet--leaderboard'>
            <h2>Bullet Mate</h2>
            <table id="bullet--leaderboard--results">
              <thead>
                <tr>
                  <th class="bullet--th">Rank</th>
                  <th class="bullet--th--name">Name</th>
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
