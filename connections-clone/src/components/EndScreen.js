import React from 'react';

const EndScreen = ({ feedback, win, onShare }) => {
    return (
        <div>
            <h1>{feedback}</h1>
            {win ? <button onClick={onShare}>Share!</button> : '' }
            
        </div>
    );
};

export default EndScreen;
