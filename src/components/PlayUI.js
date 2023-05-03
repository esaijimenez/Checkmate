import React from "react";
import { db } from "../firebase.js";
import { ref, onValue } from "firebase/database";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import Navbar from "./Navbar.js";

import "../styles/PlayUI-style.css";
import GameOver from "./GameOver.js";
import GameOverLeaderboard from "./GameOverLeaderboard.js";
import LeaderboardUI from "./LeaderboardUI.js";
import FailedPlayPuzzle from "./FailedPlayPuzzle.js";
import SuccessPlayPuzzle from "./SuccessPlayPuzzle.js";

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
            showFailedPlayPuzzle: false,
            showSuccessPlayPuzzle: false,
        };
    }

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
        });
    }

    handleBotMoves = () => {
        let move = this.state.moves[this.state.botMoveIndex];

        const chess = new Chess(this.state.fen);

        chess.move(move);

        this.setState({
            fen: chess.fen(),
            botMoveIndex: this.state.botMoveIndex + 2,
            showStartButton: false,
        });
    };

    handleStartButton = () => {
        this.handleBotMoves();
    };

    handleUserMoves = (sourceSquare, targetSquare) => {
        const chess = new Chess(this.state.fen);

        let move = sourceSquare + targetSquare;

        let _userSourceSquare = this.state.moves[this.state.userMoveIndex];
        let userSourceSquare = _userSourceSquare.substring(0, 2);

        let _userTargetSquare = this.state.moves[this.state.userMoveIndex];
        let userTargetSquare = _userTargetSquare.substring(2, 4);

        const validMoves = chess.moves({ verbose: true });
        const validMove = validMoves.find(
            (move) => move.from === sourceSquare && move.to === targetSquare
        );

        if (validMove) {
            if (validMove && validMove.from !== userSourceSquare) {
                this.setState({
                    showFailedPlayPuzzle: true,
                });
            } else if (
                validMove &&
                validMove.from == userSourceSquare &&
                validMove.to !== userTargetSquare
            ) {
                this.setState({
                    showFailedPlayPuzzle: true,
                });
            } else if (
                validMove &&
                validMove.from == userSourceSquare &&
                validMove.to == userTargetSquare
            ) {
                chess.move(this.state.moves[this.state.userMoveIndex]);
                this.setState({
                    fen: chess.fen(),
                    userMoveIndex: this.state.userMoveIndex + 2,
                });

                if (chess.isCheckmate() === false) {
                    this.handleBotMoves();
                } else {
                    this.setState({
                        showSuccessPlayPuzzle: true,
                    });
                }
            }
        } else {
        }
    };

    //render() returns a JSX element that allows us to write HTML in React.
    //Handles what the user sees and interacts with on their screen.
    render() {
        return (
            <div className="play">
                <Navbar />

                <div className="play--container">
                    <div className="play--info--container">
                        <div className="play--info--1">
                            <h1 class="play--title">Play Mate</h1>
                            <h1>{this.state.value}</h1>

                            {this.state.showStartButton && (
                                <button
                                    className="play--start--button"
                                    onClick={this.handleStartButton}
                                >
                                    Start
                                </button>
                            )}

                            {this.state.showFailedPlayPuzzle && <FailedPlayPuzzle />}

                            {this.state.showSuccessPlayPuzzle && <SuccessPlayPuzzle />}
                        </div>

                        <div className="play--chessboard">
                            <Chessboard
                                position={this.state.fen}
                                onSquareClick={this.handleSquareClick}
                                onPieceDrop={this.handleUserMoves}
                                onPieceClick={this.handlePieceClick}
                                customSquareStyles={this.state.squareStyles}
                                animationDuration={600}
                                boardOrientation={"black"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
