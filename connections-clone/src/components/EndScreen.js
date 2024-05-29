import React from 'react';
import nytimesLogo from '../images/nytwhite.png';

const EndScreen = ({ win, getResults, closeModal }) => {

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
            {win && (<div className="modalContent">
                <h2>Share your result!</h2>
                <button onClick={handleCopy}>Copy Text</button>
                <button onClick={closeModal}>Close</button>
            </div>)}

            {!win && (<div className="modalContent">
                <h2>This might suit you better...</h2>
                <a href="https://www.nytimes.com/games/connections" target="_blank">
                    <button className="nyt">
                        <img src={nytimesLogo} alt="NYTimes Logo" className="nytimes-logo" />
                    </button>
                </a>
                <button onClick={closeModal}>Close</button>
            </div>)}
        </div>
    );
};

export default EndScreen;
