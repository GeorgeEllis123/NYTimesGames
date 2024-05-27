import React from 'react';

const Controls = ({ selectedWords, onValidate, onDeselect, onShuffle, lives }) => {
    return (
        <div className="controls">
            <div className="lives">
                Mistakes Remaining: {"🍆".repeat(lives)}
            </div> 
            <div className="button-group">
                <button className="submit" onClick={onShuffle}>Shuffle</button>
                <button className="submit" onClick={onDeselect} disabled={(selectedWords.length === 0)}>Deselect all</button>
                <button className="submit" onClick={onValidate} disabled={(selectedWords.length < 4)}>Submit</button>
            </div>
        </div>
    );
};

export default Controls;
