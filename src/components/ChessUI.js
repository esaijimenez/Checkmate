import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';


const ChessUI = () => {




    return (
        <div className="Chess">

            <Chessboard
                position={"r2q1rk1\/pp2b1p1\/2p3P1\/3n1p2\/3P4\/P1NQ4\/1PKB1PP1\/7R b - - 4 20"} />
        </div>
    );
};
export default ChessUI