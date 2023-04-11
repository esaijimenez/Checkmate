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
import { isFocusable } from "@testing-library/user-event/dist/utils/index.js";


export default class CreateUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            sparePieces: [],
            isDragging: false,
            placement: [],
            placementIndex: 0,
            offBoard: "trash"
        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {
        console.log("componentDidMount")

        // this.setState({
        //     chess: this.state.chess.clear()
        // })
    };

    handleSquareClick = (sourceSquare) => {
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

    handleDragStart = () => {
        this.setState({ isDragging: true });
    };

    handleDragEnd = () => {
        this.setState({ isDragging: false });
    };

    handleDrop = (sourceSquare, targetSquare) => {
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

        chess.put({ type: piece, color: color }, target)

        console.log("Position: ", chess.fen())

        this.setState({
            position: chess.fen()
        });

    }

    handleDragOverSquare = (sourceSquare) => {
        console.log("Drag Over Square: ", sourceSquare)
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
                <h1>Create Mate</h1>
                <div className='create--chessboard'>

                    <div className='create--info'>
                        <button onClick={this.handleDropOffBoard}>Remove</button>
                        <button onClick={this.handleConfirmPositionButton}>Confirm Puzzle</button>
                        <Chessboard
                            position={this.state.position}
                            onSquareClick={this.handleSquareClick}
                            onDragStart={this.handleDragStart} // Add onDragStart event handler
                            onDragEnd={this.handleDragEnd} // Add onDragEnd event handler
                            sparePieces={true}
                            isDragging={this.state.isDragging} // Add isDragging flag to Chessboard
                            onDrop={this.handleDrop}
                            onDragOverSquare={this.handleDragOverSquare}
                            dropOffBoard={this.state.offBoard}
                        />
                    </div>
                </div>
            </div>
        );
    }
}