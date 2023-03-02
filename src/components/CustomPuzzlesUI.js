import React from "react";
import { Link } from "react-router-dom";

import "../styles/CustomPuzzlesUI-style.css";

export default class CustomPuzzlesUI extends React.Component {
  render() {
    return (
      <div className="customPuzzle">
        <Link to="/">
          <button class = "customPuzzle-back-button">Back</button>
        </Link>

        <div className="customPuzzle-container">
          <div className="customPuzzle-item">
            <h1 class="customPuzzle-title">Create</h1>
            <p class="customPuzzle-caption">Create your own puzzles.</p>
            <div className="customPuzzle-buttons-container">
              <Link to="/create">
                <button class="customPuzzle-button">Create</button>
              </Link>
            </div>
          </div>

          <div className="customPuzzle-item">
            <h1 class="customPuzzle-title">Play</h1>
            <p class="customPuzzle-caption">Play user created puzzles.</p>
            <div className="customPuzzle-buttons-container">
              <Link to="/play">
                <button class="customPuzzle-button">Play</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
