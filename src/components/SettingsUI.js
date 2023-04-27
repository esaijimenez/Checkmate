import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar.js";
import "../styles/Settings-style.css";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}



  render() {
    // this functino executes on the save settings button click
    function saveSettings(){
      if(document.getElementById('dot').checked){
        sessionStorage.setItem('dotSetting', 'dots');
      }else{
        sessionStorage.setItem('dotSetting', 'nodots');
      }
      //alerts user of settings being saved. This can be removed if need be
      alert("settings saved!");
    }

    return (
      <div className="settings">
        <Navbar />
        <h1 class="settings--title">Settings</h1>

        <div className="settings--container">
          <div className="user--leaderboard">
            <h2 class="settings--subheading">Recent Scores</h2>

            <table class="user--leaderboard--results">
              <thead>
                <tr>
                  <th class="user--th">Score</th>
                  <th class="user--th">Time</th>
                  <th class="user--th">Date</th>
                </tr>
              </thead>
              <tbody class="user--scores--table"></tbody>
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
            </label>

            <button id = 'save' onClick={saveSettings}>Save Setting</button>
          </div>
        </div>
      </div>
    );
  }
}
