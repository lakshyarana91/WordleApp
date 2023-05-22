import { useState } from "react"

const useWordle = ( solution ) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]);  // [{'letter' : 'a', 'color' : ''}]
    const [history, setHistory] = useState([])   //["ninja", "steal"]
    const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
      const solutionArray = [...solution.word];
      const formattedArray = [...currentGuess].map((letter) => {
          return { key: letter, color: "grey" };
      });

      // Mark character with color green
      formattedArray.forEach((value, index) => {
        if(solutionArray[index] === value.key){
          formattedArray[index].color = "green";
          solutionArray[index] = null;
        }
      })
      //Mark character with color yellow
      formattedArray.forEach((value, index) => {
        if(solutionArray.includes(value.key) && value.color !== "green"){
          formattedArray[index].color = "yellow";
          solutionArray[solutionArray.indexOf(value.key)] = null;
        }
      })
      return formattedArray;
    }

    const addNewGuess = (formattedGuess) => {
      if(currentGuess === solution.word){
        setIsCorrect(true);
      }
      if(turn <= 5) {
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[turn] = formattedGuess;
          return newGuesses;
        });
      }
      setTurn(turn + 1);
      setHistory([...history, currentGuess]);
      setCurrentGuess("");
    }

    const handleKeys = ({ key }) => {
      //On keypress and letters to currentGuess
      //Whenerver a user presses a key we need to store in the currentGuess
      // and can only get upto length of 5 character
      //User can delete a character
      //submit
		console.log(key);

    if(key === "Enter"){
      
      // The turn should be less than or equal to 5
      if(turn > 5){
        console.log("The user has no more turns");
        return;
      }
      // The word is not present in the history
      // Do not allow duplicate words
      if(history.includes(currentGuess)){
        console.log("The currentGuess is already used");
        return;
      }
      // The word can not be smaller then 5 characters long
      if(currentGuess.length !== 5){
        console.log("The word is not 5 characters long");
        return;
      }

      console.log("Formatting the Guess");
      const formattedGuess = formatGuess();
      addNewGuess(formattedGuess);
    }

    if(key === "Backspace"){
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }

    if(/^[A-Za-z]$/.test(key)){
      if(currentGuess.length < 5){
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
	};

	return { handleKeys, currentGuess, guesses, isCorrect, turn };
}

export default useWordle