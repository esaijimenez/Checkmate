import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/"></Link>
                <Link to="/gamemode"><button type="button" class="button">Play</button></Link>
                <Link to="/custom-puzzles"><button type="button" class="button">Custom Puzzles</button></Link>
                <Link to="/leaderboard"><button type="button" class="button">Leaderboard</button></Link>
                <Link to="/help-tutorial"><button type="button" class="button">Help</button></Link>
                <Link to="/settings"><button type="button" class="button">Settings</button></Link>
                <Link to="/login"><button type="button" class="button">Login</button></Link>
            </div>
        )
    }
}