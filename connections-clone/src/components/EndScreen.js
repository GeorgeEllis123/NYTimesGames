import React from 'react';
import nytimesLogo from '../images/nytwhite.png';
import './styles/endscreenstyles.css'

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
            {win && (<div>
                <button onClick={closeModal} className="close-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="modalContent">
                    <h3>Share your result!</h3>
                    <button onClick={handleCopy}>Copy Text</button>
                    <h3>And go sober up...</h3>
                    <a href="https://www.nytimes.com/games/connections" target="_blank">
                        <button className="nyt">
                            <img src={nytimesLogo} alt="NYTimes Logo" className="nytimes-logo" />
                        </button>
                    </a>
                </div>
                </div>)}

            {!win && (<div>
                <button onClick={closeModal} className="close-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="modalContent">
                    <h3>This might suit you better...</h3>
                    <a href="https://www.nytimes.com/games/connections" target="_blank">
                        <button className="nyt">
                            <img src={nytimesLogo} alt="NYTimes Logo" className="nytimes-logo" />
                        </button>
                    </a>
            </div>
            </div>)
}
        </div>
    );
};

export default EndScreen;
