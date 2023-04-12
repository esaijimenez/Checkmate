import React from 'react';
import { db } from "../firebase.js";
import { ref, onValue } from 'firebase/database';
import { Chessboard } from 'react-chessboard';
import { Chess } from "chess.js";
import Navbar from './Navbar.js';

import '../styles/BulletUI-style.css'
import GameOver from './GameOver.js';
import GameOverLeaderboard from './GameOverLeaderboard.js';


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
            userMoveIndexQ: 0,
            userPieceSelectedIndex: 0,
            botMoves: [],
            userMoves: [],
            userSequenceIndex: 0,
            moves: [],
            splitMoves: [],
            ratings: 545,
            indexes: 0,
            solutionIndex: 1,
            color: "white",
            lives: 3,
            showGameOver: false,
            confirmGameOver: false,
            showGameOverLeaderboard: false,
            confirmGameOverLeaderboard: true,
            showStartButton: true,
            score: 0,
            minutes: 1,
            seconds: 0,
            timer: 1,
            solutionActive: false,
            showSolutionButton: true,
            squareStyles: null
        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {

        //Pulls chess puzzles from database
        const mateRef = ref(db, '/checkmates');
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;
            let randomIndex = Math.floor(Math.random() * 7)

            //Pushes all the puzzles from the database into an array
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
            //Sets some of the state variables
            this.setState({
                numCheckmates: count,
                checkmates: newState,
                indexes: randomIndex
            })
        })

        // //After a delay, it calls handleBoardState() that starts the game.
        // setTimeout(() => {
        //     this.timer()
        //     this.handleBoardState()
        // }, 3000);

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

    //Initializes each new chess position, pulls the index created from getIndex()
    //The index is used to grab a puzzle stored in the database
    //The index obtained from getIndex() does not change until a puzzle is completed
    handleBoardState = () => {
        if (this.state.lives !== -1) {

            //Initializes the current position by pulling a FEN from the checkmates array at the specific index given by getIndex()
            //The checkmates array was created inside the componentDidMount() method.
            const currPosition = this.state.checkmates[this.state.indexes].fen;


            //This block pulls the moves from the checkmates array at the specific index given by getIndex()
            //The moves are manipulated to filter out everything to obtain only the botMoves.
            //The botMoves are the moves that are not performed by the user.
            const allMoves = this.state.checkmates[this.state.indexes].moves
            const allMovesToString = allMoves.toString();
            const splitAllMoves = allMovesToString.split(' ');
            const filterBotMoves = splitAllMoves.filter((move, index) => index % 2 === 0);
            const allBotMoves = filterBotMoves.toString();
            const botMoves = allBotMoves.split(' ')[this.state.botMoveIndex];

            console.log("All Bot Moves: ", filterBotMoves)

            //Updates many states to initialize the current position and different versions of "moves" arrays
            this.setState({
                userSequenceIndex: 0,
                botMoves: filterBotMoves,
                moves: allMoves,
                splitMoves: splitAllMoves,
                position: currPosition,
                checkmateIndex: this.state.indexes,
                showSolutionButton: true
            });

            console.log("botMoves: ", botMoves)

            //Using Chess.js, this creates a new instance of the Chess class.
            const chess = new Chess()

            //The current position is loaded.
            chess.load(currPosition)

            //The opponents move is executed automatically.
            //The user does not see this move yet; chess.move() occurs behind the scenes. 
            //When this occurs the FEN of the current position changes.
            //The current position can now be obtained through calling chess.fen().
            chess.move(botMoves)

            //The color the user has to move is initialized here.
            let color = chess.turn();
            if (color === 'b') {
                color = "black";
            } else if (color === 'w') {
                color = "white";
            }

            //The color is updated.
            this.setState({
                color: color
            })

            //After a slight delay, the position that the user sees is updated to the new FEN generated by chess.move(botMoves)
            //This is how the user will see the bots move.
            setTimeout(() => {
                this.setState({
                    position: chess.fen(),
                    solutionIndex: 1
                })
            }, 1000);
        }

        //When the user runs out of lives, the game over pop-up will display or
        //the leaderboard message will display.
        else if (this.state.lives === -1) {
            this.setState({
                showGameOver: this.state.confirmGameOver,
                showGameOverLeaderboard: this.state.confirmGameOverLeaderboard,
                lives: 3
            })
        }
    }

    //Validates the users moves and updates the position
    handleUserMoves = (sourceSquare, targetSquare) => {

        if (!this.state.solutionActive) {
            //Grabs the current position and initialized a new Chess instance
            const chess = new Chess(this.state.position)
            const pieceSelected = sourceSquare;
            console.log("Source square: ", pieceSelected)

            //Stores all valid moves in the current position
            const validMoves = chess.moves({ verbose: true })

            //Filters every valid move and finds the correct source square and target square that the user needs to find.
            const move = validMoves.find((move) => move.from === sourceSquare && move.to === targetSquare);

            //This block pulls all the moves to solve the current position
            //The moves are manipulated to filter out everything to obtain only the user moves.
            const allMoves = this.state.moves;
            const splitAllMoves = allMoves.split(' ');
            const filterUserMoves = splitAllMoves.filter((move, index) => index % 2 === 1);
            const filteredMoves = filterUserMoves.map(move => move.split('-')[1]).filter(square => /[a-h][1-8]/.test(square));
            const allUserMoves = filteredMoves.toString();

            //Once the correct moves and sequences are stored, 
            //they will be used later to validate whether the user made that move or not.
            const correctMove = allUserMoves[this.state.userMoveIndex] + allUserMoves[this.state.userMoveIndex + 1];
            const correctSequence = filterUserMoves.toString();
            const correctPieceMovement = filterUserMoves[this.state.userSequenceIndex]

            let correctMoveQ = filteredMoves[this.state.userMoveIndexQ];

            if (correctMoveQ !== correctMove) {
                targetSquare = correctMoveQ
            }

            console.log("correctMove: ", correctMove)
            console.log("correctMoveQ: ", correctMoveQ)
            console.log("targetSquare: ", targetSquare)

            this.setState({
                userMoves: correctSequence
            })

            //These will be used to validate the proper source square was used by the user.
            const userPiece = filterUserMoves.map(move => move.split('-')[0]).filter(square => /[a-h][1-8]/.test(square));
            const userPieceToString = userPiece.toString()
            const userPieceSelected = userPieceToString[this.state.userPieceSelectedIndex] +
                userPieceToString[this.state.userPieceSelectedIndex + 1];

            //Checks to see if the user made a legal move and selected the correct color
            //If either of these are false, it reverts the piece back to the square it was on.
            if (move && move.color === chess.turn()) {

                //If the target square is correct but the source square was incorrect,
                //then the user moves on to the next puzzle and they lose a life.
                if (targetSquare === correctMoveQ && sourceSquare !== userPieceSelected) {
                    if (chess.isCheckmate() === true) {
                        this.setState({
                            position: chess.fen(),
                            ratings: this.state.ratings + 50,
                            botMoveIndex: 0,
                            userSequenceIndex: 0,
                            userMoveIndex: 0,
                            userMoveIndexQ: 0,
                            userPieceSelectedIndex: 0,
                            score: this.state.score + 1,
                            squareStyles: {}

                        })
                        console.log("Checkmate!")

                        //When the user successfully completes a puzzle, the slightly increased rating is
                        //used to obtain the new index for the next puzzle.
                        //Then the new board state is initialized using that new puzzle.
                        setTimeout(() => {
                            this.getIndex(this.state.ratings)
                            this.handleBoardState()
                        }, 1000);
                    }
                    else if (chess.isCheckmate() === false) {
                        this.setState({
                            lives: this.state.lives - 1,
                            botMoveIndex: 0,
                            userSequenceIndex: 0,
                            userMoveIndex: 0,
                            userMoveIndexQ: 0,
                            userPieceSelectedIndex: 0,
                            ratings: this.state.ratings,
                            squareStyles: {}
                        })

                        //When the user fails a puzzle, the rating stays around the same difficulty
                        //and they are taken to a new board state.
                        setTimeout(() => {
                            this.getIndex(this.state.ratings)
                            this.handleBoardState()
                        }, 500);
                    }
                }
                //If the target square is incorrect but the source square was correct,
                //then the user moves on to the next puzzle and they lose a life.
                if (targetSquare !== correctMoveQ && sourceSquare === userPieceSelected) {
                    this.setState({
                        lives: this.state.lives - 1,
                        botMoveIndex: 0,
                        userSequenceIndex: 0,
                        userMoveIndex: 0,
                        userMoveIndexQ: 0,
                        userPieceSelectedIndex: 0,
                        ratings: this.state.ratings,
                        squareStyles: {}
                    })

                    //When the user fails a puzzle, the rating stays around the same difficulty
                    //and they are taken to a new board state.
                    setTimeout(() => {
                        this.getIndex(this.state.ratings)
                        this.handleBoardState()
                    }, 500);
                }

                //If both the target square and the source square are incorrect,
                //then the user moves on to the next puzzle and they lose a life.
                else if (targetSquare !== correctMoveQ && sourceSquare !== userPieceSelected) {
                    this.setState({
                        lives: this.state.lives - 1,
                        botMoveIndex: 0,
                        userSequenceIndex: 0,
                        userMoveIndex: 0,
                        userMoveIndexQ: 0,
                        userPieceSelectedIndex: 0,
                        ratings: this.state.ratings,
                        squareStyles: {}
                    })

                    //When the user fails a puzzle, the rating stays around the same difficulty
                    //and they are taken to a new board state.
                    setTimeout(() => {
                        this.getIndex(this.state.ratings)
                        this.handleBoardState()
                    }, 500);
                }

                //If both the target square and the source square are correct,
                //then the piece that was moved by the user is successfully made
                //and the position is updated to reflect that.
                else if (targetSquare === correctMoveQ && sourceSquare === userPieceSelected) {
                    console.log("Correct Move")
                    chess.move(correctPieceMovement)
                    this.setState({
                        position: chess.fen(),
                        botMoveIndex: this.state.botMoveIndex + 1,
                        solutionIndex: this.state.solutionIndex + 1,
                        userMoveIndex: this.state.userMoveIndex + 3,
                        userMoveIndexQ: this.state.userMoveIndexQ + 1,
                        userPieceSelectedIndex: this.state.userPieceSelectedIndex + 3,
                        squareStyles: {}
                    })

                    //If the current position is checkmate, then the rating difficulty is increased
                    //and there score is increased by 1 point.
                    if (chess.isCheckmate() === true) {

                        this.setState({
                            ratings: this.state.ratings + 50,
                            botMoveIndex: 0,
                            userSequenceIndex: 0,
                            userMoveIndex: 0,
                            userMoveIndexQ: 0,
                            userPieceSelectedIndex: 0,
                            score: this.state.score + 1,
                            seconds: this.state.seconds + 20,
                            squareStyles: {}
                        })
                        if (this.state.seconds > 60) {
                            this.setState({
                                seconds: this.state.seconds - 60,
                                minutes: this.state.minutes + 1,
                                squareStyles: {}
                            });
                        }

                        console.log("Checkmate!")

                        //When the user successfully completes a puzzle, the slightly increased rating is
                        //used to obtain the new index for the next puzzle.
                        //Then the new board state is initialized using that new puzzle.
                        setTimeout(() => {
                            this.getIndex(this.state.ratings)
                            this.handleBoardState()
                        }, 1000);
                    }

                    //If the users move was successful, but its not checkmate,
                    //then handleSubsequentMoves() is called and passes the current position to it.
                    this.handleSubsequentMoves(this.state.position)
                }
            }
        }
    }

    //Takes care of the next bot move that has to be executed when the user makes a successful move
    handleSubsequentMoves = (currFen) => {

        //Creates a new Chess instance at the current position passed in from handleUserMoves()
        const chess = new Chess(currFen)

        if (chess.isCheckmate() === false) {
            //Pulls all the bot moves in order to obtain the next move that needs to be executed automatically.
            let moves = this.state.botMoves;
            let nextMove = moves[this.state.botMoveIndex];
            console.log("nextMove: ", nextMove)
            console.log("moves: ", moves)

            chess.move(nextMove)

            //The position is updated so the user can see the move that was made.
            //The two indexes are being updated by 1 so the handleUserMoves() can correctly
            //validate the users next move is correct.
            this.setState({
                position: chess.fen(),
                userSequenceIndex: this.state.userSequenceIndex + 1,
                solutionIndex: this.state.solutionIndex + 1,
                squareStyles: {}
            })
        }
    }



    //The logic for the solution button
    handleSolutionButton = () => {

        this.setState({
            solutionActive: true,
            showSolutionButton: false
        })
        //Creates a new Chess instance at the current position
        const chess = new Chess(this.state.position)

        //Stores all the moves to solve the puzzle
        const puzzleSolution = this.state.splitMoves

        //Stores the current solution index
        //The solution index changes based on how many moves the 
        //user made before clicking the solution button
        const solutionIndex = this.state.solutionIndex

        //All the moves will be executed recursively until the end of the solution.
        //Then the next puzzle will be displayed.
        setTimeout(() => {
            const pieceMove = puzzleSolution[solutionIndex]
            console.log("Piece Move: ", pieceMove)
            console.log("Solution Index: ", solutionIndex)
            chess.move(pieceMove)
            this.setState({
                position: chess.fen()
            })
            setTimeout(() => {
                //If checkmate, then the user is taken to the next puzzle around the same rating difficulty
                if (chess.isCheckmate() === true) {
                    this.setState({
                        solutionIndex: 1,
                        botMoveIndex: 0,
                        userSequenceIndex: 0,
                        userMoveIndex: 0,
                        userPieceSelectedIndex: 0,
                        confirmGameOver: true,
                        confirmGameOverLeaderboard: false,
                        solutionActive: false,
                        squareStyles: {}
                    })
                    this.getIndex(this.state.ratings)
                    this.handleBoardState();
                }
                //If not checkmate, then update the board position and solution index, then recursively
                //call handleSolutionButton() until puzzle is solved
                else if (chess.isCheckmate() === false) {
                    this.setState({
                        position: chess.fen(),
                        solutionIndex: solutionIndex + 1,
                        squareStyles: {}
                    })

                    this.handleSolutionButton()
                }
            }, 1000);
        }, 1000);
    }

    timer = () => {
        this.interval = setInterval(() => {
            let minutes = this.state.minutes
            let seconds = this.state.seconds

            if (seconds > 0) {
                this.setState({
                    seconds: seconds - 1
                });
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    console.log("Timer is up")
                    this.setState({
                        showGameOver: this.state.confirmGameOver,
                        showGameOverLeaderboard: this.state.confirmGameOverLeaderboard,
                    })
                    clearInterval(this.interval);

                } else {
                    this.setState({
                        minutes: minutes - 1,
                        seconds: 59
                    });
                }
            }
        }, 1000);
    }

    handlePieceClick = (sourceSquare) => {
        setTimeout(() => {

            console.log("sourceSquare: ", sourceSquare)
            const color = sourceSquare.charAt(0);
            const piece = sourceSquare.charAt(1).toLowerCase();

            const chess = new Chess(this.state.position)
            const possibleMoves = chess.moves({ verbose: true })

            const move = possibleMoves.filter((move) => move.from === this.state.from && move.color === color && move.piece === piece)

            let to = [];

            for (let i = 0; i < move.length; i++) {
                to.push(move[i].to)
            }

            this.setState({
                to: to,
                validMoves: move
            })

            //console.log("validMoves: ", validMoves)
            console.log("Piece: ", piece)
            console.log("Color: ", color)
            console.log("possibleMoves: ", possibleMoves)
            console.log("Moves: ", move)
            console.log("To: ", this.state.to)
            console.log("-------------------------------------------")

            const squareStyles = {};

            move.map((move) => {
                squareStyles[move.to] = {
                    background:
                        chess.get(move.to) && chess.get(move.to).color !== chess.get(sourceSquare).color
                            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                    borderRadius: "50%",
                };
            })

            console.log("squareStyles: ", squareStyles);

            this.setState({ squareStyles: squareStyles })

        }, 200);
    }

    handleSquareClick = (sourceSquare) => {
        if (!this.state.solutionActive) {
            console.log("sourceSquare: ", sourceSquare)

            const chess = new Chess(this.state.position)

            this.setState({ from: sourceSquare })

            const userMove = chess.move({
                from: this.state.from,
                to: sourceSquare,
                promotion: "q",
            })

            this.setState({
                position: chess.fen()
            })

            console.log("userMove: ", userMove)
            console.log("correctMove: ", this.state.userMoves)

            //This block pulls all the moves to solve the current position
            //The moves are manipulated to filter out everything to obtain only the user moves.
            const allMoves = this.state.moves;
            const splitAllMoves = allMoves.split(' ');
            const filterUserMoves = splitAllMoves.filter((move, index) => index % 2 === 1);
            const filteredMoves = filterUserMoves.map(move => move.split('-')[1]).filter(square => /[a-h][1-8]/.test(square));
            const allUserMoves = filteredMoves.toString();

            //Once the correct moves and sequences are stored, 
            //they will be used later to validate whether the user made that move or not.
            const correctMove = allUserMoves[this.state.userMoveIndex] + allUserMoves[this.state.userMoveIndex + 1];
            const correctSequence = filterUserMoves.toString();
            const correctPieceMovement = filterUserMoves[this.state.userSequenceIndex]

            console.log("correctMove: ", correctMove)

            setTimeout(() => {
                if (chess.isCheckmate() === true) {
                    this.setState({
                        ratings: this.state.ratings + 50,
                        botMoveIndex: 0,
                        userSequenceIndex: 0,
                        userMoveIndex: 0,
                        userMoveIndexQ: 0,
                        userPieceSelectedIndex: 0,
                        score: this.state.score + 1,
                        seconds: this.state.seconds + 20,
                        squareStyles: {}
                    })
                    if (this.state.seconds > 60) {
                        this.setState({
                            seconds: this.state.seconds - 60,
                            minutes: this.state.minutes + 1,
                            squareStyles: {}
                        });
                    }
                    this.getIndex(this.state.ratings);
                    this.handleBoardState();
                }

                if (chess.isCheckmate() === false) {
                    if (sourceSquare === correctMove) {
                        this.setState({
                            botMoveIndex: this.state.botMoveIndex + 1,
                            solutionIndex: this.state.solutionIndex + 1,
                            userMoveIndex: this.state.userMoveIndex + 3,
                            userMoveIndexQ: this.state.userMoveIndexQ + 1,
                            userPieceSelectedIndex: this.state.userPieceSelectedIndex + 3,
                            squareStyles: {}
                        })
                        this.handleSubsequentMoves(this.state.position)
                    }

                    if (sourceSquare !== correctMove) {
                        this.setState({
                            lives: this.state.lives - 1,
                            botMoveIndex: 0,
                            userSequenceIndex: 0,
                            userMoveIndex: 0,
                            userMoveIndexQ: 0,
                            userPieceSelectedIndex: 0,
                            ratings: this.state.ratings,
                            squareStyles: {}
                        })
                        this.getIndex(this.state.ratings);
                        this.handleBoardState();
                    }
                }
            }, 1000);
        }
    }

    handleStartButtonClick = () => {
        this.handleBoardState();
        this.timer()
        this.setState({ showStartButton: false })
    }

    //render() returns a JSX element that allows us to write HTML in React.
    //Handles what the user sees and interacts with on their screen. 
    render() {
        if (this.state.checkmates.length >= 1) {
            let score = this.state.score;
            let rating = this.state.checkmates[this.state.indexes].rating;
            let theme = this.state.botMoves.length;
            let moves = " moves"

            if (theme === 1) {
                moves = " move"
            }

            let color;
            if (this.state.color === 'black') {
                color = "Black";
            }
            else if (this.state.color === 'white') {
                color = "White";
            }
            let lives = this.state.lives;
            let minutes = this.state.minutes;
            let seconds = this.state.seconds;


            return (
                <div className='bullet'>
                    <Navbar />
                    <div className='bullet--container'>

                        <div className='bullet--info--container'>
                            <div className='bullet--info--1'>
                                <h1 class='bullet--title'>Bullet Mate</h1>
                                {this.state.showStartButton && (
                                    <button onClick={this.handleStartButtonClick} class='bullet--start--button'>Start</button>
                                )}
                                <div className='bullet--item3'><h1>Mate in {theme} {moves}</h1></div>
                                {this.state.showSolutionButton && (
                                    <div className='bullet--item2'><button class='bullet--solution--button' onClick={this.handleSolutionButton}>Solution</button></div>
                                )}
                            </div>

                            <div className='bullet--chessboard'>
                                <Chessboard
                                    position={this.state.position}
                                    onSquareClick={this.handleSquareClick}
                                    onPieceDrop={this.handleUserMoves}
                                    onPieceClick={this.handlePieceClick}
                                    customSquareStyles={this.state.squareStyles}
                                    animationDuration={500}
                                    boardOrientation={this.state.color}
                                />
                            </div>

                            <div className='bullet--info--2'>
                                <div className='bullet--item4'><h1>{color} to Move</h1></div>
                                <div className='bullet--item1'><h1>Rating: {rating}</h1></div>
                                <div className='bullet--item5'><h1>Score: {score}</h1></div>

                                <div className='bullet--info--3'>
                                    <div className='bullet--item6'><h1>{lives} lives left</h1></div>
                                </div>
                                <div className='bullet--item7'>
                                    <h1>Timer: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                                </div>
                            </div>

                        </div>
                        {this.state.showGameOver && (<GameOver />)}
                        {this.state.showGameOverLeaderboard && (<GameOverLeaderboard />)}
                    </div>
                </div>
            );
        }
    }
}