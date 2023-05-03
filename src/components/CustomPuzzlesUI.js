import React from "react";
import { Link } from "react-router-dom";

import "../styles/CustomPuzzlesUI-style.css";

export default class CustomPuzzlesUI extends React.Component {
  render() {
    return (
      <div className="customPuzzle">
        <Link to="/">
          <button class="customPuzzle-back-button">Back</button>
        </Link>

        <div className="customPuzzle-container">
          <div className="customPuzzle-item1">
            <h1 class="customPuzzle-title">Create</h1>
            <p class="customPuzzle-caption">Create your own puzzles.</p>
            <p class="gameMode--page--img">&#9819;</p>
            <div className="customPuzzle-buttons-container">
              <Link to="/create">
                <button class="customPuzzle-button">Create</button>
              </Link>
            </div>
          </div>

          <div className="customPuzzle-item2">
            <h1 class="customPuzzle-title">Play</h1>
            <p class="customPuzzle-caption">Play user created puzzles.</p>
            <p class="gameMode--page--img">&#9818;</p>
            <div className="customPuzzle-buttons-container">
              <Link to="/play-list">
                <button class="customPuzzle-button">Play</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
