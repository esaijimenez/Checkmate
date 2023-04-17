import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import React from "react";
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";

import Navbar from './Navbar.js';
import '../styles/PlayPuzzleListUI-style.css'
import PlayUI from "./PlayUI.js";

export default class PlayPuzzleListUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPuzzles: 0,
            puzzles: [],
            table: [],
            chessboardImage: []
        };
    };

    componentDidMount() {
        const mateRef = ref(db, '/custom-puzzles');
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;

            //Pushes all the puzzles from the database into an array
            let puzzles = [];
            let table = [];
            snapshot.forEach((puzzlesSnapshot) => {
                puzzles.push({
                    fen: puzzlesSnapshot.child("fen").val(),
                    moves: puzzlesSnapshot.child("moves").val(),
                    puzzleId: puzzlesSnapshot.child("puzzleId").val(),
                    username: puzzlesSnapshot.child("username").val(),
                    date: puzzlesSnapshot.child("date").val()
                })
            });

            snapshot.forEach((puzzlesSnapshot) => {
                table.push({
                    puzzleId: puzzlesSnapshot.child("puzzleId").val(),
                    username: puzzlesSnapshot.child("username").val(),
                    date: puzzlesSnapshot.child("date").val()
                })
            });

            //Sets some of the state variables
            this.setState({
                numPuzzles: count,
                puzzles: puzzles,
                table: table
            })

            console.log("Count: ", count)
            console.log("numPuzzles: ", this.state.numPuzzles)
            console.log("puzzles: ", this.state.puzzles)

            this.addRowToTable(this.state.numPuzzles)
            //console.log("numPuzzles: ", this.state.numPuzzles)
            console.log("componentDidMount")
        })

    };

    addRowToTable = (numPuzzles) => {
        const table = document.getElementById("puzzleTable");
        const tbody = table.getElementsByTagName("tbody")[0];
        for (let i = numPuzzles - 1; i >= 0; i--) {
            const row = document.createElement("tr");

            const puzzleId = document.createElement("td");
            puzzleId.textContent = this.state.puzzles[i].puzzleId;
            row.appendChild(puzzleId);

            const username = document.createElement("td");
            username.textContent = this.state.puzzles[i].username;
            row.appendChild(username);

            const date = document.createElement("td");
            date.textContent = this.state.puzzles[i].date;
            row.appendChild(date);

            const chessboardImage = document.createElement("button");
            const chessboardContainer = document.createElement("div");
            ReactDOM.render(
                <Chessboard position={this.state.puzzles[i].fen}
                    boardWidth={200}
                    arePiecesDraggable={false}
                    boardOrientation={'black'}
                />, chessboardContainer);


            chessboardImage.onclick = () => this.handleChessboardClick(this.state.puzzles[i].puzzleId);

            chessboardImage.appendChild(chessboardContainer);
            row.appendChild(chessboardImage);


            tbody.appendChild(row);
        }
    }

    handleChessboardClick = (puzzleId) => {
        console.log("Chessboard clicked!");
        console.log("Puzzle ID CLicked: ", puzzleId)
        const puzzle = this.state.puzzles.find(puzzle => puzzle.puzzleId === puzzleId);
        this.props.history.push({
            pathname: '/play',
            state: {
                puzzle
            }
        });
    };



    render() {
        return (
            <div className='play'>
                <Navbar />
                <h1>Puzzle List</h1>

                <div class="table-container">
                    <table id='puzzleTable'>
                        <thead>
                            <tr>
                                <th>Puzzle ID: </th>
                                <th>Username: </th>
                                <th>Date Created: </th>
                                <th>Puzzle: </th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}