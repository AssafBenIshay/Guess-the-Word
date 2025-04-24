import React from 'react';

export default function GameBoardLetter({letter, letterClass}) {
    
     return(
         <div className= {`gameBoardLetter ${letterClass}`}>
                <h1>{letter}</h1>
            </div>
    )
}