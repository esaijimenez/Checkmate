import React from "react";
import { Link } from "react-router-dom";

import '../styles/LeaderboardUI-style.css'

export default class LeaderboardUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {

    };

    render() {
        return (
            <div>
                <Link to="/"><button class = "leaderboard--back">Back</button></Link>
                <h1>LeaderboardUI</h1>
            </div>
        );
    }
}