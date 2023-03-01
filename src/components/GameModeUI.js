import React from "react";
import { Link } from "react-router-dom";

import '../styles/GameModeUI-style.css'

export default class GameModeUI extends React.Component {

    render() {
        return (
            <div className = "gameMode">
                <Link to="/"><button>Back</button></Link>

                <div className = "gameMode-container">
                    <div className = "classical-item">
                    <h1 class = "gameMode-title">Classical Mate</h1>
                    <p>Find the mates at your own pace.</p>
                    <Link to="/classical"><button class = "gameMode-button">Classical</button></Link>
                    </div>

                    <div className = "bullet-item">
                    <h1 class = "gameMode-title">Bullet Mate</h1>
                    <p>Find the mates before time runs out.</p>
                    <Link to="/bullet"><button class = "gameMode-button">Bullet</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}