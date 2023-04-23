import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/compat/app';
import { auth, provider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import MainMenuUI from './MainMenuUI.js';

export default class LoginUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    };


    handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            this.setState({ email: data.user.email })
            localStorage.setItem("email", data.user.email)
        })
    }

    render() {
        return (
            <div>
                {this.state.email ? <MainMenuUI /> :
                    <button onClick={this.handleClick}>SignIn with Google</button>
                }
            </div>

        );
    }
}