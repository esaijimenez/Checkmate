import React from "react";
import { Link } from "react-router-dom";

import "../styles/GameModeUI-style.css";

export default class GameModeUI extends React.Component {
    render() {
        return (
            <div className="gameMode">
                <Link to="/">
                    <button class="gameMode-back-button">Back</button>
                </Link>

                <div className="gameMode-container">
                    <div className="classical-item">
                        <h1 class="gameMode-title">Classical</h1>
                        <p class="gameMode-caption">Find the mates at your own pace.</p>
                        <p class = 'gameMode--page--img'>&#9819;</p>
                        <div className="gameMode-buttons-container">
                            <Link to="/classical">
                                <button class="gameMode-button">Classical</button>
                            </Link>
                        </div>
                    </div>

                    <div className="bullet-item">
                        <h1 class="gameMode-title">Bullet</h1>
                        <p class="gameMode-caption">Find the mates before time runs out.</p>
                        <p class = 'gameMode--page--img'>&#9818;</p>
                        <div className ="gameMode-buttons-container">
                            <Link to="/bullet">
                                <button class="gameMode-button">Bullet</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
