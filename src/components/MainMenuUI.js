import React from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.js";
import { ref, onValue, set } from "firebase/database";

import "../styles/MainMenuUI-style.css";

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
            isNewUser: false,
            username: "",
            usernames: [],
            grabUsername: true,
        };
    }

    componentDidMount() {
        this.state.localStorageUID = localStorage.getItem("userUID");
        this.state.localStorageUIDsize = localStorage.getItem("UIDsize");
        this.state.localStorageUIDall = JSON.parse(localStorage.getItem("UIDall"));
        this.state.userCounter = this.state.localStorageUIDsize;

        this.handleSendUserToDatabase();

        if (this.state.grabUsername) {
            this.grabUsernameFromDatabase();
        }
    }

    grabUsernameFromDatabase = () => {
        const usernameRef = ref(db, "/users");
        onValue(usernameRef, (snapshot) => {
            const count = snapshot.size;

            let usernames = [];
            snapshot.forEach((usersSnapshot) => {
                usernames.push({
                    userID: usersSnapshot.child("userID").val(),
                    username: usersSnapshot.child("username").val(),
                });
            });
            this.setState({ usernames: usernames });

            for (let i = 0; i < this.state.usernames.length; i++) {
                if (this.state.localStorageUID === this.state.usernames[i].userID) {
                    localStorage.setItem("username", this.state.usernames[i].username);
                }
            }

            if (this.state.grabUsername) {
                setTimeout(() => {
                    window.location.reload();
                }, 10);
            }
        });
    };

    handleSendUserToDatabase() {
        this.setState({
            grabUsername: false,
        });

        if (this.state.localStorageUID !== null) {
            if (this.state.localStorageUIDsize === 0) {
                this.setState({ isNewUser: true });
            }

            for (let i = 0; i < this.state.localStorageUIDsize; i++) {
                if (
                    JSON.stringify(this.state.localStorageUIDall[i]).includes(
                        this.state.localStorageUID
                    ) &&
                    this.state.localStorageUID !== null
                ) {
                    this.state.isUserInDatabase = true;
                }
            }

            if (this.state.isUserInDatabase === false) {
                this.setState({ isNewUser: true });
            }
        }
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handleUsernameSubmit = () => {
        localStorage.setItem("username", this.state.username);

        const mateRef = ref(db, "/users/" + this.state.userCounter);
        set(mateRef, {
            username: this.state.username,
            userID: this.state.localStorageUID,
            userSettings: "",
            scores: [],
        });

        this.setState({
            userCounter: parseInt(this.state.userCounter) + 1,
        });

        this.setState({ isNewUser: false });
    };

    handleLogout = () => {
        localStorage.clear();
        setTimeout(() => {
            this.props.history.push({
                pathname: "/login",
            });
        }, 100);
    };

    render() {
        return (
            <div className="container">
                {this.state.isNewUser && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Username</h2>
                            <p class="popup-message-sub">Please enter username:</p>
                            <div className="popup-input">
                                <input
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                />
                            </div>
                            <div className="popup-buttons">
                                <button
                                    class="popup-button-1"
                                    onClick={this.handleUsernameSubmit}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <h1 class="title">Checkmate</h1>
                <p class="caption">Find the checkmate!</p>
                <div className="buttons-container">
                    <Link to="/"></Link>
                    <Link to="/gamemode">
                        <button class="mainmenu--button">Play</button>
                    </Link>
                    <Link to="/custom-puzzles">
                        <button class="mainmenu--button">Custom Puzzles</button>
                    </Link>
                    <button class="mainmenu--button" onClick={this.handleLogout}>
                        Login/Logout
                    </button>
                    <Link to="/leaderboard">
                        <button class="mainmenu--button">Leaderboard</button>
                    </Link>
                    <Link to="/settings">
                        <button class="mainmenu--button">Settings</button>
                    </Link>
                    <Link to="/help-tutorial">
                        <button class="mainmenu--button">Help</button>
                    </Link>
                </div>
            </div>
        );
    }
}
