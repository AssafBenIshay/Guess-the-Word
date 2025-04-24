import React from 'react';
import GameBoardLetter from './GameBoardRow/GameBoardLetter';


export default function GameBoardRow({ letters, setErrorAnimation, errorAnimation, winningWord ,setKeyboardPainter }) {
    const gameBoardRowRef = React.useRef(null);
    const [letterClass, setLetterClass] = React.useState(['', '', '', '', '']); // State to manage the class of each letter

    React.useEffect(() => {//!* This effect is triggered when the errorAnimation state changes.
        if (errorAnimation) {
            gameBoardRowRef.current.classList.add('errorAnimation');
            setTimeout(() => {
                setErrorAnimation(false);
                gameBoardRowRef.current.classList.remove('errorAnimation');
            }, 500)
        }
    }, [errorAnimation, setErrorAnimation])

    React.useEffect(() => {
        const letterClasses = letters.map((letter, index) => {
            if (winningWord[index].toUpperCase() === letter) {
                setKeyboardPainter((prev) => [...prev, {color:'green',letter:`${letter}`}]); // Update the keyboard painter state with the correct letter
                return 'green'; // Correct letter in the correct position
            } else if (winningWord.toUpperCase().includes(letter)) {
                setKeyboardPainter((prev) => [...prev, {color:'yellow',letter:`${letter}`}]); // Update the keyboard painter state with the correct letter
                return 'yellow'; // Correct letter in the wrong position
            } else {
                setKeyboardPainter((prev) => [...prev, {color:'gray',letter:`${letter}`}]); // Update the keyboard painter state with the incorrect letter
                return 'gray'; // Incorrect letter
            }
        });
        setLetterClass(letterClasses); // Update the letterClass state with the new classes
    }, [])


    return (
        <div className="gameBoardRow" ref={gameBoardRowRef} >
            {letterClass.map((letterClass, index) => {
                return (
                    <div className="gameBoardLetter" key={index}>
                        <GameBoardLetter
                            letter={letters[index]}
                            letterClass={letterClass}
                            setKeyboardPainter={setKeyboardPainter}
                        />
                    </div>
                )
            })}
        </div>
    )
}