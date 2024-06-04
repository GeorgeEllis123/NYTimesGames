import React, { useState, useEffect } from 'react';
import WordItem from './WordItem';
import Controls from './Controls';
import Category from './Category';

// Word board and categories
var allwords = [
    { word: 'blue', rownumber: 3 },
    { word: 'light', rownumber: 2 },
    { word: 'mode', rownumber: 3 },
    { word: 'menu', rownumber: 2 },
    { word: 'drink', rownumber: 2 },
    { word: 'coke', rownumber: 0 },
    { word: 'smoke', rownumber: 2 },
    { word: 'meth', rownumber: 0 },
    { word: 'alcohol', rownumber: 0 },
    { word: 'tap', rownumber: 1 },
    { word: 'do', rownumber: 1 },
    { word: 'mill', rownumber: 3 },
    { word: 'bud', rownumber: 3 },
    { word: 'weed', rownumber: 0 },
    { word: 'smash', rownumber: 1 },
    { word: 'hit', rownumber: 1 }
];
const descriptions = ["Drugs", "To Fornicate", '"Can I get a _____"', "Beer Names Shortened"];

// Tracks all guesses for results
var guesses = [];

// Keeps track of which and how many categories have been found
var foundCategories = [];
var numFound = 0;

// Random ending messages
const winMessages = ["So Freaky!", "You a Freak!", "Freaktastic!", "Freaky Boy"];
const lossMessages = ["Too Vanilla", "Virgin", "Not Surprised", "Monkey..."];

const GameBoard = ({ endGame }) => {
    const [lives, setLives] = useState(4);
    const [words, setWords] = useState(allwords);
    const [mistake, setMistake] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [fadeOut, setFadeOut] = useState(false);
    const [flipOutTiles, setFlipOutTiles] = useState(false);
    const [flipInTiles, setFlipInTiles] = useState(false);
    const [gameover, setGameover] = useState(false);
    const [loss, setLoss] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const [finalSelection, setFinalSelection] = useState([]);
    const [shuffleAnimation, setShuffleAnimation] = useState(false);

    // Reveals the board after the player loses
    useEffect(() => {
        if (!revealed && gameover && loss) {
            setTimeout(() => revealBoard(), 1000)
            setRevealed(true);
        }
    }, [gameover]);

    useEffect(() => {
        if (finalSelection.length > 0) {
            foundCategories.push(finalSelection);
            const newWords = words.filter(word => !finalSelection.map(item => item.word).includes(word.word));
            setWords(newWords);
        }

        console.log(finalSelection);
    }, [finalSelection]);

    const revealBoard = () => {
        const wordsCopy = [...words];
        wordsCopy.sort((a, b) => a.rownumber - b.rownumber);
        const rowsRemaining = words.length / 4;

        setFlipOutTiles(true);
        setFlipInTiles(true);
        for (let i = 0; i < rowsRemaining; i++) {
            setTimeout(() => {
                setFinalSelection(wordsCopy.splice(0, 4));
            }, 1000*i) 
        }
        setTimeout(() => endGame(false, guesses), (rowsRemaining+1)*1000);
    }

    // Random ending message
    const getRandomMessage = (type) => {
        if (type === 0) {
            const randomIndex = Math.floor(Math.random() * lossMessages.length);
            return lossMessages[randomIndex];
        } else if (type === 1) {
            const randomIndex = Math.floor(Math.random() * winMessages.length);
            return winMessages[randomIndex];
        }
    }

    // Displays the popup
    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setFadeOut(false);
                setShowPopup(false);
            }, 1000)
        }, 2000)
    };

    // Shuffles the words
    const shuffle = () => {
        setShuffleAnimation(true);
        const shuffledWords = [...words];
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }

        setTimeout(() => setWords(shuffledWords), 400);
        setTimeout(() => setShuffleAnimation(false), 500);
    }

    // Selecting words
    const handleWordClick = (word) => {
        setDisableSubmit(false);

        if (!selectedWords.includes(word) && selectedWords.length < 4 ) {
            setSelectedWords([...selectedWords, word]);
        } else if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word));
        }
    };

    // All effects during a currect guess
    const handleCorrectGuess = (foundWords) => {
        numFound += 1;
        setFlipOutTiles(true);
        setTimeout(() => {
            setFlipOutTiles(false);
            foundCategories.push(foundWords);
            setWords(words.filter(word => !foundWords.map(item => item.word).includes(word.word)));
            setFlipInTiles(true);
            setSelectedWords([]);
            setTimeout(() => setFlipInTiles(false), 1000);
        }, 1000)
    }

    // Checks if the guess is one away
    function oneAway(words) {
        const firstCount = words.filter(word => word.rownumber === words[0].rownumber).length;
        const secondCount = words.filter(word => word.rownumber === words[1].rownumber).length;

        if (firstCount >= 3 || secondCount >= 3) {
            return true;
        }
    }

    // Validates the guess and updates the states accordingly
    const validateGroup = () => {
        setDisableSubmit(true);
        
        selectedWords.sort()

        const foundWords = selectedWords.map(word => words.find(item => item.word === word));
        const isGroupCorrect = foundWords.every(word => word.rownumber === foundWords[0].rownumber);

        const alreadyGuessed = guesses.some(guess => {
            const sortedGuess = guess.slice().sort();
            return sortedGuess.length === selectedWords.length &&
                sortedGuess.every((word, index) => word.word === foundWords[index].word);
        });

        if (isGroupCorrect && selectedWords.length === 4) {
            handleCorrectGuess(foundWords);
        } else if (alreadyGuessed) {
            showPopupMessage("Already Guessed");
        } else {
            setMistake(true);
            setTimeout(() => {
                setMistake(false);
            }, 500);

            if (oneAway(foundWords)) {
                showPopupMessage("One Away");
            }

            setLives(prevLives => {
                const newLives = prevLives - 1;

                if (newLives <= 0) {
                    setLoss(true);
                    setGameover(true);
                    setSelectedWords([]);
                    showPopupMessage(getRandomMessage(0));
                } 

                return newLives;
            });
        }

        if (!alreadyGuessed) {
            guesses.push(foundWords);
        }

        if (numFound === 4) {
            setGameover(true);
            showPopupMessage(getRandomMessage(1));
            setTimeout(() => endGame(true, guesses), 1500);
        }
    };

    return (
        <div className="gameboardContainer animate__animated animate__fadeIn">
            <p className="instruction">Create four groups of four!</p>

            {showPopup && <div className={`animate__animated 
                                        ${(fadeOut && !loss) ? "animate__fadeOut" : "animate__fadeIn"} 
                                        ${(loss) ? "animate__hinge" : ""}
                                        popup`}
            >{popupMessage}</div>}

            <div className={`found-grid ${(words.length !== 0 && foundCategories.length !== 0) ? 'addBottomMargin' : ''}`}>
                {foundCategories.map(row =>
                    <Category
                        key={row[0].rownumber}
                        description={descriptions[row[0].rownumber]}
                        words={row} />
                )}
            </div>

            <div className={`animate__animated word-grid ${shuffleAnimation ? "animate__shakeY" : ""}`}>
                {words.map(word => (
                    <WordItem
                        key={word.word}
                        word={word.word}
                        onClick={handleWordClick}
                        isSelected={selectedWords.includes(word.word)}
                        isInFinalSelection={finalSelection.some(selected => { return selected.word === word.word})}
                        fadeIn={flipInTiles}
                        fadeOut={flipOutTiles}
                        mistake={mistake}
                    />
                ))}
            </div>
            <Controls
                selectedWords={selectedWords}
                onValidate={validateGroup}
                onDeselect={() => setSelectedWords([])}
                onShuffle={shuffle}
                lives={lives}
                disableSubmit={disableSubmit}
                gameover={gameover}
            />
        </div>
    );
};

export default GameBoard;
