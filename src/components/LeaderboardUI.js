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
                <table class = "table">
                    <caption>Bullet-Mate</caption>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <td>PlayerName1</td>
                        <td>PlayerScore1</td>
                        <td>PlayerTime1</td>
                    </tr>
                    <tr>
                        <td>PlayerName2</td>
                        <td>PlayerScore2</td>
                        <td>PlayerTime2</td>
                    </tr>
                    <tr>
                        <td>PlayerName3</td>
                        <td>PlayerScore3</td>
                        <td>PlayerTime3</td>
                    </tr>
                    <tr>
                        <td>PlayerName4</td>
                        <td>PlayerScore4</td>
                        <td>PlayerTime4</td>
                    </tr>
                    <tr>
                        <td>PlayerName5</td>
                        <td>PlayerScore5</td>
                        <td>PlayerTime5</td>
                    </tr>
                    <tr>
                        <td>PlayerName6</td>
                        <td>PlayerScore6</td>
                        <td>PlayerTime6</td>
                    </tr>
                    <tr>
                        <td>PlayerName7</td>
                        <td>PlayerScore7</td>
                        <td>PlayerTime7</td>
                    </tr>
                    <tr>
                        <td>PlayerName8</td>
                        <td>PlayerScore8</td>
                        <td>PlayerTime8</td>
                    </tr>
                    <tr>
                        <td>PlayerName9</td>
                        <td>PlayerScore9</td>
                        <td>PlayerTime9</td>
                    </tr>
                    <tr>
                        <td>PlayerName10</td>
                        <td>PlayerScore10</td>
                        <td>PlayerTime10</td>
                    </tr>

                </table>
            </div>
        );
    }
}