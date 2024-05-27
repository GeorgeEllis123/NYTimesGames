import React from 'react';

const WordItem = ({ word, onClick, isSelected, mistake }) => {
    return (
        <div
            onClick={() => onClick(word)}
            className={`word-item ${(isSelected && !mistake) ? 'selected' : ''} ${(isSelected && mistake) ? 'mistake' : ''}`} 
        >
            {word}

        </div>
    );
};

export default WordItem;
