import React from 'react';

const WordItem = ({ word, onClick, isSelected }) => {
    return (
        <div
            onClick={() => onClick(word)}
            className={`word-item ${isSelected ? 'selected' : ''}`}
        >
            {word}
        </div>
    );
};

export default WordItem;
