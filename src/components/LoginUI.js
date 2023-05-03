import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/compat/app";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/LoginUI-style.css";
import MainMenuUI from "./MainMenuUI.js";
import ReactDOM from "react-dom";
import { db } from "../firebase.js";
import { ref, onValue, set } from "firebase/database";

export default class LoginUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            allUID: [],
            userUID: "",
            localStorageEmail: "",
            localStorageUID: "",
            isLoggedIn: false,
            isUserInDatabase: true,
            userCounter: 0,
        };
    }

    componentDidMount() {
        const userRef = ref(db, "/users");
        onValue(userRef, (snapshot) => {
            const count = snapshot.size;

            let UID = [];
            snapshot.forEach((userSnapshot) => {
                UID.push({
                    UID: userSnapshot.child("userID").val(),
                });
            });

            this.setState({
                userCounter: count,
                allUID: UID,
            });

            localStorage.setItem("UIDsize", count);
            localStorage.setItem("UIDall", JSON.stringify(UID));
        });
    }

    handleLogin = () => {
        signInWithPopup(auth, provider).then((data) => {
            this.setState({ email: data.user.email });
            this.setState({ userUID: data.user.uid });
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("userUID", data.user.uid);
        });
        localStorage.setItem("UIDsize", this.state.allUID.length);
        this.state.localStorageEmail = localStorage.getItem("email");
        this.state.localStorageUID = localStorage.getItem("userUID");
        localStorage.setItem("loggedInUser", false);

        if (this.state.email !== null) {
            this.setState({
                isLoggedIn: true,
            });
        }
    };

    handleNavToMainMenu = () => {
        this.props.history.push({
            pathname: "/",
        });
        localStorage.setItem("loggedInUser", true);
    };

    render() {
        // if (this.state.localStorageUID === null) {
        //     window.location.reload();
        // }
        return (
            <div className="login-container">
                <div className="login-item">
                    <h1 class="login-title">Login</h1>
                    <div className="login-buttons-container">
                        {!this.state.isLoggedIn && (
                            <button class="login-button" onClick={this.handleLogin}>
                                Login with Google
                            </button>
                        )}
                        {this.state.email && (
                            <button class="login-button" onClick={this.handleNavToMainMenu}>
                                Return Home
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
