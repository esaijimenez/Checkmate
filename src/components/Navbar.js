import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/"></Link>
                <Link to="/gamemode"><button>Play</button></Link>
                <Link to="/custom-puzzles"><button>Custom Puzzles</button></Link>
                <Link to="/leaderboard"><button>Leaderboard</button></Link>
                <Link to="/help-tutorial"><button>Help</button></Link>
                <Link to="/settings"><button>Settings</button></Link>
                <Link to="/login"><button>Login</button></Link>
            </div>
        )
    }
}