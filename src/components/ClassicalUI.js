import React from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import { Link } from "react-router-dom";
import Navbar from './Navbar.js';

import '../styles/Checkmate.css'

export default class ClassicalUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            checkmateIndex: 0,
            numCheckmates: 0,
            checkmates: [],
            position: "start",
            moves: [],
            ratings: 5,
            indexes: 0
        };
    };

    componentDidMount() {

        //Pulls chess puzzles from database
        const mateRef = ref(db, '/checkmates');
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;
            //const randomIndex = Math.floor(Math.random() * count);
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
                //randomCheckmateIndex: randomIndex,
                numCheckmates: count,
                checkmates: newState
            })
        })

    };

    //Gets the initial index of the puzzle by grabbing a random rating within a particular rating range.
    //After each successful puzzle, the range increases by 50 difficulty.
    getIndex = (rating) => {
        let ratings = rating;
        let multiplier = 100;
        let index = [];

        for (let i = 0; i < this.state.numCheckmates; i++) {
            if (this.state.checkmates[i].rating > (ratings * multiplier) && (this.state.checkmates[i].rating < ((ratings + 1) * multiplier))) {
                index.push(i);
            }
        }

        let randomIndex = Math.floor(Math.random() * index.length)
        this.setState({
            indexes: index[randomIndex],
            ratings: this.state.ratings + 1
        })
    }



    //Aims to take care of the moves that need to be automatically done in each position
    handleBotMoves = () => {
        const currPosition = this.state.checkmates[this.state.indexes].fen;
        const chess = new Chess()
        const allMoves = this.state.checkmates[this.state.indexes].moves
        const moves = allMoves.split(' ')[0];

        this.setState({
            moves: allMoves,
            position: currPosition,
            checkmateIndex: this.state.indexes
        });

        chess.load(this.state.checkmates[this.state.indexes].fen)
        chess.move(moves)

        setTimeout(() => {
            this.setState({
                position: chess.fen()
            })
        }, 1000);


    }

    //Validates the users moves and updates the position
    handleUserMoves = (sourceSquare, targetSquare) => {
        const chess = new Chess(this.state.position)

        const moves = chess.moves({ square: sourceSquare });

        const correctMoves = this.state.moves.split(' ')[1];
        const correctMove = correctMoves.split("-")[1];


        if (targetSquare !== correctMove) {
            console.log("Not correct move")
        } else if (targetSquare === correctMove) {
            console.log("Correct Move")
            chess.move(correctMoves)
            this.setState({
                position: chess.fen(),
            })
            // if(chess.isCheckmate()){
            // }

        }
    }

    handlePieceClick = (piece, square) => {
        console.log(`You clicked on piece ${piece}`);
    }

    //This function is only a placeholder, it was used to figure out how to move the pieces
    handleNewPositionClick = () => {
        this.getIndex(this.state.ratings)
        this.handleBotMoves();
    }

    render() {
        console.log(this.state.ratings);
        if (this.state.checkmates.length >= 1) {
            console.log(this.state.checkmates[this.state.indexes].rating)
            return (
                <div className='classical'>
                    <Navbar />
                    <Link to="/"><button>Back</button></Link>
                    <h1>Classical Mate</h1>
                    <div className='classical--board'>
                        <button onClick={this.handleNewPositionClick}>Generate Position</button>
                        <Chessboard
                            position={this.state.position}
                            onPieceDrop={this.handleUserMoves}
                            onPieceClick={this.handlePieceClick}
                        />
                    </div>
                </div>
            );
        }
    }
}