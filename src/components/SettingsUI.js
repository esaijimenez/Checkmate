import React from "react";
import { Link } from "react-router-dom";

import Navbar from './Navbar.js';
import "../styles/Settings-style.css";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {

    };

    render() {
        return (
            <div className = "settings">
                <Navbar/>
                <h1 class="settings--title">Settings</h1>

                
            </div>
        );
    }
}