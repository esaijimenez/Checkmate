import React from "react";
import { Link } from "react-router-dom";

export default class LoginUI extends React.Component {
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
                <Link to="/"><button>Back</button></Link>

                <Link to="/play">
                    <button class="">Play</button>
                </Link>

                <h1>Puzzle List</h1>
            </div>
        );
    }
}