import React from "react";
import { Link } from "react-router-dom";
import ClassicalUI from "./ClassicalUI";

export default class LeaderboardUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        };
    };

    componentDidMount() {

    };

    render() {
        let score = this.state.score
        return (
            <div>
                <Link to="/"><button>Back</button></Link>
                <h1>LeaderboardUI</h1>
                <h1>This is your score: {this.props.score}</h1>
            </div>
        );
    }
}