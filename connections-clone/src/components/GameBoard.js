import React from 'react';
import WordItem from './WordItem';
import SelectedWords from './SelectedWords';

const words = [['apple',0], ['banana',0], ['grape',0], ['orange',0],
    ['car',1], ['bike',1], ['bus',1], ['train',1],
    ['dog',2], ['cat',2], ['lion',2], ['bird',2],
    ['juice',3], ['water',3], ['soda',3], ['coffee',3]];

var found = [false, false, false, false]; // indexs match to groups

var lives = 4;

const GameBoard = ({ selectedWords, setSelectedWords, setFeedback, feedback, endGame }) => {
    const handleWordClick = (word) => {
        const isFound = found[words.find(item => item[0] === word)[1]]
        if (!selectedWords.includes(word) && selectedWords.length < 4 && !isFound ) {
            setSelectedWords([...selectedWords, word]);
        } else if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word));
        }
    };

    const validateGroup = () => {
        const selectedIndices = selectedWords.map(word => words.find(item => item[0] === word)[1]);
        const isGroupCorrect = selectedIndices.every(index => index === selectedIndices[0]);
        
        if (isGroupCorrect) {
            const index = words.find(item => item[0] === selectedWords[0])[1];
            found[index] = true;
            setFeedback('Correct Group!');
            setSelectedWords([]);
        } else {
            lives -= 1;
            setFeedback('Try Again!');
        }

        if (lives === 0) {
            endGame(false);
        } else if (found.every(row => row === true)) {
            endGame(true);
        }
    };

    return (
        <div>
            <div className="word-grid">
                {words.map(word => (
                    <WordItem key={word[0]} word={word[0]} onClick={handleWordClick} isSelected={selectedWords.includes(word[0])} isFound={found[word[1]]} />
                ))}
            </div>
            <SelectedWords selectedWords={selectedWords} onValidate={validateGroup} lives={lives} />
            <div className="feedback">{feedback}</div>
        </div>
    );
};

export default GameBoard;
