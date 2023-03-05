import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameOver.css";

const GameOverLeaderboard = () => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Top 10!</h2>
                <p>You made it on the leaderboard!.</p>
                <div className="popup-buttons">
                    <Link to="/gamemode"><button>Restart</button></Link>
                    <Link to="/"><button>Return Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default GameOverLeaderboard;
