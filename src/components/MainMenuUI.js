import React from "react";
import { Link } from "react-router-dom";

import '../styles/MainMenuUI-style.css'

export default class MainMenuUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {
        //localStorage.clear()
        //console.log(localStorage.getItem("email"))
    }

    handleLogout = () => {
        localStorage.clear()
        setTimeout(() => {
            this.props.history.push({
                pathname: '/login'
            });
        }, 100)

        // if (localStorage.getItem("email") !== '') {
        //     localStorage.clear()
        //     // window.location.reload()
        //     console.log(localStorage.getItem("email"))
        // }
    }

    render() {
        let email = localStorage.getItem("email")
        let uid = localStorage.getItem("userUID")
        let isEmail = true;
        if (email === null) {
            isEmail = false;
        }
        console.log(email)
        console.log(uid)
        return (
            <div className="container">
                {/* {!isEmail && (<div className="popup">
                    <div className="popup-content">
                        <h2 class="popup-message-main">Login</h2>
                        <ul class="popup-message-sub">
                            <li>Please login first</li>
                        </ul>
                        <div className="popup-buttons">
                            <Link to="/login"><button class='popup-button-1'>OK</button></Link>
                        </div>
                    </div>
                </div>
                )} */}

                <h1 class="title">Checkmate</h1>
                <p class="caption">Find the checkmate!</p>
                <div className="buttons-container">
                    <Link to="/"></Link>
                    <Link to="/gamemode"><button class="mainmenu--button">Play</button></Link>
                    <Link to="/custom-puzzles"><button class="mainmenu--button">Custom Puzzles</button></Link>
                    <button class="mainmenu--button" onClick={this.handleLogout}>Login/Logout</button>
                    <Link to="/leaderboard"><button class="mainmenu--button">Leaderboard</button></Link>
                    <Link to="/settings"><button class="mainmenu--button">Settings</button></Link>
                    <Link to="/help-tutorial"><button class="mainmenu--button">Help</button></Link>
                </div>
            </div>
        )
    }
}