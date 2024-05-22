import React from 'react';
import WordItem from './WordItem';
import SelectedWords from './SelectedWords';

const words = ['apple', 'banana', 'grape', 'orange', 'car', 'bike', 'bus', 'train']; // Example words

const GameBoard = ({ selectedWords, setSelectedWords, setFeedback, feedback, endGame }) => {
    const handleWordClick = (word) => {
        if (!selectedWords.includes(word) && selectedWords.length < 4) {
            setSelectedWords([...selectedWords, word]);
        } else if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word));
        }
    };

    const validateGroup = () => {
        const fruits = ['apple', 'banana', 'grape', 'orange'];
        if (selectedWords.every(word => fruits.includes(word)) && selectedWords.length === 4) {
            setFeedback('Correct Group!');
            endGame(true);
        } else {
            setFeedback('Try Again!');
        }
    };

    return (
        <div>
            <div className="word-grid">
                {words.map(word => (
                    <WordItem key={word} word={word} onClick={handleWordClick} />
                ))}
            </div>
            <SelectedWords selectedWords={selectedWords} onValidate={validateGroup} />
            <div className="feedback">{feedback}</div>
        </div>
    );
};

export default GameBoard;
