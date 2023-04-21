import React, { useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue, set, push } from 'firebase/database';
// import{ Chessboard } from 'react-chessboard';
import Chessboard from 'chessboardjsx';
import { Piece } from "react-chessboard";


import { Chess } from "chess.js";
import Navbar from './Navbar.js';

import '../styles/CreateUI-style.css'
import PuzzleSubmitted from "./PuzzleSubmission.js";


export default class CreateUI extends React.Component {
    constructor(props) {
        super(props);

        //State variables that continuously update
        this.state = {
            position: "8/8/3k4/8/8/4K3/8/8 w KQkq - 0 1",
            confirmedPosition: "",
            sparePieces: [],
            isSparePieces: true,
            isDragging: false,
            isPositionSetup: true,
            isDeletePieces: true,
            isCheckmate: false,
            placement: [],
            placementIndex: 0,
            offBoard: "trash",
            showConfirmButton: true,
            showConfirmSolutionButton: false,
            showBackButton: false,
            showMustBeCheckmate: false,
            showTutorialButton: true,
            isConfirmedSolution: false,
            isMoved: false,
            isFirstOKButton: null,
            isSecondOKButton: null,
            isThirdOKButton: null,
            isFourthOKButton: null,
            isFifthOKButton: null,
            puzzleId: 1,
            username: "Carlos Magnusson",
            fen: "",
            moves: [],
            date: "",
            puzzles: [],
            counter: 0,
            history: [],
            historyMoves: [],
            historyCounter: 0,
            kingSquare: [],
            isKingSquare: false,
        };
    };

    //componentDidMount() is the first method called when the component is rendered.
    componentDidMount() {
        console.log("componentDidMount")
        this.retrievePuzzlesFromDatabase()
    };

    retrievePuzzlesFromDatabase = () => {
        const mateRef = ref(db, "/custom-puzzles");
        onValue(mateRef, (snapshot) => {
            const count = snapshot.size;

            let databasePuzzles = [];
            snapshot.forEach((puzzlesSnapshot) => {
                databasePuzzles.push({
                    puzzleId: puzzlesSnapshot.child("puzzleId").val(),
                    username: puzzlesSnapshot.child("username").val(),
                    fen: puzzlesSnapshot.child("fen").val(),
                    moves: puzzlesSnapshot.child("moves").val(),
                    date: puzzlesSnapshot.child("date").val(),
                })
            });

            //Sets some of the state variables
            this.setState({
                counter: count,
                puzzleId: count + 1
            });

            console.log("puzzleId: ", this.state.puzzleId)
            console.log("count: ", count)
            console.log("puzzles: ", databasePuzzles[0])
        });
    }

    sendPuzzleToDatabase = () => {
        let puzzleId = this.state.puzzleId;
        let username = this.state.username;
        let fen = this.state.confirmedPosition;
        let moves = this.state.moves;
        let puzzles = [];
        let date = new Date();
        let day = date.getDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let todayDate = month + " " + day + ", " + year;

        console.log("date: ", todayDate)

        puzzles.push({
            puzzleId: puzzleId,
            username: username,
            fen: fen,
            moves: moves,
            date: date
        })

        this.setState({
            puzzles: puzzles
        })

        console.log("puzzleId--------: ", this.state.puzzleId)
        console.log("counter---------: ", this.state.counter)
        console.log("puzzle-------:", puzzles)
        console.log("puzzle.puzzleID-------:", puzzles[0].puzzleId)
        console.log("puzzle.puzzleID-------:", puzzles.moves)

        const mateRef = ref(db, "/custom-puzzles/" + this.state.counter);
        set(mateRef, {
            puzzleId: puzzles[0].puzzleId,
            username: puzzles[0].username,
            fen: puzzles[0].fen,
            moves: puzzles[0].moves,
            date: todayDate
        });

        this.setState({
            puzzleId: this.state.puzzleId + 1,
            counter: this.state.counter + 1
        })
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
            chess.remove(sourceSquare.sourceSquare);

            let rows = chess.board()
            let row1 = rows[0]
            let row2 = rows[1]
            let row3 = rows[2]
            let row4 = rows[3]
            let row5 = rows[4]
            let row6 = rows[5]
            let row7 = rows[6]
            let row8 = rows[7]
            let columns = []
            let holder = []
            let kings = []

            console.log("row1: ", row1)
            console.log("row2: ", row2)
            console.log("row3: ", row3)
            console.log("row4: ", row4)
            console.log("row5: ", row5)
            console.log("row6: ", row6)
            console.log("row7: ", row7)
            console.log("row8: ", row8)
            console.log("columns: ", columns)



            // for(let i = 0; i < rows.length; i++){
            //     if(rows)
            // }

            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows.length; j++) {
                    kings.push(rows[i][j])
                }
            }

            for (let i = 0; i < kings.length; i++) {
                if (kings[i] && kings[i].type === 'k') {
                    this.state.kingSquare.push(kings[i].square)
                }
            }

            console.log("columns: ", columns)
            console.log("rows: ", rows)
            console.log("kings: ", this.state.kingSquare)
            console.log("holder: ", holder)

            for (let i = 0; i < this.state.kingSquare.length; i++) {
                if (target === this.state.kingSquare[i]) {
                    this.state.isKingSquare = true;
                }
            }

            console.log("kingSquare: ", this.state.kingSquare)
            console.log("target: ", target)
            console.log("isKingSquare: ", this.state.isKingSquare)

            if (!this.state.isKingSquare) {
                if (sourceSquare.sourceSquare === 'spare' && piece === 'K') {
                    console.log("ITS A KINGGGGGGGGGGGGGG ")
                    chess.remove(target)
                }
                else if (piece === 'Q' && color === 'b' || piece === 'R' && color === 'b') {
                    chess.remove(target)
                    this.setState({
                        position: chess.fen()
                    });
                    chess.put({ type: piece, color: color }, target)
                }
                else {
                    chess.put({ type: piece, color: color }, target)
                }

                console.log("Position: ", chess.fen())

                this.setState({
                    position: chess.fen(),
                    kingSquare: [],
                    isKingSquare: false
                });
            }

            this.setState({
                kingSquare: [],
                isKingSquare: false
            });

        }
        else if (this.state.isPositionSetup === false) {
            console.log("WHATS GOOOOOODDDDDDDDDD")
            console.log("Sourcesquare: ", sourceSquare.sourceSquare)
            const chess = new Chess();
            chess.load(this.state.position)

            let _source = sourceSquare.sourceSquare
            let _target = sourceSquare.targetSquare
            let _color = sourceSquare.piece[0]
            let _piece = sourceSquare.piece[1]

            const validMoves = chess.moves({ verbose: true })

            for (let i = 0; i < validMoves.length; i++) {
                console.log("MOVE: ", validMoves[i])
                if (_source === validMoves[i].from) {
                    console.log("MOVE FROM: ", validMoves[i])

                    if (_color === chess.turn() && _target === validMoves[i].to) {

                        if (_piece === 'Q' && _color === 'b' || _piece === 'R' && _color === 'b') {
                            chess.move({
                                from: sourceSquare.sourceSquare,
                                to: sourceSquare.targetSquare,
                                promotion: "Q"
                            })
                            chess.remove(_target)
                            this.setState({
                                position: chess.fen()
                            });
                            chess.put({ type: _piece, color: _color }, _target)
                            this.setState({
                                position: chess.fen()
                            });
                        }
                        else {
                            chess.move({
                                from: sourceSquare.sourceSquare,
                                to: sourceSquare.targetSquare,
                                promotion: "Q"
                            })
                        }

                        this.state.history.push(chess.history({ verbose: true }));
                        console.log("History: ", this.state.history)

                        this.state.historyMoves = this.state.history[this.state.historyCounter]
                        console.log("HistoryMoves: ", this.state.historyMoves)

                        this.state.moves.push(this.state.historyMoves[0].lan)
                        let moves = this.state.moves
                        const movesCombined = moves.flat().map(move => move.slice(0, 4));
                        //let movesJoined = movesCombined.join(',')
                        console.log("Moves: ", movesCombined)

                        this.setState({
                            position: chess.fen(),
                            historyCounter: this.state.historyCounter + 1,
                            moves: movesCombined,
                            isMoved: true,
                        });

                        if (chess.isCheckmate() === true) {
                            this.setState({
                                isCheckmate: true
                            });
                        }
                    }
                    else {
                        console.log("Invalid Move")
                    }
                }
            }

        }
    }

    handleResetPosition = () => {
        const chess = new Chess(this.state.position)
        chess.clear()
        this.setState({
            position: "8/8/3k4/8/8/4K3/8/8 w KQkq - 0 1"
        })
    }

    handleDragOverSquare = (sourceSquare) => {
        console.log("Drag Over Square: ", sourceSquare)
    }

    handleConfirmPositionButton = () => {
        const chess = new Chess()
        chess.load(this.state.position)

        console.log("Chess Position: ", chess.fen())

        console.log("Chess Turn: ", chess.turn())

        console.log("chess.isCheck: ", chess.inCheck())

        if (chess.inCheck() === true || chess.isCheckmate() === true) {
            console.log("Cannot be in check or checkmate when confirming position")
            this.setState({
                showConfirmButton: true,
                showBackButton: false,
                showConfirmSolutionButton: false,
                isSparePieces: true,
                isPositionSetup: true,
                isDeletePieces: true,
                historyCounter: 0
            })
        }
        else {
            this.setState({
                confirmedPosition: this.state.position,
                showConfirmButton: false,
                showBackButton: true,
                showConfirmSolutionButton: true,
                isSparePieces: false,
                isPositionSetup: false,
                isDeletePieces: false,
                historyCounter: 0
            })
        }
    }

    handleBackButton = () => {
        const chess = new Chess()
        chess.load(this.state.confirmedPosition)

        console.log("Chess Position: ", chess.fen())
        console.log("Chess Turn: ", chess.turn())

        this.setState({
            position: this.state.confirmedPosition,
            showConfirmButton: true,
            showBackButton: false,
            showConfirmSolutionButton: false,
            isSparePieces: true,
            isPositionSetup: true,
            isDeletePieces: true,
            historyCounter: 0,
            placementIndex: 0,
            moves: [],
            puzzles: [],
            history: [],
            historyMoves: [],
        })
    }

    handleConfirmSolutionButton = () => {
        if (this.state.isMoved && this.state.isCheckmate) {
            console.log("Confirmed Solution")
            console.log("Sending to Database...")
            this.sendPuzzleToDatabase();

            this.setState({
                isConfirmedSolution: true
            })
        }
        else {
            this.setState({
                showMustBeCheckmate: true,
            })
        }
    }

    handleDropOffBoard = () => {
        console.log("Dropped Off Board!!!!: ")
        this.setState({
            offBoard: "trash"
        })

        console.log("offBoard: ", this.state.offBoard)
    }

    handleStartTutorialButton = () => {
        console.log("Welcome to the Tutorial");

        this.setState({
            isFirstOKButton: true,
            showBackButton: false,
            showConfirmButton: false,
            showConfirmSolutionButton: false,
            showTutorialButton: false,
        })

    }

    handleTutorial = () => {
        const chess = new Chess();
        chess.clear();
        this.setState({
            position: "8/8/3k4/8/8/4K3/8/8 w KQkq - 0 1"
        })

        chess.load("8/8/3k4/8/8/4K3/8/8 w KQkq - 0 1")

        console.log("isOKButton: ", this.state.isFirstOKButton)

        if (this.state.isFirstOKButton === true) {
            setTimeout(() => {
                chess.put({ type: 'p', color: 'w' }, "a2")
                this.setState({
                    position: chess.fen()
                })
            }, 100);

            setTimeout(() => {
                chess.put({ type: 'p', color: 'w' }, "b2")
                this.setState({
                    position: chess.fen()
                })
            }, 500);

            setTimeout(() => {
                chess.put({ type: 'p', color: 'w' }, "c2")
                this.setState({
                    position: chess.fen()
                })
            }, 900);

            setTimeout(() => {
                chess.put({ type: 'p', color: 'w' }, "f2")
                this.setState({
                    position: chess.fen()
                })
            }, 1300);

            setTimeout(() => {
                chess.remove('e3')
                chess.put({ type: 'k', color: 'w' }, "b1")
                this.setState({
                    position: chess.fen()
                })
            }, 1700);

            setTimeout(() => {
                chess.put({ type: 'r', color: 'b' }, "e6")
                this.setState({
                    position: chess.fen()

                })
            }, 2500);

            setTimeout(() => {
                this.setState({
                    isFirstOKButton: false,
                    isSecondOKButton: true,
                    showBackButton: false,
                    showConfirmButton: false,
                    showConfirmSolutionButton: false,
                    showTutorialButton: false,
                })
            }, 3500);
        }
        console.log("isSecondOKButton: ", this.state.isSecondOKButton)
        if (this.state.isSecondOKButton === true) {
            console.log("Welcome to part two of tutorial");
            const chess = new Chess()
            chess.load(this.state.position)

            this.setState({
                position: this.state.position,
                confirmedPosition: this.state.position,
                showConfirmButton: false,
                showBackButton: true,
                showConfirmSolutionButton: true,
                isSparePieces: false,
                isPositionSetup: false,
                isDeletePieces: false,
                showBackButton: false,
                showConfirmButton: false,
                showConfirmSolutionButton: false,
                showTutorialButton: false,
            })

            setTimeout(() => {
                chess.move('f2f4')
                this.setState({
                    position: chess.fen()
                })
            }, 500);

            setTimeout(() => {
                this.setState({
                    position: chess.fen(),
                    isThirdOKButton: true,
                    showBackButton: false,
                    showConfirmButton: false,
                    showConfirmSolutionButton: false,
                    showTutorialButton: false,
                })
            }, 2000);


        }

        console.log("isThirdOKButton: ", this.state.isThirdOKButton)

        if (this.state.isThirdOKButton === true) {
            console.log("Welcome to part three of tutorial");

            const chess = new Chess()
            chess.load(this.state.position)
            this.setState({
                position: chess.fen()
            })

            chess.move('e6e1');
            this.setState({
                position: chess.fen()
            })

            setTimeout(() => {
                this.setState({
                    isFourthOKButton: true,
                    showBackButton: false,
                    showConfirmButton: false,
                    showConfirmSolutionButton: false,
                    showTutorialButton: false,
                })
            }, 1500);
        }

        if (this.state.isFourthOKButton === true) {
            console.log("Welcome to part four of tutorial");
            const chess = new Chess()
            chess.load(this.state.position)
            this.setState({
                position: chess.fen()
            })

            setTimeout(() => {
                this.setState({
                    isFifthOKButton: true,
                    showBackButton: false,
                    showConfirmButton: false,
                    showConfirmSolutionButton: false,
                    showTutorialButton: false,
                })
            }, 100);
        }

        if (this.state.isFifthOKButton === true) {
            window.location.reload()
        }

    }

    handleFirstOKButton = () => {
        this.setState({
            isFirstOKButton: false,
            showBackButton: false,
            showConfirmButton: false,
            showConfirmSolutionButton: false,
            showTutorialButton: false,
        })

        this.handleTutorial()
    }

    handleSecondOKButton = () => {
        this.setState({
            isSecondOKButton: false,
            showBackButton: false,
            showConfirmButton: false,
            showConfirmSolutionButton: false,
            showTutorialButton: false,
        })

        this.handleTutorial()
    }

    handleThirdOKButton = () => {
        this.setState({
            isThirdOKButton: false,
            showBackButton: false,
            showConfirmButton: false,
            showConfirmSolutionButton: false,
            showTutorialButton: false,
        })

        this.handleTutorial()
    }

    handleFourthOKButton = () => {
        this.setState({
            isFourthOKButton: false,
            showBackButton: false,
            showConfirmButton: false,
            showConfirmSolutionButton: false,
            showTutorialButton: false,
        })

        this.handleTutorial()
    }

    handleFifthOKButton = () => {
        this.setState({
            isFifthOKButton: false,
            showBackButton: false,
            showConfirmButton: false,
            showConfirmSolutionButton: false,
            showTutorialButton: false,
        })

        this.handleTutorial()
    }

    handleMustBeCheckmate = () => {
        console.log("Must be checkmate to submit")
        this.setState({
            showMustBeCheckmate: false
        })
    }

    render() {

        return (
            <div className='create'>
                <Navbar />
                {this.state.isFirstOKButton && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Tutorial</h2>
                            <ol class="popup-message-sub">
                                <li>Drag Spare Pieces onto Board</li>
                                <li>Click on Piece to Remove it</li>
                            </ol>
                            <div className="popup-buttons">
                                <button class='popup-button-1' onClick={this.handleFirstOKButton}>OK</button>
                            </div>
                        </div>
                    </div>
                )}

                {this.state.isSecondOKButton && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Tutorial</h2>
                            <ol class="popup-message-sub">
                                <li>Click "Confirm Position" once Satisfied with Position</li>
                                <li>Make a Move with White to Initialize Puzzle</li>
                                <li>Black to Solve All Puzzles</li>
                            </ol>
                            <div className="popup-buttons">
                                <button class='popup-button-1' onClick={this.handleSecondOKButton}>OK</button>
                            </div>
                        </div>
                    </div>
                )}

                {this.state.isThirdOKButton && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Tutorial</h2>
                            <ol class="popup-message-sub">
                                <li>Make Moves with Black to Solve Puzzle</li>
                                <li>If Puzzle is Longer than a Mate in One then Make Subsequent Moves with White</li>
                                <li>After Each White Move, a Black Move Must be Made</li>
                            </ol>
                            <div className="popup-buttons">
                                <button class='popup-button-1' onClick={this.handleThirdOKButton}>OK</button>
                            </div>
                        </div>
                    </div>
                )}

                {this.state.isFourthOKButton && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Tutorial</h2>
                            <ol class="popup-message-sub">
                                <li>Click "Confirm Solution" once the Sequence is Complete</li>
                            </ol>
                            <div className="popup-buttons">
                                <button class='popup-button-1' onClick={this.handleFourthOKButton}>OK</button>
                            </div>
                        </div>
                    </div>
                )}

                {this.state.isFifthOKButton && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Tutorial Over</h2>
                            <div className="popup-buttons">
                                <button class='popup-button-1' onClick={this.handleFifthOKButton}>Create My Own</button>
                            </div>
                        </div>
                    </div>
                )}

                {this.state.showMustBeCheckmate && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2 class="popup-message-main">Wait...</h2>
                            <p class="popup-message--sub">King Must be in Checkmate to Submit Puzzle</p>
                            <div className="popup-buttons">
                                <button class='popup-button-1' onClick={this.handleMustBeCheckmate}>OK</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className='create--chessboard'>

                    <div className='create--info'>

                        <div className='create--info--container'>
                            <div className='create--info--1'>
                                <h1 class='create--title'>Custom Puzzle: Create Mate</h1>
                                {this.state.showConfirmButton && (
                                    <button className='create--button' onClick={this.handleConfirmPositionButton}>Confirm Position</button>
                                )}
                                {this.state.showConfirmButton && <button className='create--button' onClick={this.handleResetPosition}>Reset Position</button>}

                                {this.state.showConfirmSolutionButton && (
                                    <button className='create--button' onClick={this.handleConfirmSolutionButton}>Confirm Solution</button>
                                )}
                                {this.state.showBackButton && (
                                    <button className='create--button' onClick={this.handleBackButton}>Back</button>
                                )}

                                {this.state.isConfirmedSolution && (<PuzzleSubmitted />)}
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
                                orientation='black'
                                width={"500"}
                            />

                            <div className='create--info--2'>
                                <h1 class='create--title'>Need Help?</h1>

                                {this.state.showTutorialButton && (
                                    <button className='create--button' onClick={this.handleStartTutorialButton}>Tutorial</button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}