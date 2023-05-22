import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Modal from "./Modal";


const Wordle = ( { solution } ) => {

    const { handleKeys, currentGuess, guesses, isCorrect, turn } = useWordle(solution);

    const [showModal, setShowModal] = useState(false);

    useEffect (() => {
        document.addEventListener("keyup", handleKeys);

        if(isCorrect) {
            setShowModal(true);
            document.removeEventListener("keyup", handleKeys);
        }
        if(turn > 5) {
            setShowModal(true);
            document.removeEventListener("keyup", handleKeys);
        }

        return () => {
            document.removeEventListener("keyup", handleKeys);
        };
    }, [handleKeys]);

    useEffect(() => {
        console.log(guesses, isCorrect, turn);
    }, [guesses, isCorrect, turn])

    return (
        <>
            <p>Solution is: {solution.word}</p>
            <p>Current Guess is: {currentGuess}</p>
            <Grid 
                currentGuess={currentGuess}
                guesses = {guesses}
                turn = {turn}
            />
            {showModal && 
                <Modal 
                    isCorrect={isCorrect} 
                    solution={solution.word} 
                    turn={turn} 
                />
            }
        </>
    )
}

export default Wordle