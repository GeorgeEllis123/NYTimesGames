import React from 'react';

const WordItem = ({ word, onClick }) => {
    return (
        <div onClick={() => onClick(word)} className="word-item">
            {word}
        </div>
    );
};

export default WordItem;
