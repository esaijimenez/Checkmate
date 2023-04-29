import React from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.js";
import { ref, onValue, set } from 'firebase/database';

import '../styles/MainMenuUI-style.css'

export default class MainMenuUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCounter: 0,
            allUID: [],
            localStorageUID: "",
            localStorageUIDsize: 0,
            localStorageUIDall: [],
            isUserInDatabase: false,
        };
    };

    componentDidMount() {

        this.state.localStorageUID = localStorage.getItem("userUID")
        this.state.localStorageUIDsize = localStorage.getItem("UIDsize")
        this.state.localStorageUIDall = JSON.parse(localStorage.getItem("UIDall"));
        this.state.userCounter = this.state.localStorageUIDsize;
        console.log("userUID: ", this.state.localStorageUID)
        console.log("UIDsize: ", this.state.localStorageUIDsize)
        console.log("UIDall: ", this.state.localStorageUIDall)

        this.handleSendUserToDatabase();
    }

    handleSendUserToDatabase() {
        if (this.state.localStorageUID !== null) {
            if (this.state.localStorageUIDsize === 0) {
                const mateRef = ref(db, "/users/" + this.state.userCounter);
                set(mateRef, {
                    username: "",
                    userID: this.state.localStorageUID,
                    userSettings: "",
                });

                this.setState({
                    userCounter: 1
                })
            }

            for (let i = 0; i < this.state.localStorageUIDsize; i++) {
                console.log("Inside for loop ");
                console.log("this.state.allUID: ", JSON.stringify(this.state.localStorageUIDall[i]))
                console.log("this.state.localStorageUID: ", this.state.localStorageUID)
                console.log("isUserInDatabase inside of For loop: ", this.state.isUserInDatabase)

                if (JSON.stringify(this.state.localStorageUIDall[i]).includes(this.state.localStorageUID) && this.state.localStorageUID !== null) {
                    console.log("This UserID was found in database");
                    this.state.isUserInDatabase = true;
                }
            }

            console.log("isUserInDatabase: ", this.state.isUserInDatabase)

            if (this.state.isUserInDatabase === false) {
                const mateRef = ref(db, "/users/" + this.state.userCounter);
                set(mateRef, {
                    username: "",
                    userID: this.state.localStorageUID,
                    userSettings: "",
                });

                this.setState({
                    userCounter: this.state.userCounter + 1
                })
            }
        }
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
        //console.log(email)
        //console.log(uid)
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