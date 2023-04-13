import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameOver.css";

const GameOver = () => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2 class = "popup-message-main">Game Over!</h2>
                <p class = "popup-message-sub">You have lost all lives.</p>
                <div className="popup-buttons">
                    <Link to="/gamemode"><button class = 'popup-button-1'>Restart Game</button></Link>
                    <Link to="/"><button class = 'popup-button-2'>Return Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default GameOver;
