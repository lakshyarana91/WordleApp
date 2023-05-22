import './App.css';
import { useState } from 'react';
import words from './data/db.json';
import Wordle from './components/Wordle';


function App() {

  const [solution, setSolution] = useState(words[Math.floor(Math.random() * words.length)]);


  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
