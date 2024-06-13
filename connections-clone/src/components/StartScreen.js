import React, { useState } from 'react';
import './styles/startscreenstyles.css'

const StartScreen = ({ onStart }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="startContainer">
            <div className="animate__animated animate__fadeInDown textContainer">
                <h1 className="welcome">Freaky Connections!</h1>
                <p>Group freaky words that share a freaky, common thread</p>
            </div>
            <button className="animate__animated animate__fadeInLeft playButton"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onStart}>
                {isHovered ? "Get Freaky!" : "Play"}
            </button>
        </div>
    );
};

export default StartScreen;
