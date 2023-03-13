import React, { useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
import { Piece } from "react-chessboard";


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
            position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            sparePieces: [],
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
        console.log("componentDidMount")
    };

    handleDrop = (sourceSquare, targetSquare) => {
        console.log("source: ", sourceSquare)
        console.log("target: ", targetSquare)

        const chess = new Chess(this.state.position)

        chess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        this.setState({
            position: chess.fen()
        });

        console.log("Position: ", chess.fen())
    }

    saveUserPosition = () => {

    }

    handlePieceClick = (sourceSquare) => {
        console.log("handlePieceClick: ", sourceSquare)
    }

    //onPieceDrop={this.handleDrop}

    //render() returns a JSX element that allows us to write HTML in React.
    //Handles what the user sees and interacts with on their screen. 
    render() {
        return (
            <div className='create'>
                <Navbar />
                <h1>Create Mate</h1>
                <div className='create--chessboard'>


                    <div className='create--info'>
                        <button onClick={this.removeSparePiece}>Remove</button>
                        <Chessboard
                            position={this.state.position}
                            onPieceClick={this.handlePieceClick}
                            dropOffBoardAction={"trash"}
                        />
                    </div>
                </div>
            </div>
        );
    }
}