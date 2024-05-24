import React from 'react';

const Controls = ({ selectedWords, onValidate, lives }) => {
    return (
        <div className="controls">
            <div className="lives">
                Mistakes Remaining: {"🍆".repeat(lives)}
            </div>
            <button className="submit" onClick={onValidate} disabled={(selectedWords.length < 4)}>Submit</button>
        </div>
    );
};

export default Controls;
