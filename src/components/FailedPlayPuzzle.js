import React from "react";
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";

import Navbar from './Navbar.js';
import '../styles/FailedPlayPuzzle.css'
import PlayUI from "./PlayUI.js";

export default class FailedPlayPuzzle extends React.Component {

    handleReload = () => {
        window.location.reload();
    }

    render() {
        return (
            <div className="popup">
                <div className="popup-content">
                    <h2 class="popup-message-main">Failed Puzzle!</h2>
                    <p class="popup-message--sub">What now?</p>
                    <div className="popup-buttons">
                        <button class='popup-button-1' onClick={this.handleReload}>Try again</button>
                        <Link to="/play-list"><button class='popup-button-2'>Puzzle List</button></Link>
                        <Link to="/"><button class='popup-button-3'>Return Home</button></Link>
                    </div>
                </div>
            </div>
        );
    };
}