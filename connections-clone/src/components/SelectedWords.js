import React from 'react';

const SelectedWords = ({ selectedWords, onValidate }) => {
    return (
        <div>
            <h3>Selected Words</h3>
            <div>
                {selectedWords.join(', ')}
            </div>
            <button onClick={onValidate}>Validate Group</button>
        </div>
    );
};

export default SelectedWords;
