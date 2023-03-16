import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

export default class Navbar extends React.Component {
    render() {
        return (
            <ul class = 'links--ul'>
                <li class = "navbar--link--home"><a href= '/'>Checkmate</a></li>
                <li class = "navbar--link"><a href= '/gamemode'>Play</a></li>
                <li class = "navbar--link"><a href= '/custom-puzzles'>Custom Puzzles</a></li>
                <li class = "navbar--link"><a href= '/leaderboard'>Leaderboard</a></li>
                <li class = "navbar--link"><a href= '/help-tutorial'>Help</a></li>
                <li class = "navbar--link"><a href= '/settings'>Settings</a></li>
                <li class = "navbar--link"><a href= '/login'>Login</a></li>
            </ul>
            
        )
    }
}