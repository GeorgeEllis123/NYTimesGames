import React from 'react';
import WordItem from './WordItem';
import SelectedWords from './SelectedWords';
import Category from './Category';

var words = [
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

var foundCategories = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

words = shuffleArray(words);

var found = [false, false, false, false]; // indexs match to groups
var numFound = 0;

var lives = 4;

const GameBoard = ({ selectedWords, setSelectedWords, setFeedback, feedback, endGame }) => {
    const handleWordClick = (word) => {
        const isFound = found[words.find(item => item.word === word).rownumber];
        if (!selectedWords.includes(word) && selectedWords.length < 4 && !isFound ) {
            setSelectedWords([...selectedWords, word]);
        } else if (selectedWords.includes(word)) {
            setSelectedWords(selectedWords.filter(selectedWord => selectedWord !== word));
        }
    };

    const validateGroup = () => {
        const foundWords = selectedWords.map(word => words.find(item => item.word === word));
        var selectedIndices = [];
        foundWords.forEach(word => selectedIndices.push);
        const isGroupCorrect = selectedIndices.every(index => index === selectedIndices[0]);
        
        if (isGroupCorrect && selectedWords.length === 4) {
            const index = words.find(item => item.word === selectedWords[0]).rownumber;
            found[index] = true;
            numFound += 1;
            foundCategories.push(foundWords);
            words = words.filter(word => !foundWords.map(item => item.word).includes(word.word));
            setFeedback('Correct Group!');
            setSelectedWords([]);
        } else {
            lives -= 1;
            setFeedback('Try Again!');
        }

        if (lives === 0) {
            endGame(false);
        } else if (numFound === 4) {
            endGame(true);
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
            <SelectedWords selectedWords={selectedWords} onValidate={validateGroup} lives={lives} />
            <div className="feedback">{feedback}</div>
        </div>
    );
};

export default GameBoard;
