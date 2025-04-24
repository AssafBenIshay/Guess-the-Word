import React from 'react';
import './GameBoard.css';
import GameBoardRow from './GameBoard/GameBoardRow';


export default function GameBoard({ setErrorAnimation, errorAnimation,
    userGuesses, winningWord, setKeyboardPainter, errorMessage, setErrorMessage, errRef,setGameEnded }) {
    const gameBoardRef = React.useRef(null);
    React.useEffect(() => {
        if (winningWord.toUpperCase() === userGuesses[userGuesses.length - 1]) {
            setGameEnded(true);
            if (errorMessage) {
                errRef.current.classList.add('win-style');
                setTimeout(() => {
                    setErrorMessage('');
                    errRef.current.classList.remove('win-style');
                }, 6000)
            }
        }
    }, [errorMessage])


    React.useEffect(() => {
        //^ if the user guessed the word correctly, animate the letters
        let GBRef = gameBoardRef.current.getElementsByClassName('gameBoardLetter');

        if (winningWord.toUpperCase() === userGuesses[userGuesses.length - 1]) {
            setTimeout(() => {

                for (let i = 0; i < GBRef.length; i++) {
                    GBRef[i].style.backgroundColor = 'rebbecaPurple';
                    GBRef[i].style.animationDelay = `${i * 0.05}s`;
                    GBRef[i].classList.add('winningWordAnimation');
                }
            }, 1000);
        }

    }, [userGuesses, winningWord])// Reference to the game board element


    return (
        <div className="gameBoard" ref={gameBoardRef}>
            {
                userGuesses.map((guess, index) => {
                    return (
                        <GameBoardRow
                            key={index}
                            winningWord={winningWord}
                            letters={guess.split('')}
                            setErrorAnimation={setErrorAnimation}
                            errorAnimation={errorAnimation}
                            setKeyboardPainter={setKeyboardPainter}
                            userGuesses={userGuesses}
                        />
                    )
                })
            }

        </div>
    )
}