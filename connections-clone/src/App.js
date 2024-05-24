import React, { useState } from 'react';
import './styles.css';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import EndScreen from './components/EndScreen';

const App = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, end
    const [selectedWords, setSelectedWords] = useState([]);
    const [feedback, setFeedback] = useState(''); // messages to user
    const [win, setWin] = useState(false);
    const [results, setResults] = useState([]);

    const share = () => {
        console.log(results);
    }

    const startGame = () => {
        setGameState('playing');
        setSelectedWords([]);
        setFeedback('');
    };

    const endGame = (success, guesses) => {
        setGameState('end');
        setWin(success);
        setResults(guesses);
        setFeedback(success ? 'Congratulations! You won!' : 'Game Over. Try again!');
    };

    return (
        <div>
            {gameState === 'start' && <StartScreen onStart={startGame} />}
            {gameState === 'playing' && (
                <GameBoard
                    selectedWords={selectedWords}
                    setSelectedWords={setSelectedWords}
                    endGame={endGame}
                />
            )}
            {gameState === 'end' && <EndScreen feedback={feedback} win={win} onShare={share} />}
        </div>
    );
};

export default App;
