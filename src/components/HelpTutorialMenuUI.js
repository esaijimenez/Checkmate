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
            <body>
                <div classname="help">
                    <Link to="/">
                        <button>Back</button>
                    </Link>
                    <h1 class = "title">Help and About us</h1>

                    <h1>Piece movement and capturing</h1>
                    <p>Pawn: Pawns can move forward one space and can only capture diagonally forward one space. If a pawn has not moved yet, it is able to move forward two spaces instead of one.</p>
                    <p>Standard Pawn Movement:</p>
                    <img src = "images\tutorial\Pawn1.PNG" alt = "pawn1"/>
                    <img src = "images\tutorial\Pawn2.PNG" alt = "pawn2"/>
                    <p>A pawn that has not moved yet moves two spaces:</p>
                    <img src = "images\tutorial\Pawn3.PNG" alt = "pawn3"/>
                    <img src = "images\tutorial\Pawn4.PNG" alt = "pawn4"/>
                    <p>A pawn capturing an enemy pawn diagnally</p>
                    <img src = "images\tutorial\Pawn5.PNG" alt = "pawn5"/>
                    <img src = "images\tutorial\Pawn6.PNG" alt = "pawn6"/>

                    <p>Knight: The knight can move horizontally for 2 spaces followed by vertically 1 space, or vertically 2 spaces followed by horizontally 1 space unless its destination is taken by a friendly piece (think of an “L” shape). The knight is allowed to “jump” other pieces therefore its movement cannot be blocked. It can capture any opposing piece where it lands.</p>
                    <p>A knight captures an enemy pawn:</p>
                    <img src = "images\tutorial\Knight1.PNG" alt = "knight1"/>
                    <img src = "images\tutorial\Knight2.PNG" alt = "knight2"/>

                    <p>Bishop: Bishops can move diagonally in any direction until they hit another piece. They can capture the first opposing piece in their path. Bishops are unique because a bishop on a light square can never move onto a dark square and vice versa.</p>
                    <p>A bishop moves diagnally to capture an opposing knight:</p>
                    <img src = "images\tutorial\Bishop1.PNG" alt = "bishop1"/>
                    <img src = "images\tutorial\Bishop2.PNG" alt = "bishop2"/>
                    
                    <p>Rook: Bishops can move laterally in any direction until they hit another piece. They can capture the first opposing piece in their path.</p>
                    <p>A rook moves laterally to capture an opposing pawn:</p>
                    <img src = "images\tutorial\Rook1.PNG" alt = "rook1"/>
                    <img src = "images\tutorial\Rook2.PNG" alt = "rook2"/>
                    
                    <p>King: Kings can move one space in any direction unless blocked by another piece. They can capture any opposing piece in their path. The king cannot move into a position that would place it in check or checkmate. Capturing the king is how you win the game.</p>
                    <p>A king escapes check by capturing an opposing pawn diagnally. It is unable to capture the pawn directly above as doing so would place it back into check.</p>
                    <img src = "images\tutorial\King1.PNG" alt = "king1"/>
                    <img src = "images\tutorial\King2.PNG" alt = "king2"/>
                    
                    <p>Queen: Queens can move laterally and diagonally in all directions until blocked by another piece. They can capture any opposing piece in their path.</p>
                    <p>A queen moves diagnally to capture a bishop, and then vertically to capture a pawn:</p>
                    <img src ="images\tutorial\Queen1.PNG" alt = "queen1"/>
                    <img src ="images\tutorial\Queen2.PNG" alt = "queen2"/>

                    <h1>How to check and checkmate</h1>

                    <p>Check: Check is the term used to describe a situation where unless the checked player responds immediately their king will be taken, losing them the game. A player who has been checked must spend their next move either moving their king out of check, blocking check with another piece, or capturing the piece putting the king in check.</p>
                    <p>Light side has the opposing king in check, but the king is able to respond:</p>
                    <img src = "images\tutorial\Check.PNG" alt = "check"/>

                    <p>Checkmate: Checkmate is the term used to describe the end of the game. A player in checkmate is in a position where they are unable to prevent their king from being captured next turn. Placing your opponent in checkmate means you have won the game.</p>
                    <p>Light side has the oppposing king in check and they are unable to respond, making this checkmate: </p>
                    <img src = "images\tutorial\Checkmate.PNG" alt = "checkmate"/>


                    <h1>Other Rules</h1>
                    <p>Castling: Castling Allows you to move your rooks and king at the same time. If your king and one of your rooks have not moved yet, and there are no pieces in between your king and rook, then you are able to castle. When castling, your king moves two spaces towards the rook, and the rook moves to the space on the other side of the king. If the king’s movement would put him in check at any point on its movement path, it is unable to castle.</p>
                    <img src = "images\tutorial\Castling1.PNG" alt = "castling1"/>
                    <img src = "images\tutorial\Castling2.PNG" alt = "castling2"/>
                    
                    <p>En Passant: When an opposing pawn moves two spaces forward, and you have a pawn that is directly beside it, you can move your piece diagonally behind the opposing pawn, capturing it as if it had only moved forward one space instead of two.</p>

                    <h1>About Us</h1>
                    <p>Checkmate is a website for practicing chess puzzles made for our Senior Capstone projects while pursuing our bachelor’s degree. This website was made by Esai Jimenez, Autumn Hale, and Trentin Barnhart during the spring semester of 2023.</p>
                </div>
            </body>
        );
    }
}