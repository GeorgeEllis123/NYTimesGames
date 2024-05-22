import React from 'react';

const StartScreen = ({ onStart }) => {
    return (
        <div>
            <h1>Welcome to the Connections Game!</h1>
            <button onClick={onStart}>Start Game</button>
        </div>
    );
};

export default StartScreen;
