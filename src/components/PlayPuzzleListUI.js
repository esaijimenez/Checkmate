import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import React from "react";
import { Link } from "react-router-dom";

import Navbar from './Navbar.js';

export default class LoginUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPuzzles: 0,
            puzzles: []
        };
    };

    componentDidMount() {
        const mateRef = ref(db, '/custom-puzzles');
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;

            //Pushes all the puzzles from the database into an array
            let puzzles = [];
            snapshot.forEach((puzzlesSnapshot) => {
                puzzles.push({
                    fen: puzzlesSnapshot.child("fen").val(),
                    moves: puzzlesSnapshot.child("moves").val(),
                    puzzleId: puzzlesSnapshot.child("puzzleId").val(),
                    username: puzzlesSnapshot.child("username").val(),
                    date: puzzlesSnapshot.child("date").val()
                })
            });
            //Sets some of the state variables
            this.setState({
                numPuzzles: count,
                puzzles: puzzles
            })
        })
    };

    render() {
        return (
            <div>
                <Navbar />

                <h1>Puzzle List</h1>
            </div>
        );
    }
}