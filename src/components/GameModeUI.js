import React from "react";
import { Link } from "react-router-dom";

export default class GameModeUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {

    };

    render() {
        return (
            <div className="gameMode">
                <Link to="/"><button>Back</button></Link>

                <h1>Classical Mate</h1>
                <p>Find the mates at your own pace</p>
                <Link to="/chess"><button>Classical</button></Link>

                <h1>Bullet Mate</h1>
                <p>Find the mates before time runs out</p>
                <Link to="/chess"><button>Bullet</button></Link>
            </div>
        );
    }
}