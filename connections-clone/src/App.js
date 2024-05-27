import React, { useState } from 'react';
import './styles.css';
import 'animate.css';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import EndScreen from './components/EndScreen';

const App = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, end
    const [isEndScreenModalOpen, setIsEndScreenModalOpen] = useState(false);
    const [selectedWords, setSelectedWords] = useState([]);
    const [feedback, setFeedback] = useState(''); // messages to user
    const [win, setWin] = useState(false);
    const [results, setResults] = useState([]);

    function evaluateGuesses() {
        var output = "";
        const guessesRows = results.map(guesses => guesses.map(word => word.rownumber));
        guessesRows.forEach(row => row.forEach(item => {
            if (item === "0") {
                output += "🟧";
            }
            else if (item === "1") {
                output += "🟫";
            }
            else if (item === "2") {
                output += "🟦";
            }
            else if (item === "3") {
                output += "🟪";
            }
        }, output += "\n"));

        return output;

        // 🟧🟩🟦🟪
    };


    const startGame = () => {
        setGameState('playing');
        setSelectedWords([]);
        setFeedback('');
    };

    const endGame = (success, guesses) => {
        setIsEndScreenModalOpen(true);
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
            {isEndScreenModalOpen && <EndScreen feedback={feedback} win={win} getResults={evaluateGuesses} closeModal={() => setIsEndScreenModalOpen(false)} />}
        </div>
    );
};

export default App;
