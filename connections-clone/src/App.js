import React, { useEffect, useState } from 'react';
import './styles.css';
import 'animate.css';
import StartScreen from './components/StartScreen';
import GameBoard from './components/GameBoard';
import EndScreen from './components/EndScreen';

const App = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, end
    const [isEndScreenModalOpen, setIsEndScreenModalOpen] = useState(false);
    const [win, setWin] = useState(false);
    const [results, setResults] = useState([]);
    const [gameNumber, setGameNumber] = useState(1);
    //const [hasPlayed, setHasPlayed] = useSate(false);

    /*
    useEffect(() => {
        const played = localStorage.getItem('hasPlayed');
        if (played) {
            setHasPlayed(true);
            setGameState('end');
        }
    }, []);
    */

    function formatNumber(num) {
        return num.toString().padStart(3, '0');
    }

    function evaluateGuesses() {
        // Title
        var output = "Freaky Connections ";
        output += formatNumber(gameNumber);
        output += "\n";

        // Guesses
        const guessesRows = results.map(guesses => guesses.map(word => word.rownumber));
        guessesRows.forEach(row => row.forEach(item => {
            if (item === 0) {
                output += "🟧";
            }
            else if (item === 1) {
                output += "🟫";
            }
            else if (item === 2) {
                output += "🟦";
            }
            else if (item === 3) {
                output += "🟪";
            }
        }, output += "\n"));

        return output;

        // 🟧🟩🟦🟪
    };


    const startGame = () => {
        setGameState('playing');
    };

    const endGame = (success, guesses) => {
        setGameState('end');
        setIsEndScreenModalOpen(true);
        setWin(success);
        setResults(guesses);
    };

    return (
        <div>
            {gameState === 'start' && <StartScreen onStart={startGame} />}
            {(gameState === 'playing' || gameState === 'end' ) && (
                <GameBoard
                    endGame={endGame}
                />
            )}
            {gameState === 'end' && (
                <div className="share-container">
                    <button className="animate__animated animate__fadeIn submit" onClick={() => setIsEndScreenModalOpen(true)}>{`${win ? "Share" : "Nice Try..."}`}</button>
                </div>
            )}
            {isEndScreenModalOpen && <EndScreen win={win} getResults={evaluateGuesses} closeModal={() => setIsEndScreenModalOpen(false)} />}
        </div>
    );
};

export default App;
