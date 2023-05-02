import React from "react";
import { db } from "../firebase.js";
import { ref, onValue, set, update } from 'firebase/database';
import { Link } from "react-router-dom";

import Navbar from "./Navbar.js";
import "../styles/Settings-style.css";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foundUser: false,
      foundUserIndex: 0,
      recentScores: [],
      numRecentScores: 0,
      showRefreshPage: false,
    };
  }

  componentDidMount() {
    this.getRecentScores();
  }

  getRecentScores() {
    const usersRef = ref(db, '/users');
    onValue(usersRef, (snapshot) => {
      const count = snapshot.size;
      console.log(count)

      let users = [];
      snapshot.forEach((userSnapshot) => {
        users.push({
          username: userSnapshot.child("username").val()
        })
      });

      console.log(users)

      for (let i = 0; i < users.length; i++) {
        console.log("this.state.username: ", localStorage.getItem("username"));
        console.log("users[i]: ", users[i].username);
        if (localStorage.getItem("username") === users[i].username) {
          console.log("User found");
          console.log("[i]", i);
          const usersRef = ref(db, '/users');
          onValue(usersRef, (snapshot) => {
            const count = snapshot.size;

            let users = [];
            snapshot.forEach((userSnapshot) => {
              users.push({
                username: userSnapshot.child("username").val()
              })
            });

            console.log(users)

            for (let i = 0; i < users.length; i++) {
              console.log("this.state.username: ", localStorage.getItem("username"));
              console.log("users[i]: ", users[i].username);
              if (localStorage.getItem("username") === users[i].username) {
                console.log("User found");
                console.log("[i]", i);
                this.setState({
                  foundUser: true,
                  foundUserIndex: i
                })
              }
            }
          })

          console.log("this.state.foundUser: ", this.state.foundUser)

          if (this.state.foundUser === false) {
            this.setState({
              showRefreshPage: true
            })
          }


          if (this.state.foundUser === true) {
            const scoreRef = ref(db, "/users/" + this.state.foundUserIndex + "/recentScores");
            onValue(scoreRef, (snapshot) => {
              const count = snapshot.size;

              let recentScores = [];
              snapshot.forEach((scoreSnapshot) => {
                recentScores.push({
                  date: scoreSnapshot.child("date").val(),
                  score: scoreSnapshot.child("score").val(),
                  time: scoreSnapshot.child("time").val(),
                });
              });
              console.log(recentScores)
              console.log("Count: ", count)

              if (count === 0) {
                this.setState({
                  showRefreshPage: true
                })
              }

              this.setState({ recentScores: recentScores });

              this.scores();

              this.addScoreToTable(this.state.recentScores.length)
            });
          }
        }
      }
    })
  }

  addScoreToTable = (numRecentScores) => {
    console.log("HELOOOOOOOOOOOO")
    console.log("numRecentScores: ", numRecentScores)
    const table = document.getElementById("user--leaderboard--results");
    const tbody = table.getElementsByClassName("user--scores--table")[0];
    for (let i = 0; i < numRecentScores; i++) {
      const row = document.createElement("tr");

      const score = document.createElement("td");
      score.textContent = this.state.recentScores[i].score;
      console.log(this.state.recentScores[i].score)
      row.appendChild(score);

      const time = document.createElement("td");
      time.textContent = this.state.recentScores[i].time;
      row.appendChild(time);

      const date = document.createElement("td");
      date.textContent = this.state.recentScores[i].date;
      row.appendChild(date);

      tbody.appendChild(row);
    }
  }

  scores = () => {
    let _scores = this.state.recentScores.reverse();

    this.setState({
      recentScores: [],
      numRecentScores: _scores.length
    })

    console.log("numClassicalSubmissions: ", this.state.numRecentScores)

    if (this.state.numRecentScores >= 5) {
      for (let i = 0; i < 5; i++) {
        console.log("i: ", _scores[i])
        this.state.recentScores.push(_scores[i])
      }
    } else {
      for (let i = 0; i < this.state.numRecentScores; i++) {
        console.log("i: ", _scores[i])
        this.state.recentScores.push(_scores[i])
      }
    }

    console.log(this.state.recentScores)
  }

  handleRefreshPage = () => {
    window.location.reload();
    this.setState({
      showRefreshPage: false
    })
  }

  render() {
    // this functino executes on the save settings button click
    function saveSettings() {
      if (document.getElementById('dot').checked) {
        sessionStorage.setItem('dotSetting', 'dots');
      }
      else {
        sessionStorage.setItem('dotSetting', 'nodots');
      }
      //alerts user of settings being saved. This can be removed if need be
      alert("settings saved!");
    }

    return (
      <div className="settings">
        <Navbar />
        <h1 class="settings--title">Settings</h1>

        {this.state.showRefreshPage && <button className="refresh-button" onClick={this.handleRefreshPage}>Refresh List</button>}

        <div className="settings--container">
          <div className="user--leaderboard">
            <h2 class="settings--subheading">Recent Scores</h2>

            <table id="user--leaderboard--results">
              <thead>
                <tr>
                  <th class="user--th">Score</th>
                  <th class="user--th">Time</th>
                  <th class="user--th">Date</th>
                </tr>
              </thead>
              <tbody class="user--scores--table">

              </tbody>
            </table>
          </div>

          <div className="options--container">
            <h2 class="settings--subheading">Options</h2>

            <input
              type="radio"
              name="preference"
              id="dot"
              class="input-hidden"
              value="dot"
              checked="checked"
            />
            <label for="dot">
              <img
                src="images\tutorial\pawn_with_dots.png"
                alt="Dots toggled."
                class="settings--img"
              />
            </label>

            <input
              type="radio"
              name="preference"
              id="nodot"
              class="input-hidden"
              value="nodot"
            />
            <label for="nodot">
              <img
                src="images\tutorial\Pawn1.PNG"
                alt="No dots."
                class="settings--img"
              />
            </label><br />

            <button id='save' onClick={saveSettings}>Save Setting</button>
          </div>
        </div>
      </div>
    );
  }
}
