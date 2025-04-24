import React from 'react';

export default function Typed({ userWord }) {

    return (
        <div div className="typed" >
            <span className="typedLetter" >{userWord[0] || ""}</span>
            <span className="typedLetter" >{userWord[1] || ""}</span>
            <span className="typedLetter" >{userWord[2] || ""}</span>
            <span className="typedLetter" >{userWord[3] || ""}</span>
            <span className="typedLetter" >{userWord[4] || ""}</span>

        </div >
    )
}