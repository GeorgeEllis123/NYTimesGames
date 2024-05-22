import React from 'react';

const SelectedWords = ({ selectedWords, onValidate, lives }) => {
    return (
        <div>
            <h3>Selected Words</h3>
            <div>
                {selectedWords.join(', ')}
            </div>
            <button onClick={onValidate}>Validate Group</button>
            <div>
                {"+".repeat(lives)}
            </div>
        </div>
    );
};

export default SelectedWords;
