import React from "react";
import { Link } from "react-router-dom";

export default class HelpTutorialMenuUI extends React.Component {
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
                <h1>Help</h1>
            </div>
        );
    }
}