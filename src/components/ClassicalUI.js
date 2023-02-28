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
        })
    }

    //Aims to take care of the moves that need to be automatically done in each position
    handleBoardState = () => {
        const currPosition = this.state.checkmates[this.state.indexes].fen;
        const chess = new Chess()
        const allMoves = this.state.checkmates[this.state.indexes].moves
        const moves = allMoves.split(' ')[0];

        this.setState({
            moves: allMoves,
            position: currPosition,
            checkmateIndex: this.state.indexes
        });

        chess.load(currPosition)
        chess.move(moves)

        setTimeout(() => {
            this.setState({
                position: chess.fen()
            })
        }, 1000);
    }

    handleSubsequentMoves = (currFen) => {
        const chess = new Chess(currFen)
        if (chess.isCheckmate() === false) {

            let moves = this.state.moves;
            console.log(moves)
            let nextMove = moves.split(' ')[2];
            chess.load(currFen)

            chess.move(nextMove)

            setTimeout(() => {
                this.setState({
                    position: chess.fen()
                })
            }, 1000);

        }
    }

    //Validates the users moves and updates the position
    handleUserMoves = (sourceSquare, targetSquare) => {
        const chess = new Chess(this.state.position)

        //const moves = chess.moves({ square: sourceSquare });

        const moves = this.state.moves.split(' ');
        const correctMoves = moves.filter((move, index) => index % 2 === 1);
        const correctMovesToString = correctMoves.toString();
        const correctMove = correctMovesToString.split("-")[1];
        console.log(correctMoves)

        if (targetSquare !== correctMove) {
            console.log("Not correct move")
            this.getIndex(this.state.ratings)
            this.handleBoardState()
        }
        else if (targetSquare === correctMove) {
            console.log("Correct Move")
            chess.move(correctMovesToString)
            this.setState({
                position: chess.fen(),
            })
            if (chess.isCheckmate() === true) {
                this.setState({
                    ratings: this.state.ratings + 1
                })
                console.log("Checkmate!")
                setTimeout(() => {
                    this.getIndex(this.state.ratings)
                    this.handleBoardState()
                }, 1000);

            }
            this.handleSubsequentMoves(this.state.position)

        }
    }

    handlePieceClick = (piece) => {
        console.log(`You clicked on piece ${piece}`);
    }

    //This function is only a placeholder, it was used to figure out how to move the pieces
    handleStartButton = () => {
        this.getIndex(this.state.ratings)
        this.handleBoardState();
    }

    render() {
        if (this.state.checkmates.length >= 1) {
            return (
                <div className='classical'>
                    <Navbar />
                    <Link to="/"><button>Back</button></Link>
                    <h1>Classical Mate</h1>
                    <div className='classical--board'>
                        <button onClick={this.handleStartButton}>Start</button>
                        <Chessboard
                            position={this.state.position}
                            onPieceDrop={this.handleUserMoves}
                            onPieceClick={this.handlePieceClick}
                            animationDuration={500}
                        />
                    </div>
                </div>
            );
        }
    }
}