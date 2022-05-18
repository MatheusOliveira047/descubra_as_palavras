//css
import './App.css';

//react
import { useCallback, useEffect, useState } from 'react';

//data
import {WordList} from './data/word'

//components
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const stages =[
  {id:1,name:'start' },
  {id:2,name:'game' },
  {id:3,name:'end' },
]

function App() {
 



  const [gameStage,setGameStage] = useState(stages[0].name)
  const [word] = useState(WordList)

  const [pickedword, setPicekdword] = useState('')
  const [pickedCategory, setPicekdwordCatedory] = useState('')
  const [letters, setLetters] = useState([])
  
  const [guessdLetters, setGuessdLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(4)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback( () =>{
    const categories = Object.keys(word)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const wor = word[category][Math.floor(Math.random() * word[category].length)]

    return {wor,category}
  },[word])
  
  const startGame = useCallback(() =>{
    const {wor,category} = pickWordAndCategory()
    clearLettersStages()

    let wordLetters = wor.split("")

    wordLetters = wordLetters.map((i)=> i.toLowerCase())



    setPicekdword(wor)
    setPicekdwordCatedory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[pickWordAndCategory])



  const verifyLetter = (letter) =>{
    const letterLowerCase = letter.toLowerCase()



    if(guessdLetters.includes(letterLowerCase) || wrongLetters.includes(letterLowerCase)){
      return
    }

    if(letters.includes(letterLowerCase)){
      setGuessdLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letterLowerCase
      ])
    } else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        letterLowerCase
      ])

      setGuesses((actualGuesses) => --actualGuesses ) 
    }

  }

  const clearLettersStages = () =>{
    setGuessdLetters([])
    setWrongLetters([])
  }


  useEffect(() =>{
    if(guesses === 0){
      clearLettersStages()

      setGameStage(stages[2].name)
    }
  },[guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    console.log(uniqueLetters);
    console.log(guessdLetters);

    // win condition
    if (guessdLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game with new word
      startGame();
    }
  }, [guessdLetters, letters, startGame]);


  
  const retry = () =>{
    setScore(0)
    setGuesses(4)

    setGameStage(stages[0].name)

  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}

      {gameStage === 'game' && <GameScreen verifyLetter={verifyLetter} pickedword={pickedword} pickedCategory={pickedCategory} letters={letters} guessdLetters={guessdLetters} guesses={guesses} wrongLetters={wrongLetters} score={score} />}

      {gameStage === 'end' && <EndScreen retry={retry} score={score} />}
    </div>
  );
}

export default App;
