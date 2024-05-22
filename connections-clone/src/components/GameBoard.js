import React from 'react';
import WordItem from './WordItem';
import SelectedWords from './SelectedWords';

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
    const reorder = (selected) => {
        var temp = words.slice(0, (numFound - 1) * 4); // Save previous order
        var remaining = words.slice((numFound - 1) * 4); // Save previous order
        temp.push(...selected); // Add new row
        remaining = remaining.filter(word => !selected.map(item => item.word).includes(word.word));
        remaining.forEach(word => temp.push(word));
        words = temp;
    }

    const handleWordClick = (word) => {
        const isFound = found[words.find(item => item.word === word).rownumber]
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
            setFeedback('Correct Group!');
            reorder(foundWords);
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
            <div className="word-grid">
                {words.map(word => (
                    <WordItem key={word.word} word={word.word} group={word.rownumber} onClick={handleWordClick} isSelected={selectedWords.includes(word.word)} isFound={found[word.rownumber]} />
                ))}
            </div>
            {/* <button className="shuffle" onClick={shuffleWords}>Shuffle</button> */}
            <SelectedWords selectedWords={selectedWords} onValidate={validateGroup} lives={lives} />
            <div className="feedback">{feedback}</div>
        </div>
    );
};

export default GameBoard;
