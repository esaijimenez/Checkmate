import React from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
//import { Piece } from "react-chessboard";


import { Chess } from "chess.js";
import Navbar from './Navbar.js';

import '../styles/CreateUI-style.css'
import GameOver from './GameOver.js';
import GameOverLeaderboard from './GameOverLeaderboard.js';


export default class CreateUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            position: "start",
            whitePawn: "wP",
            whiteRook: "wR",
            whiteKnight: "wN",
            whiteBishop: "wB",
            whiteQueen: "wQ",
            whiteKing: "wK",
            blackPawn: "bP",
            blackRook: "bR",
            blackKnight: "bN",
            blackBishop: "bB",
            blackQueen: "bQ",
            blackKing: "bK",

        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {

    };





    //render() returns a JSX element that allows us to write HTML in React.
    //Handles what the user sees and interacts with on their screen. 
    render() {
        return (
            <div className='create'>
                <Navbar />
                <h1>Create Mate</h1>
                <div className='create--chessboard'>
                    <div className="spare-pieces">

                    </div>

                    <div className='create--info'>
                        <Chessboard
                            position={this.state.position}
                            sparePieces={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}