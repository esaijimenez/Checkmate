import React from "react";
import { Link } from "react-router-dom";
import "../styles/Popup.css";

const Popup = ({ restartGame, goToHomeScreen }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Game Over!</h2>
                <p>You have lost all three lives.</p>
                <div className="popup-buttons">
                    <Link to="/gamemode"><button>Restart</button></Link>
                    <Link to="/"><button>Return Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Popup;
