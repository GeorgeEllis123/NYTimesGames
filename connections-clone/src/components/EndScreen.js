import React from 'react';
import nytimesLogo from '../images/nytwhite.png';
import './styles/endscreenstyles.css'

const EndScreen = ({ win, getResults, closeModal }) => {
    const handleCopy = () => {
        const textToCopy = getResults();

        // Attempt to use the modern Clipboard API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert("Text copied to clipboard!");
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                    // Fallback to alternative method
                    fallbackCopyTextToClipboard(textToCopy);
                });
        } else {
            // Fallback to alternative method
            fallbackCopyTextToClipboard(textToCopy);
        }
    };

    // Fallback function for browsers that do not support navigator.clipboard
    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.position = "fixed";
        textArea.style.top = 0;
        textArea.style.left = 0;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            if (successful) {
                alert("Text copied to clipboard!");
            } else {
                alert("Copying text failed. Please copy manually.");
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            alert("Copying text failed. Please copy manually.");
        }

        document.body.removeChild(textArea);
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
                    <p className="results"> 
                        {getResults()}
                    </p>

                    <div onClick={handleCopy} className="iconContainer">
                        <div class="icon back"></div>
                        <div class="icon front"></div>
                    </div>

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
