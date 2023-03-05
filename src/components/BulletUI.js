import React from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import { Link } from "react-router-dom";
import Navbar from './Navbar.js';
import Popup from './Popup.js';

import '../styles/BulletUI-style.css'

export default class BulletUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            checkmateIndex: 0,
            numCheckmates: 0,
            checkmates: [],
            position: "start",
            botMoveIndex: 0,
            userMoveIndex: 0,
            userPieceSelectedIndex: 0,
            botMoves: [],
            userMoves: [],
            userSequenceIndex: 0,
            moves: [],
            splitMoves: [],
            ratings: 545,
            indexes: 0,
            solutionIndex: 1,
            color: "White",
            lives: 3,
            showPopup: false,
            score: 0
        };
    };

    componentDidMount() {

        //Pulls chess puzzles from database
        const mateRef = ref(db, '/checkmates');
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;
            let randomIndex = Math.floor(Math.random() * 7)
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
                numCheckmates: count,
                checkmates: newState,
                indexes: randomIndex
            })
        })

    };

    //Gets the initial index of the puzzle by grabbing a random rating within a particular rating range.
    //After each successful puzzle, the range increases by 50 difficulty.
    getIndex = (rating) => {
        let ratings = rating;
        let index = [];

        for (let i = 0; i < this.state.numCheckmates; i++) {
            if (this.state.checkmates[i].rating >= (ratings) && (this.state.checkmates[i].rating < ((ratings + 50)))) {
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
        if (this.state.lives !== -1) {
            console.log("Index: ", this.state.indexes)
            console.log("Rating: ", this.state.checkmates[this.state.indexes].rating)
            console.log("PuzzleID: ", this.state.checkmates[this.state.indexes].puzzleid)

            const currPosition = this.state.checkmates[this.state.indexes].fen;
            const chess = new Chess()

            const allMoves = this.state.checkmates[this.state.indexes].moves
            const allMovesToString = allMoves.toString();
            const splitAllMoves = allMovesToString.split(' ');
            const filterBotMoves = splitAllMoves.filter((move, index) => index % 2 === 0);
            const allBotMoves = filterBotMoves.toString();
            const botMoves = allBotMoves.split(' ')[this.state.botMoveIndex];

            console.log("All Bot Moves: ", filterBotMoves)

            this.setState({
                userSequenceIndex: 0,
                botMoves: filterBotMoves,
                moves: allMoves,
                splitMoves: splitAllMoves,
                position: currPosition,
                checkmateIndex: this.state.indexes
            });


            console.log("botMoves: ", botMoves)

            chess.load(currPosition)
            chess.move(botMoves)

            let color = chess.turn();
            if (color === 'b') {
                color = "Black";
            } else {
                color = "White";
            }
            this.setState({
                color: color
            })

            setTimeout(() => {
                this.setState({
                    position: chess.fen(),
                    solutionIndex: 1
                })
            }, 1000);
        }
        else if (this.state.lives === -1) {
            this.setState({
                showPopup: true,
                lives: 3
            })
        }
    }

    handleSubsequentMoves = (currFen) => {
        const chess = new Chess(currFen)
        if (chess.isCheckmate() === false) {
            console.log("Inside of handleSubsequentMoves")
            let moves = this.state.botMoves;
            let nextMove = moves[this.state.botMoveIndex];
            console.log("nextMove: ", nextMove)
            console.log("moves: ", moves)

            chess.move(nextMove)

            this.setState({
                position: chess.fen(),
                userSequenceIndex: this.state.userSequenceIndex + 1,
                solutionIndex: this.state.solutionIndex + 1

            })
        }
    }

    //Validates the users moves and updates the position
    handleUserMoves = (sourceSquare, targetSquare) => {
        const chess = new Chess(this.state.position)
        const pieceSelected = sourceSquare;
        console.log("Source square: ", pieceSelected)

        const validMoves = chess.moves({ square: pieceSelected })
        console.log("Valid moves: ", validMoves)

        const allMoves = this.state.moves;
        const splitAllMoves = allMoves.split(' ');
        const filterUserMoves = splitAllMoves.filter((move, index) => index % 2 === 1);
        const filteredMoves = filterUserMoves.map(move => move.split('-')[1]).filter(square => /[a-h][1-8]/.test(square));
        const allUserMoves = filteredMoves.toString();
        const correctMove = allUserMoves[this.state.userMoveIndex] + allUserMoves[this.state.userMoveIndex + 1];
        const correctSequence = filterUserMoves.toString();
        const correctPieceMovement = filterUserMoves[this.state.userSequenceIndex]

        const userPiece = filterUserMoves.map(move => move.split('-')[0]).filter(square => /[a-h][1-8]/.test(square));
        const userPieceToString = userPiece.toString()
        const userPieceSelected = userPieceToString[this.state.userPieceSelectedIndex] + userPieceToString[this.state.userPieceSelectedIndex + 1];

        console.log("userPieceSelected: ", userPieceSelected)

        console.log("Moves: ", allMoves)
        console.log("splitAllMoves: ", splitAllMoves)
        console.log("correctMove: ", correctMove)

        this.setState({
            userMoves: correctSequence
        })

        console.log("filterUserMoves moves: ", filterUserMoves);
        console.log("Correct moves: ", correctMove);
        console.log("correctPieceMovement moves: ", correctPieceMovement);
        console.log("userSequenceIndex: ", this.state.userSequenceIndex);

        let color = "";
        let currColor = chess.turn();
        if (currColor == 'b') {
            color = 'b'
        }
        else if (currColor == 'w') {
            color = 'w'
        }

        console.log("COLOR: ", chess.turn())

        //if (color === currColor) {

        if (targetSquare !== correctMove && sourceSquare !== userPieceSelected) {
            console.log("Not correct move")
            this.setState({
                lives: this.state.lives - 1,
                botMoveIndex: 0,
                userSequenceIndex: 0,
                userMoveIndex: 0,
                userPieceSelectedIndex: 0,
                ratings: this.state.ratings,
            })
            setTimeout(() => {
                this.getIndex(this.state.ratings)
                this.handleBoardState()
            }, 500);
        }
        else if (targetSquare === correctMove && sourceSquare === userPieceSelected) {
            console.log("Correct Move")
            chess.move(correctPieceMovement)
            this.setState({
                position: chess.fen(),
                botMoveIndex: this.state.botMoveIndex + 1,
                solutionIndex: this.state.solutionIndex + 1,
                //userSequenceIndex: this.state.userSequenceIndex,
                userMoveIndex: this.state.userMoveIndex + 3,
                userPieceSelectedIndex: this.state.userPieceSelectedIndex + 3
            })
            if (chess.isCheckmate() === true) {
                this.setState({
                    ratings: this.state.ratings + 50,
                    botMoveIndex: 0,
                    userSequenceIndex: 0,
                    userMoveIndex: 0,
                    userPieceSelectedIndex: 0,
                    score: this.state.score + 1,

                })
                console.log("Checkmate!")
                setTimeout(() => {
                    this.getIndex(this.state.ratings)
                    this.handleBoardState()
                }, 1000);

            }

            this.handleSubsequentMoves(this.state.position)
        }
        // }
    }

    handlePieceClick = (piece) => {
        console.log(`You clicked on piece ${piece}`);
    }

    //This function is only a placeholder, it was used to figure out how to move the pieces
    handleStartButton = () => {
        //this.getIndex(this.state.ratings)
        this.handleBoardState();
    }

    handleSolutionButton = () => {
        const chess = new Chess(this.state.position)
        const puzzleSolution = this.state.splitMoves
        console.log("Puzzle Solution: ", puzzleSolution)
        const solutionIndex = this.state.solutionIndex

        setTimeout(() => {
            const pieceMove = puzzleSolution[solutionIndex]
            console.log("Piece Move: ", pieceMove)
            console.log("Solution Index: ", solutionIndex)
            chess.move(pieceMove)
            this.setState({
                position: chess.fen()
            })
            setTimeout(() => {
                if (chess.isCheckmate() === true) {
                    this.setState({
                        solutionIndex: 1,
                        botMoveIndex: 0,
                        userSequenceIndex: 0,
                        userMoveIndex: 0,
                    })
                    this.getIndex(this.state.ratings)
                    this.handleBoardState();
                }
                else if (chess.isCheckmate() === false) {
                    this.setState({
                        position: chess.fen(),
                        solutionIndex: solutionIndex + 1
                    })
                    this.handleSolutionButton()
                }
            }, 1000);
        }, 1000);
    }

    render() {
        if (this.state.checkmates.length >= 1) {
            let score = this.state.score;
            let rating = this.state.checkmates[this.state.indexes].rating;
            let color = this.state.color;
            let lives = this.state.lives;
            return (
                <div className='bullet'>
                    <Navbar />
                    <h1>Bullet Mate</h1>
                    <div className='bullet--chessboard'>
                        <button onClick={this.handleStartButton}>Start</button>

                        <div className='bullet--info'>
                            <h1>Rating: {rating}</h1>
                            <h1>{color} to Move</h1>
                            <h1>Score: {score}</h1>
                            <h1>Lives left: {lives}</h1>
                            <button onClick={this.handleSolutionButton}>Solution</button>
                            <Chessboard
                                position={this.state.position}
                                onPieceDrop={this.handleUserMoves}
                                onPieceClick={this.handlePieceClick}
                                animationDuration={500}
                            />
                        </div>
                    </div>
                    {this.state.showPopup && (<Popup />)}
                </div>
            );
        }
    }
}