import React from 'react';

const WordItem = ({ word, onClick, isSelected, fadeIn, fadeOut, mistake }) => {
    return (
        <div
            onClick={() => onClick(word)}
            className={`animate__animated 
                        word-item
                        ${(!isSelected && fadeIn) ? 'animate__flipInX' : ''} 
                        ${(isSelected && fadeOut) ? 'animate__flipOutX' : ''} 
                        ${(isSelected && !mistake) ? 'selected' : ''} 
                        ${(isSelected && mistake) ? 'mistake' : ''}`} 
        >
            {word}

        </div>
    );
};

export default WordItem;
