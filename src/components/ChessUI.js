import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";

import '../App.css'

export default class ChessUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomCheckmates: 0,
            numCheckmates: 0,
            checkmates: [],
            position: "start",
            boardState: ""
        };
    };

    componentDidMount() {
        const mateRef = ref(db, '/checkmates');
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;
            const randomIndex = Math.floor(Math.random() * count);
            let newState = [];
            snapshot.forEach((checkmateSnapshot) => {
                newState.push({
                    fen: checkmateSnapshot.child("FEN").val(),
                    moves: checkmateSnapshot.child("Moves").val(),
                    puzzleid: checkmateSnapshot.child("PuzzleId").val(),
                    rating: checkmateSnapshot.child("Rating").val(),
                    themes: checkmateSnapshot.child("Themes").val()
                })
            });
            this.setState({
                randomCheckmates: randomIndex,
                numCheckmates: count,
                checkmates: newState
            })
        })
    };

    handleNewPositionClick = () => {
        const newRandomIndex = Math.floor(Math.random() * this.state.numCheckmates) + 1;
        const newPosition = this.state.checkmates[newRandomIndex].fen;
        const chess = new Chess()
        const firstMove = this.state.checkmates[newRandomIndex].moves
        const move = firstMove.split(' ')[0];
        chess.load(this.state.checkmates[newRandomIndex].fen)

        this.setState({
            position: newPosition,
            randomCheckmates: newRandomIndex
        });

        chess.move(move)

        setTimeout(() => {
            this.setState({
                position: chess.fen()
            })
        }, 1000);
    }

    render() {
        console.log("Random index generated: " + this.state.randomCheckmates);

        if (this.state.checkmates.length >= 1) {
            return (
                <div>
                    <h1>Checkmate</h1>
                    <div className='Chess'>
                        <button onClick={this.handleNewPositionClick}>Generate Position</button>
                        <h1>{this.state.checkmates[this.state.randomCheckmates].moves}</h1>
                        <Chessboard position={this.state.position} />
                    </div>
                </div >
            );
        }
    }
}