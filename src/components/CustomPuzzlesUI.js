import React from "react";
import ChessUI from "./ChessUI";
import { Link } from "react-router-dom";

export default class CustomPuzzlesUI extends ChessUI {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {

    };

    render() {
        return (
            <div className="customPuzzles">
                <Link to="/"><button>Back</button></Link>
                <h1>CustomPuzzlesUI</h1>
            </div>
        );
    }
}