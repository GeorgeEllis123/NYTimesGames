import React from 'react';

const EndScreen = ({ feedback, win, getResults, closeModal }) => {

    const handleCopy = () => {
        const textToCopy = getResults();
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Text copied to clipboard!");
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="animate__animated animate__fadeIn modal">
            <div className="modalContent">
                <h2>Share your result!</h2>
                <button onClick={handleCopy}>Copy Text</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default EndScreen;
