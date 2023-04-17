import React from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import Navbar from './Navbar.js';

import '../styles/PlayUI-style.css'
import GameOver from './GameOver.js';
import GameOverLeaderboard from './GameOverLeaderboard.js';
import LeaderboardUI from './LeaderboardUI.js';


export default class PlayUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            puzzle: props.location.state.puzzle,
        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {

    };



    //render() returns a JSX element that allows us to write HTML in React.
    //Handles what the user sees and interacts with on their screen. 
    render() {
        console.log("Welcome to Play")
        console.log("Puzzle: ", this.state.puzzle)

        return (
            <div className='play'>
                <Navbar />

                <div className='play--container'>

                    <div className='play--info--container'>
                        <div className='play--info--1'>
                            <h1 class='play--title'>Play Mate</h1>
                            <h1>{this.state.value}</h1>

                        </div>

                        <div className='play--chessboard'>
                            <Chessboard
                                position={this.state.puzzle.fen}
                                onSquareClick={this.handleSquareClick}
                                onPieceDrop={this.handleUserMoves}
                                onPieceClick={this.handlePieceClick}
                                customSquareStyles={this.state.squareStyles}
                                animationDuration={500}
                                boardOrientation={'black'}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}