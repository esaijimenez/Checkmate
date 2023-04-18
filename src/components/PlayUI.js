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
import GameOverPlayPuzzle from './GameOverPlayPuzzle.js';


export default class PlayUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            puzzle: props.location.state.puzzle,
            fen: "",
            moves: [],
            puzzleId: 0,
            username: "",
            date: "",
            botMoveIndex: 0,
            userMoveIndex: 1,
            showStartButton: true,
            showGameOverPlayPuzzle: false,
        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {
        let fen = this.state.puzzle.fen;
        let moves = this.state.puzzle.moves;
        let puzzleId = this.state.puzzle.puzzleId;
        let username = this.state.puzzle.username;
        let date = this.state.puzzle.date;

        this.setState({
            fen: fen,
            moves: moves,
            puzzleId: puzzleId,
            username: username,
            date: date,
        })

    };

    handleBotMoves = () => {
        console.log("handleBotMoves");
        console.log("fen: " + this.state.fen);
        console.log("moves: " + this.state.moves[this.state.botMoveIndex]);

        let move = this.state.moves[this.state.botMoveIndex]

        const chess = new Chess(this.state.fen)

        console.log(chess.turn());

        chess.move(move)

        console.log("Position: " + chess.fen())

        this.setState({
            fen: chess.fen(),
            botMoveIndex: this.state.botMoveIndex + 2,
            showStartButton: false
        })

        console.log("fen: " + this.state.fen);
    };

    handleStartButton = () => {
        this.handleBotMoves()
    }

    handleUserMoves = (sourceSquare, targetSquare) => {
        const chess = new Chess(this.state.fen)

        console.log("source: " + sourceSquare);
        console.log("target: " + targetSquare);

        let move = sourceSquare + targetSquare
        console.log("Move: ", move)

        let _userSourceSquare = this.state.moves[this.state.userMoveIndex];
        let userSourceSquare = _userSourceSquare.substring(0, 2);

        let _userTargetSquare = this.state.moves[this.state.userMoveIndex];
        let userTargetSquare = _userTargetSquare.substring(2, 4);

        const validMoves = chess.moves({ verbose: true })
        const validMove = validMoves.find((move) => move.from === sourceSquare && move.to === targetSquare);
        console.log("Valid Moves: ", validMoves)
        console.log("Valid Move: ", validMove)

        if (validMove) {
            if (validMove && validMove.from !== userSourceSquare) {
                console.log("Im sorry, but that is the wrong move. ):");
                this.setState({
                    showGameOverPlayPuzzle: true
                })
            }
            else if (validMove && validMove.from == userSourceSquare && validMove.to !== userTargetSquare) {
                console.log("Im sorry, but that is the wrong move. ):")
                this.setState({
                    showGameOverPlayPuzzle: true
                })
            }
            else if (validMove && validMove.from == userSourceSquare && validMove.to == userTargetSquare) {
                chess.move(this.state.moves[this.state.userMoveIndex])
                this.setState({
                    fen: chess.fen(),
                    userMoveIndex: this.state.userMoveIndex + 2,
                })

                if (chess.isCheckmate() === false) {
                    console.log("Not Checkmate yet!")
                    this.handleBotMoves();
                }
                else {
                    console.log("Checkmate!");
                }
            }
        }
        else {
            console.log("Invalid move")
        }
    }


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

                            {this.state.showStartButton && <button onClick={this.handleStartButton}>Start</button>}

                            {this.state.showGameOverPlayPuzzle && (<GameOverPlayPuzzle />)}

                        </div>

                        <div className='play--chessboard'>
                            <Chessboard
                                position={this.state.fen}
                                onSquareClick={this.handleSquareClick}
                                onPieceDrop={this.handleUserMoves}
                                onPieceClick={this.handlePieceClick}
                                customSquareStyles={this.state.squareStyles}
                                animationDuration={600}
                                boardOrientation={'black'}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}