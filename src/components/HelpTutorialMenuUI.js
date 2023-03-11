import React from "react";
import { Link } from "react-router-dom";

export default class HelpTutorialMenuUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    componentDidMount() {

    };

    render() {
        return (
            <div classname = "help">
                <Link to="/">
                        <button>Back</button>
                </Link>
                <h1 class = "title">Help and About us</h1>

                <h1 class = "body">Piece movement and capturing</h1>
                <p class = "body">Pawn: Pawns can move forward one space and can only capture diagonally forward one space. If a pawn has not moved yet, it is able to move forward two spaces instead of one.</p>
                <p class = "body">Knight: The knight can move horizontally for 2 spaces followed by vertically 1 space, or vertically 2 spaces followed by horizontally 1 space unless its destination is taken by a friendly piece (think of an “L” shape). The knight is allowed to “jump” other pieces therefore its movement cannot be blocked. It can capture any opposing piece where it lands.</p>
                <p class = "body">Bishop: Bishops can move diagonally in any direction until they hit another piece. They can capture the first opposing piece in their path. Bishops are unique because a bishop on a light square can never move onto a dark square and vice versa.</p>
                <p class = "body">Rook: Bishops can move laterally in any direction until they hit another piece. They can capture the first opposing piece in their path.</p>
                <p class = "body">King: Kings can move one space in any direction unless blocked by another piece. They can capture any opposing piece in their path. The king cannot move into a position that would place it in check or checkmate. Capturing the king is how you win the game.</p>
                <p class = "body">Queen: Queens can move laterally and diagonally in all directions until blocked by another piece. They can capture any opposing piece in their path.</p>

                <h1 class = "body">How to check and checkmate</h1>
                
            </div>
        );
    }
}