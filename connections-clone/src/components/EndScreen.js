import React, { useState } from 'react';

const EndScreen = ({ feedback, win, getResults }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCopy = () => {
        const textToCopy = getResults();
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Text copied to clipboard!");
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div>
            <h1>{feedback}</h1>
            {win ? <button onClick={() => setIsModalOpen(true)}>Share!</button> : ''}

            {isModalOpen && (
                <div className="modal">
                    <div className="modalContent">
                        <h2>Share your result!</h2>
                        <button onClick={handleCopy}>Copy Text</button>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default EndScreen;
