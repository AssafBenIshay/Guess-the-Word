import React from 'react';
import './App.css'
import KeyBoard from './components/KeyBoard';
import HKDown from './handleKeyDown.js';
import GameBoard from './components/GameBoard';
import CSWord from './checkSelectedWord.js'; // this function is used to check if the word is correct
import WordDB from './assets/wordDB.json'; // this is the word database
import Typed from './components/Typed.jsx';

export default function App() {
  const [winningWord, setWinningWord] = React.useState(WordDB[Math.floor(Math.random() * WordDB.length)]); //* this state is used to store the random word that the user is trying to guess
  const [keyPressed, setKeyPressed] = React.useState(''); //* this state is used to store the key that was pressed
  const [userWord, setUserWord] = React.useState([]);//* this state is used to store the word that the user is trying to guess
  const [userGuesses, setUserGuesses] = React.useState([]); //* this state is used to store the guesses that the user has made
  const [errorAnimation, setErrorAnimation] = React.useState(false); //!anyware where errorAnimation is set to true,
  //!the Row 'nope' animation will be triggered and automatically set off
  const [errorMessage, setErrorMessage] = React.useState(''); //* this state is used to store the error message that will be displayed to the user
  const [keyboardPainter, setKeyboardPainter] = React.useState([]); //* this state is used to store the keyboard painter
  const [gameEnded, setGameEnded] = React.useState(false); //* this state is used to store the game ended state
  const errorMessageRef = React.useRef(); //* this ref is used to store the error message element

  React.useEffect(() => {
    if (gameEnded)
      setTimeout(() => {
        setGameEnded(false);
        setWinningWord(WordDB[Math.floor(Math.random() * WordDB.length)]);
        setUserGuesses([]);
        setUserWord([]);
        setErrorMessage('');
        setErrorAnimation(false);
        setKeyboardPainter([]);
      }, 6000);
  }, [gameEnded])


  React.useEffect(() => {
    if (errorMessage) {
      errorMessageRef.current.classList.add('error-message');
      errorMessageRef.current.classList.add('error-animate');
      setTimeout(() => {
        setErrorMessage('');
        errorMessageRef.current.classList.remove('error-message');
        errorMessageRef.current.classList.remove('error-animate');
      }, 3000)
    }
  }, [errorMessage])

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(e) {
      if (e.key.length === 1 && e.key.match(/[A-Z]/i)) {
        setKeyPressed(e.key.toUpperCase());
      } else if (e.key === 'Backspace') {
        setKeyPressed('⇚');
      } else if (e.key === 'Enter') {
        setKeyPressed('⇲');
      }
      HKDown(e);//* this function is used to add the animation to the button that was pressed
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }// setUserWord((prev) => [...prev, mousePressedKey])
  }, []);

  React.useEffect(() => {
    if (keyPressed === '⇲') {
      if (userWord.length < 5) {
        setErrorMessage('word is not 5 letters long');
        setErrorAnimation(true); //~the word is not 5 letters long
      } else if (userWord.length === 5) {
        let isTheWordInTheDB = CSWord(userWord);

        if (isTheWordInTheDB) {
          if (userGuesses.includes(isTheWordInTheDB.toLocaleUpperCase())) {
            setErrorMessage('you already guessed this word');
            setErrorAnimation(true);
          } else {
            setUserGuesses((prev) => [...prev, isTheWordInTheDB.toUpperCase()]);
          }

        } else {
          setErrorAnimation(true); //~the word is not in the word list
          setErrorMessage('the current word is NOT in the DB'); //~word is not in the word list
        }
        setUserWord([]);
      }
      setKeyPressed('');

    } else if (keyPressed === '⇚') {
      setUserWord((prev) => prev.slice(0, -1));
      setKeyPressed('');
    } else if (keyPressed.match(/[A-Z]/i)) {
      if (userWord.length < 5) {
        setUserWord((prev) => [...prev, keyPressed]);
      } else {
        setErrorMessage('word is already 5 letters long');
      }
      setKeyPressed('');
    }

  }, [keyPressed, userWord]);

  React.useEffect(() => { }, [userGuesses]);
  React.useEffect(() => {
    if (userGuesses.length > 0) {
      if (userGuesses[userGuesses.length - 1] === winningWord.toUpperCase()) {
        setErrorMessage('You have won!');
      }
    }
  }, [userGuesses]);


  return (
    <div className="App" >
      <h1 style={{ margin: '0px' }}>Guess the Word</h1>
      <div className="game">
        <GameBoard
          setErrorAnimation={setErrorAnimation}
          errorAnimation={errorAnimation}
          userGuesses={userGuesses}
          winningWord={winningWord}
          setKeyboardPainter={setKeyboardPainter}
          errRef={errorMessageRef}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setGameEnded={setGameEnded}

        />
        <div style={{ minHeight: '100px' }}>
          {errorMessage ? <p ref={errorMessageRef}>{errorMessage}</p> :
            <Typed
              keyPressed={keyPressed}
              userWord={userWord}
              errorMessage={errorMessage}
            />}

        </div>
        <KeyBoard
          setKeyPressed={setKeyPressed}
          setUserWord={setUserWord}
          keyboardPainter={keyboardPainter}
          setKeyboardPainter={setKeyboardPainter}
          gameEnded={gameEnded}
        />
      </div>
      <div className="footer">
        <p style={{ color: 'transparent' }}>{winningWord.toUpperCase()}</p>
        <p>Made by <a href="https://ben-ishay-assaf.vercel.app/" target="_blank" rel="noopener noreferrer">Ben Ishay Assaf</a></p>
      </div>
    </div>
  )
}