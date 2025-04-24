import WordDB from './assets/wordDB.json';

export default function checkSelectedWord(selectedWord) {
    //* checking if the word is in the database

    let word = selectedWord.join('').toLowerCase();
    const theWord = WordDB.filter(el => el === word);


    if (WordDB.includes(theWord[0])) {
        return theWord[0];
    }

    return false;

};
