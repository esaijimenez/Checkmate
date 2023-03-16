import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

export default class Navbar extends React.Component {
    render() {
        return (

        <div className="navbar--container">
            <ul>
                <li class = "navbar--link"><a href= '/'>Home</a></li>
                <li class = "navbar--link"><a href= '/gamemode'>Play</a></li>
                <li class = "navbar--link"><a href= '/custom-puzzles'>Custom Puzzles</a></li>
                <li class = "navbar--link"><a href= '/leaderboard'>Leaderboard</a></li>
                <li class = "navbar--link"><a href= '/help-tutorial'>Help</a></li>
                <li class = "navbar--link"><a href= '/settings'>Settings</a></li>
                <li class = "navbar--link"><a href= '/login'>Login</a></li>
            </ul>
        </div>
            
        )
    }
}