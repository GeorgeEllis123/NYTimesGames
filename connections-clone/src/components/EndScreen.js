import React from 'react';

const EndScreen = ({ feedback, onRestart }) => {
    return (
        <div>
            <h1>{feedback}</h1>
            <button onClick={onRestart}>Play Again</button>
        </div>
    );
};

export default EndScreen;
