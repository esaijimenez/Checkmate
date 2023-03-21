import React from "react";
import { Link } from "react-router-dom";

import '../styles/MainMenuUI-style.css'

export default class MainMenuUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {

    };

    render() {
        return (
            <div className = "container">
                <h1 class = "title">Checkmate</h1>
                <p class = "caption">Find the checkmate!</p>
                <div className = "buttons-container">
                <Link to="/"></Link>
                <Link to="/gamemode"><button class = "mainmenu--button">Play</button></Link>
                <Link to="/custom-puzzles"><button class = "mainmenu--button">Custom Puzzles</button></Link>
                <Link to="/login"><button class = "mainmenu--button">Login</button></Link>
                <Link to="/leaderboard"><button class = "mainmenu--button">Leaderboard</button></Link>
                <Link to="/settings"><button class = "mainmenu--button">Settings</button></Link>
                <Link to="/help-tutorial"><button class = "mainmenu--button">Help</button></Link>
                </div>
            </div>
        )
    }
}