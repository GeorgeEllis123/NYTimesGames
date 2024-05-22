import React from 'react';

const WordItem = ({ word, group, onClick, isSelected, isFound }) => {
    return (
        <div
            onClick={() => onClick(word)}
            className={`word-item ${isSelected ? 'selected' : ''} ${isFound ? `group${group}` : ''}`}
        >
            {word}

        </div>
    );
};

export default WordItem;
