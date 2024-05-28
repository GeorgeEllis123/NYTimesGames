import React, { useState } from 'react';
import WordItem from './WordItem';
import Controls from './Controls';
import Category from './Category';

var allwords = [
    { word: 'blue', rownumber: 3 },
    { word: 'light', rownumber: 2 },
    { word: 'mode', rownumber: 3 },
    { word: 'menu', rownumber: 2 },
    { word: 'coke', rownumber: 0 },
    { word: 'alcohol', rownumber: 0 },
    { word: 'smoke', rownumber: 2 },
    { word: 'meth', rownumber: 0 },
    { word: 'drink', rownumber: 2 },
    { word: 'tap', rownumber: 1 },
    { word: 'do', rownumber: 1 },
    { word: 'mill', rownumber: 3 },
    { word: 'bud', rownumber: 3 },
    { word: 'weed', rownumber: 0 },
    { word: 'smash', rownumber: 1 },
    { word: 'hit', rownumber: 1 }
];

const descriptions = ["Drugs", "To Fornicate", '"Can I get a _____"', "Beer Names Shortened"];

var guesses = [];

var foundCategories = [];

var numFound = 0;

const GameBoard = ({ selectedWords, setSelectedWords, endGame }) => {
    const [lives, setLives] = useState(4);
    const [words, setWords] = useState(allwords);
    const [mistake, setMistake] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");


    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 1500);
    };

    const shuffle = () => {
        const shuffledWords = [...words];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }
        setWords(shuffledWords);
    }

    const handleWordClick = (word) => {
        if (!selectedWords.includes(word) && selectedWords.length < 4 ) {
            setSelectedWords([...selectedWords, word]);
        } else if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word));
        }
    };

    function oneAway(words) {
        const firstCount = words.filter(word => word.rownumber === words[0].rownumber).length;
        const secondCount = words.filter(word => word.rownumber === words[1].rownumber).length;

        if (firstCount >= 3 || secondCount >= 3) {
            return true;
        }
    }

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
            setMistake(true);
            setTimeout(() => {
                setMistake(false);
                setSelectedWords([]);
            }, 500);

            if (oneAway(foundWords)) {
                showPopupMessage("One Away");
            }

            setLives(prevLives => {
                const newLives = prevLives - 1;

                if (newLives <= 0) {
                    showPopupMessage("Too Vanilla");
                    setTimeout(() => endGame(false, guesses), 1500);
                } 

                return newLives;
            });
        }

        if (!alreadyGuessed) {
            guesses.push(foundWords);
        }

        if (numFound === 4) {
            showPopupMessage("So Freaky!");
            setTimeout(() => endGame(true, guesses), 1500);
        }
    };

    return (
        <div className="gameboardContainer">
            <p style={{ fontSize: '25px', textAlign: 'center'}}>Create four groups of four!</p>
            {showPopup && <div className="animate__animated animate__fadeIn popup">{popupMessage}</div>}
            <div className={`found-grid ${(words.length !== 0 && guesses.length !== 0) ? 'addBottomMargin' : ''}`}>
                {foundCategories.map(row =>
                    <Category key={row[0].rownumber} description={descriptions[row[0].rownumber]} words={row} />
                )}
            </div>
            <div className="word-grid">
                {words.map(word => (
                    <WordItem key={word.word} word={word.word} onClick={handleWordClick} isSelected={selectedWords.includes(word.word)} mistake={mistake} />
                ))}
            </div>
            <Controls selectedWords={selectedWords} onValidate={validateGroup} onDeselect={() => setSelectedWords([])} onShuffle={shuffle} lives={lives} />
        </div>
    );
};

export default GameBoard;
