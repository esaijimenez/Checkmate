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
            isNewUser: false,
            username: "",
            usernames: [],
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

        if (localStorage.getItem("username") === null) {
            this.grabUsernameFromDatabase();
        }
    }

    grabUsernameFromDatabase = () => {
        const usernameRef = ref(db, '/users');
        onValue(usernameRef, (snapshot) => {
            const count = snapshot.size;
            console.log("username count: ", count)

            let usernames = [];
            snapshot.forEach((usersSnapshot) => {
                usernames.push({
                    userID: usersSnapshot.child("userID").val(),
                    username: usersSnapshot.child("username").val(),
                })
            });
            this.setState({ usernames: usernames });

            for (let i = 0; i < this.state.usernames.length; i++) {
                console.log("username: ", this.state.usernames[i].userID)
                if (this.state.localStorageUID === this.state.usernames[i].userID) {
                    localStorage.setItem("username", this.state.usernames[i].username)
                }
            }
            console.log("username: ", localStorage.getItem("username"));
            setTimeout(() => {
                window.location.reload();
            }, 10)
        })
    }

    handleSendUserToDatabase() {
        if (this.state.localStorageUID !== null) {

            if (this.state.localStorageUIDsize === 0) {

                this.setState({ isNewUser: true })

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

                this.setState({ isNewUser: true })

            }
        }
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handleUsernameSubmit = () => {
        console.log(this.state.username);

        localStorage.setItem("username", this.state.username);

        const mateRef = ref(db, "/users/" + this.state.userCounter);
        set(mateRef, {
            username: this.state.username,
            userID: this.state.localStorageUID,
            userSettings: "",
        });

        this.setState({
            userCounter: parseInt(this.state.userCounter) + 1,
        })

        this.setState({ isNewUser: false })
    }

    handleLogout = () => {
        localStorage.clear()
        setTimeout(() => {
            this.props.history.push({
                pathname: '/login'
            });
        }, 100)
    }

    render() {
        return (
            <div className="container">
                {this.state.isNewUser && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Username</h2>
                            <p class="popup-message-sub">Please enter username:</p>
                            <div className="popup-input">
                                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                            </div>
                            <div className="popup-buttons">
                                <button class='popup-button-1' onClick={this.handleUsernameSubmit}>OK</button>
                            </div>
                        </div>
                    </div>
                )}

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