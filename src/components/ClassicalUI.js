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
            move: "",
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

    getIndex = () => {
        let ratings = this.state.ratings;
        let multiplier = 100;
        let index = [];

        for (let i = 0; i < this.state.numCheckmates; i++) {
            if (this.state.checkmates[i].rating > (ratings * multiplier) && (this.state.checkmates[i].rating < ((ratings + 1) * multiplier))) {
                index.push(i);
            }
        }

        let randomIndex = Math.floor(Math.random() * index.length)
        this.setState({
            indexes: index[randomIndex]
        })
    }

    handleBotMoves = () => {
        const newPosition = this.state.checkmates[this.state.indexes].fen;
        const chess = new Chess()
        const botMoves = this.state.checkmates[this.state.indexes].moves

        const moves = botMoves.split(' ')[0];
        chess.load(this.state.checkmates[this.state.indexes].fen)

        this.setState({
            position: newPosition,
            checkmateIndex: this.state.indexes
        });

        chess.move(moves)

        setTimeout(() => {
            this.setState({
                position: chess.fen()
            })
        }, 1000);


    }

    handleUserMoves = () => {

    }


    //This function is only a placeholder, it was used to figure out how to move the pieces
    handleNewPositionClick = () => {
        this.handleBotMoves();
    }

    render() {
        if (this.state.checkmates.length >= 1) {
            return (
                <div className='classical'>
                    <Navbar />
                    <Link to="/"><button>Back</button></Link>
                    <h1>Classical Mate</h1>
                    <div className='classical--board'>
                        <button onClick={this.handleNewPositionClick}>Generate Position</button>
                        <Chessboard position={this.state.position} />
                    </div>
                </div>
            );
        }
    }
}