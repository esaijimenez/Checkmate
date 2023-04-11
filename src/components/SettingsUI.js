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
            <h2>Recent Scores</h2>

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

        <h2>Options</h2>
        

        </div>
      </div>
    );
  }
}
