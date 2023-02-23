import React from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import { Link } from "react-router-dom";
import Navbar from './Navbar.js';

import '../Checkmate.css'

export default class ChessUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            randomCheckmateIndex: 0,
            numCheckmates: 0,
            checkmates: [],
            position: "start",
            move: ""
        };
    };

    componentDidMount() {

        //Pulls chess puzzles from database
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
            //Sets some of the state
            this.setState({
                randomCheckmateIndex: randomIndex,
                numCheckmates: count,
                checkmates: newState
            })
        })
    };

    //This function is only a placeholder, it was used to figure out how to move the pieces
    handleNewPositionClick = () => {
        const newRandomIndex = Math.floor(Math.random() * this.state.numCheckmates) + 1;
        const newPosition = this.state.checkmates[newRandomIndex].fen;
        const chess = new Chess()
        const firstMove = this.state.checkmates[newRandomIndex].moves
        const move = firstMove.split(' ')[0];
        chess.load(this.state.checkmates[newRandomIndex].fen)

        this.setState({
            position: newPosition,
            randomCheckmateIndex: newRandomIndex
        });

        chess.move(move)

        setTimeout(() => {
            this.setState({
                position: chess.fen()
            })
        }, 1000);
    }

    render() {
        console.log("Random index generated: " + this.state.randomCheckmateIndex);

        if (this.state.checkmates.length >= 1) {
            return (
                <div>
                    <Navbar />
                    <Link to="/"><button>Back</button></Link>
                    <h1>Checkmate</h1>
                    <div className='Chess'>
                        <button onClick={this.handleNewPositionClick}>Generate Position</button>
                        <Chessboard position={this.state.position} />
                    </div>
                </div >
            );
        }
    }
}