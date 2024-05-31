import React from 'react';

const WordItem = ({ word, onClick, isSelected, isInFinalSelection, fadeIn, fadeOut, mistake }) => {
    console.log(word, isInFinalSelection);

    return (
        <div
            onClick={() => onClick(word)}
            className={`animate__animated 
                        word-item
                        ${(fadeIn) ? 'animate__flipInX' : ''} 
                        ${((isSelected || isInFinalSelection) && fadeOut) ? 'animate__flipOutX' : ''} 
                        ${(isSelected && !mistake) ? 'selected' : ''} 
                        ${(isSelected && mistake) ? 'mistake' : ''}`} 
        >
            {word}

        </div>
    );
};

export default WordItem;
