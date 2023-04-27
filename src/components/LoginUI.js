import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/compat/app';
import { auth, provider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { Link } from "react-router-dom";
import '../styles/LoginUI-style.css'
import MainMenuUI from './MainMenuUI.js';
import ReactDOM from 'react-dom';
import { db } from "../firebase.js";
import { ref, onValue, set } from 'firebase/database';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils/index.js';

export default class LoginUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            allUID: [],
            userUID: '',
            localStorageEmail: '',
            localStorageUID: '',
            isLoggedIn: false,
            isUserInDatabase: true,
            userCounter: 0,
        };
    };

    componentDidMount() {
        const userRef = ref(db, '/users');
        onValue(userRef, (snapshot) => {
            const count = snapshot.size;

            let UID = [];
            snapshot.forEach((userSnapshot) => {
                UID.push({
                    UID: userSnapshot.child("userID").val()
                })
            });

            this.setState({
                userCounter: count,
                allUID: UID
            })
            console.log("User Count: ", this.state.userCounter)
            console.log("All UIDs: ", this.state.allUID)
        })
    }


    handleLogin = () => {

        signInWithPopup(auth, provider).then((data) => {
            this.setState({ email: data.user.email })
            this.setState({ userUID: data.user.uid })
            localStorage.setItem("email", data.user.email)
            localStorage.setItem("userUID", data.user.uid)
        })
        this.state.localStorageEmail = localStorage.getItem("email")
        this.state.localStorageUID = localStorage.getItem("userUID")
        //console.log(this.state.localStorageEmail)
        //console.log(this.state.localStorageUID)
        if (this.state.email !== null) {
            this.setState({
                isLoggedIn: true
            })
        }

        for (let i = 0; i <= this.state.allUID.length; i++) {
            console.log("Inside for loop ");
            console.log("this.state.allUID: ", this.state.allUID[i])
            console.log("this.state.localStorageUID: ", this.state.localStorageUID)

            if (this.state.allUID[i] != this.state.localStorageUID && this.state.localStorageUID !== null) {
                console.log("This UserID was not found in database");
                this.state.isUserInDatabase = false;
            }
        }


        console.log("this.state.isUserInDatabase: ", this.state.isUserInDatabase);

        if (this.state.isUserInDatabase === false) {
            console.log("Inside of an If statement that should be IMPOSSIBLE")
            //console.log("this.state.allUID: ", this.state.allUID)
            //console.log("this.state.localStorageUID: ", this.state.localStorageUID)

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

    handleNavToMainMenu = () => {
        console.log("handleNavToMainMenu")
        this.props.history.push({
            pathname: '/'
        });
    }

    render() {
        // if (this.state.localStorageUID === null) {
        //     window.location.reload();
        // }
        return (
            <div className="login-container" >
                <div className="login-item">
                    <h1 class="login-title">Login</h1>
                    <div className="login-buttons-container">
                        {!this.state.isLoggedIn && <button class="login-button" onClick={this.handleLogin}>Login with Google</button>}
                        {this.state.email && <button class="login-button" onClick={this.handleNavToMainMenu}>Return Home</button>}
                    </div>
                </div>
            </div>
        );
    }
}