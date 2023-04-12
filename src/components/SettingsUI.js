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
            <div className="settings--radio--buttons">
              <input
                type="radio"
                name="indicator"
                id="dots"
                class="input-hidden"
              />
              <label for="no-dots">
                <img
                  src="images\tutorial\pawn_with_dots.PNG"
                  alt="Pawn with indicator dots."
                  class="settings--img"
                />
              </label>

              <input
                type="radio"
                name="indicator"
                id="no--dots"
                class="input-hidden"
              />
              <label for="no--dots">
                <img
                  src="images\tutorial\Pawn1.PNG"
                  alt="Pawn without indicator dots."
                  class="settings--img"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
