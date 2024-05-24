import React, { useState } from 'react';
import WordItem from './WordItem';
import Controls from './Controls';
import Category from './Category';

var allwords = [
    { word: 'apple', rownumber: 0 },
    { word: 'banana', rownumber: 0 },
    { word: 'grape', rownumber: 0 },
    { word: 'orange', rownumber: 0 },
    { word: 'car', rownumber: 1 },
    { word: 'bike', rownumber: 1 },
    { word: 'bus', rownumber: 1 },
    { word: 'train', rownumber: 1 },
    { word: 'dog', rownumber: 2 },
    { word: 'cat', rownumber: 2 },
    { word: 'lion', rownumber: 2 },
    { word: 'bird', rownumber: 2 },
    { word: 'juice', rownumber: 3 },
    { word: 'water', rownumber: 3 },
    { word: 'soda', rownumber: 3 },
    { word: 'coffee', rownumber: 3 }
];

const descriptions = ["Fruits", "Transportation", "Animals", "Beverages"];

var guesses = [];

var foundCategories = [];

var numFound = 0;

const GameBoard = ({ selectedWords, setSelectedWords, endGame }) => {
    const [lives, setLives] = useState(4);
    const [words, setWords] = useState(allwords);

    const shuffle = () => {
        const shuffledWords = [...words];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }
        setWords(shuffledWords);
    }

    const deselectAll = () => {
        setSelectedWords([]);
    }

    const handleWordClick = (word) => {
        if (!selectedWords.includes(word) && selectedWords.length < 4 ) {
            setSelectedWords([...selectedWords, word]);
        } else if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word));
        }
    };

    const validateGroup = () => {
        selectedWords.sort()

        const foundWords = selectedWords.map(word => words.find(item => item.word === word));
        const isGroupCorrect = foundWords.every(word => word.rownumber === foundWords[0].rownumber);

        const alreadyGuessed = guesses.some(guess => {
            const sortedGuess = guess.slice().sort();
            return sortedGuess.length === selectedWords.length &&
                sortedGuess.every((word, index) => word.word === foundWords[index].word);
        });

        if (isGroupCorrect && selectedWords.length === 4) {
            numFound += 1;
            foundCategories.push(foundWords);
            setWords(words.filter(word => !foundWords.map(item => item.word).includes(word.word)));
            setSelectedWords([]);
        } else if (alreadyGuessed) {
            console.log("Already guessed");
        } else {
            setLives(lives-1);
        }

        if (!alreadyGuessed) {
            guesses.push(foundWords);
        }

        if (lives === 0) {
            endGame(false, guesses);
        } else if (numFound === 4) {
            endGame(true, guesses);
        }
    };

    return (
        <div>
            <p style={{ fontSize: '20px', textAlign: 'center'}}>Create four groups of four!</p>
            <div className="found-grid">
                {foundCategories.map(row =>
                    <Category key={row[0].rownumber} description={descriptions[row[0].rownumber]} words={row} />
                )}
            </div>
            <div className="word-grid">
                {words.map(word => (
                    <WordItem key={word.word} word={word.word} onClick={handleWordClick} isSelected={selectedWords.includes(word.word)} />
                ))}
            </div>
            {/* <button className="shuffle" onClick={shuffleWords}>Shuffle</button> */}
            <Controls selectedWords={selectedWords} onValidate={validateGroup} onDeselect={deselectAll} onShuffle={shuffle} lives={lives} />
        </div>
    );
};

export default GameBoard;
