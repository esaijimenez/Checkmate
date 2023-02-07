import React from "react";
import { Link } from "react-router-dom";

const MainMenuUI = () => {
    return (
        <div>
            <h1>Checkmate</h1>
            <br />
            <Link to="/"></Link>
            <Link to="/gamemode"><button>Play</button></Link>
            <Link to="/chess"><button>Chess</button></Link>
            <Link to="/help-tutorial"><button>Help</button></Link>
            <Link to="/leaderboard"><button>Leaderboard</button></Link>
            <Link to="/settings"><button>Setting</button></Link>
            <Link to="/custom-puzzles"><button>Custom Puzzles</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    );
};

export default MainMenuUI;