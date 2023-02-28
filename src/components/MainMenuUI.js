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
            <div className = "all-content">
            <div className = "container">
                <h1 className = "title">Checkmate</h1>
                <p className = "motto">Find the checkmate!</p>
                <br />
                <div className = "buttons-container">
                <Link to="/"></Link>
                <Link to="/gamemode"><button>Play</button></Link>
                <Link to="/custom-puzzles"><button>Custom Puzzles</button></Link>
                <Link to="/leaderboard"><button>Leaderboard</button></Link>
                <Link to="/help-tutorial"><button>Help</button></Link>
                <Link to="/settings"><button>Settings</button></Link>
                <Link to="/login"><button>Login</button></Link>
                </div>
            </div>
            </div>
        )
    }
}