import React from 'react';
import './KeyBoard.css';

export default function KeyBoard({ setKeyPressed, keyboardPainter, setKeyboardPainter,gameEnded }) { 
    const keysRef = React.useRef(document.getElementsByClassName('key'));// Reference to the keyboard element
    
    React.useEffect(() => {
        //^ paints the keyboard with the colors of the letters
        for (let i = 0; i < keysRef.current.length; i++) {
            for (let j = 0; j < keyboardPainter.length; j++) {
                if (keysRef.current[i].innerText === keyboardPainter[j].letter) {
                    keysRef.current[i].classList.add(keyboardPainter[j].color);
                }
            }
        }

    }, [keyboardPainter, setKeyboardPainter])// Reference to the keyboard element

    React.useEffect(() => { 
        //^ removes the colors of the letters from the keyboard when the game ends
        if (gameEnded) {
            setTimeout(() => {
                
                for (let i = 0; i < keysRef.current.length; i++) {
                    if(keysRef.current[i].classList.contains('green')) {
                        keysRef.current[i].classList.remove('green');
                    }
                    if(keysRef.current[i].classList.contains('yellow')) {
                        keysRef.current[i].classList.remove('yellow');
                    }
                    if (keysRef.current[i].classList.contains('gray')) {
                        keysRef.current[i].classList.remove('gray');
                    }
                }
            }, 6000);
        }
    },[gameEnded])// Reference to the keyboard element

    function handleKeyDown(e) { //! שומר את האות שנלחצה ע"י שימוש בעכבר
        if (e.nativeEvent.pointerType === 'mouse') {
            setKeyPressed(e.target.innerText);
            e.target.classList.add('animate');
            setTimeout(() => {
                e.target.classList.remove('animate');
            }, 400);
        }
    }


    return (
        <div>
            <div className="keyBoard" >
                <div className="keyRow">
                    <button className="key" onClick={(e) => handleKeyDown(e)}>Q</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>W</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>E</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>R</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>T</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>Y</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>U</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>I</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>O</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>P</button>
                </div>
                <div className="keyRow">
                    <button className="key" onClick={(e) => handleKeyDown(e)}>A</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>S</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>D</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>F</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>G</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>H</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>J</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>K</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>L</button>
                </div>
                <div className="keyRow">
                    <button className="key big" id='enter' onClick={(e) => handleKeyDown(e)}>⇲</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>Z</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>X</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>C</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>V</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>B</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>N</button>
                    <button className="key" onClick={(e) => handleKeyDown(e)}>M</button>
                    <button className="key big" id='backspace' onClick={(e) => handleKeyDown(e)}>⇚</button>
                </div>
            </div>
        </div>
    )
}

