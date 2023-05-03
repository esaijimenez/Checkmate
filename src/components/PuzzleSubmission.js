import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameOver.css";

const PuzzleSubmitted = () => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2 class="popup-message-main">Puzzle Submitted!</h2>
                <div className="popup-buttons">
                    <Link to="/custom-puzzles">
                        <button class="popup-button-1">Custom Puzzles</button>
                    </Link>
                    <Link to="/">
                        <button class="popup-button-2">Return Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PuzzleSubmitted;
