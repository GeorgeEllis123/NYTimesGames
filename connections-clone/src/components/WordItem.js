import React from 'react';

const WordItem = ({ word, onClick, isSelected, isFound }) => {
    return (
        <div
            onClick={() => onClick(word)}
            className={`word-item ${isSelected ? 'selected' : ''} ${isFound ? 'found' : ''}`}
        >
            {word}
        </div>
    );
};

export default WordItem;
