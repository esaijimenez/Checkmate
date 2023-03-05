import React from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
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
            position: ""
        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {

    };

    //handleUserMoves = (sourceSquare, targetSquare) => { }

    //handlePieceClick = (sourceSquare) => {}

    //render() returns a JSX element that allows us to write HTML in React.
    //Handles what the user sees and interacts with on their screen. 
    render() {
        return (
            <div className='create'>
                <Navbar />
                <h1>Create Mate</h1>
                <div className='create--chessboard'>

                    <div className='create--info'>
                        <Chessboard
                            position={this.state.position}
                            animationDuration={500}
                            customPieces={true}
                        />
                    </div>
                </div>
                {this.state.showGameOver && (<GameOver />)}
                {this.state.showGameOverLeaderboard && (<GameOverLeaderboard />)}

            </div>
        );
    }
}