import React, { useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue, push } from 'firebase/database';
// import{ Chessboard } from 'react-chessboard';
import Chessboard from 'chessboardjsx';
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
            position: "8/8/3k4/8/8/4K3/8/8 w KQkq - 0 1",
            sparePieces: [],
            isSparePieces: true,
            isDragging: false,
            isPositionSetup: true,
            isDeletePieces: true,
            placement: [],
            placementIndex: 0,
            offBoard: "trash",
            showConfirmButton: true,
            showConfirmSolutionButton: false,
            showBackButton: false
        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {
        console.log("componentDidMount")


    };

    handleSquareClick = (sourceSquare) => {
        if (this.state.isDeletePieces === true) {
            console.log("handleSquareClick: ", sourceSquare)
            const chess = new Chess(this.state.position)
            let square = sourceSquare

            let pieceType = chess.get(square).type

            console.log("piece: ", pieceType)

            if (pieceType === 'k') {
                console.log("Must have a king")
            }
            else {
                chess.remove(square)
            }

            this.setState({
                position: chess.fen()
            });
        }
        else if (this.state.isDeletePieces === false) {
            console.log("Click back")
        }

    }

    handleDragStart = () => {
        this.setState({ isDragging: true });
    };

    handleDragEnd = () => {
        this.setState({ isDragging: false });
    };

    handleDrop = (sourceSquare, targetSquare) => {
        if (this.state.isPositionSetup === true) {
            console.log("source: ", sourceSquare)
            console.log("target: ", targetSquare)

            let _target = sourceSquare.targetSquare
            let _color = sourceSquare.piece[0]
            let _piece = sourceSquare.piece[1]

            let placement = []
            placement.push(_target, _color, _piece)
            this.setState({
                placement: placement
            })

            let target = placement[this.state.placementIndex]
            let color = placement[this.state.placementIndex + 1]
            let piece = placement[this.state.placementIndex + 2]

            console.log("placement: ", placement)
            console.log("target: ", target)
            console.log("color: ", color)
            console.log("piece: ", piece)

            const chess = new Chess(this.state.position);
            chess.remove(sourceSquare.sourceSquare)

            if (sourceSquare.sourceSquare === 'spare' && piece === 'K') {
                console.log("ITS A KINGGGGGGGGGGGGGG ")
                chess.remove(target)
            }
            else {
                chess.put({ type: piece, color: color }, target)
            }

            console.log("Position: ", chess.fen())

            this.setState({
                position: chess.fen()
            });
        }
        else if (this.state.isPositionSetup === false) {
            console.log("WHATS GOOOOOODDDDDDDDDD")
            console.log("Sourcesquare: ", sourceSquare.sourceSquare)
            const chess = new Chess(this.state.position);

            let _source = sourceSquare.sourceSquare
            let _target = sourceSquare.targetSquare
            let _color = sourceSquare.piece[0]
            let _piece = sourceSquare.piece[1]

            const validMoves = chess.moves({ verbose: true })
            //const move = validMoves.find((move) => move.from === sourceSquare && move.to === targetSquare);



            for (let i = 0; i < validMoves.length; i++) {
                console.log("MOVE: ", validMoves[i])
                if (_source === validMoves[i].from) {
                    console.log("MOVE FROM: ", validMoves[i])

                    if (_color === chess.turn() && _target === validMoves[i].to) {
                        chess.move({
                            from: sourceSquare.sourceSquare,
                            to: sourceSquare.targetSquare,
                            promotion: "Q"
                        })
                        this.setState({
                            position: chess.fen()
                        });
                    }
                    else {
                        console.log("Invalid Move")
                    }
                }
            }
        }
    }

    handleDragOverSquare = (sourceSquare) => {
        console.log("Drag Over Square: ", sourceSquare)
    }

    handleConfirmPositionButton = () => {
        const chess = new Chess(this.state.position)
        chess.load(this.state.position)

        if (chess.turn() === 'b') {
            chess.move(null)
        }

        console.log("Chess Position: ", chess.fen())

        console.log("chess.isCheck: ", chess.inCheck())

        if (chess.inCheck() === true || chess.isCheckmate() === true) {
            console.log("Cannot be in check or checkmate when confirming position")
            this.setState({
                showConfirmButton: true,
                showBackButton: false,
                showConfirmSolutionButton: false,
                isSparePieces: true,
                isPositionSetup: true,
                isDeletePieces: true
            })
        }
        else {
            this.setState({
                showConfirmButton: false,
                showBackButton: true,
                showConfirmSolutionButton: true,
                isSparePieces: false,
                isPositionSetup: false,
                isDeletePieces: false
            })
        }
    }

    handleBackButton = () => {
        const chess = new Chess(this.state.position)
        console.log("Chess Position: ", chess.fen())
        this.setState({
            showConfirmButton: true,
            showBackButton: false,
            showConfirmSolutionButton: false,
            isSparePieces: true,
            isPositionSetup: true,
            isDeletePieces: true
        })
    }

    handleConfirmSolutionButton = () => {
        console.log("Confirmed Solution")
    }

    handleDropOffBoard = () => {
        console.log("Dropped Off Board!!!!: ")
        this.setState({
            offBoard: "trash"
        })

        console.log("offBoard: ", this.state.offBoard)
    }

    render() {
        console.log("Placement: ", this.state.placement)
        return (
            <div className='create'>
                <Navbar />
                <div className='create--chessboard'>

                    <div className='create--info'>

                        <div className='create--info--container'>
                            <div className='create--info--1'>
                                <h1 class='create--title'>Custom Puzzle: Create Mate</h1>
                                {this.state.showConfirmButton && (
                                    <button className='create--button' onClick={this.handleConfirmPositionButton}>Confirm Position</button>
                                )}
                                {this.state.showConfirmSolutionButton && (
                                    <button className='create--button' onClick={this.handleConfirmSolutionButton}>Confirm Solution</button>
                                )}
                                {this.state.showBackButton && (
                                    <button className='create--button' onClick={this.handleBackButton}>Back</button>
                                )}
                            </div>

                            <Chessboard
                                position={this.state.position}
                                onSquareClick={this.handleSquareClick}
                                onDragStart={this.handleDragStart} // Add onDragStart event handler
                                onDragEnd={this.handleDragEnd} // Add onDragEnd event handler
                                sparePieces={this.state.isSparePieces}
                                isDragging={this.state.isDragging} // Add isDragging flag to Chessboard
                                onDrop={this.handleDrop}
                                onDragOverSquare={this.handleDragOverSquare}
                                dropOffBoard={this.state.offBoard}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}