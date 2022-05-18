import { useState, useRef } from 'react'
import './Game.css'

const GameScreen = ({
  verifyLetter,
  pickedword,
  pickedCategory,
  letters,
  guessdLetters,
  guesses,
  wrongLetters,
  score }) => {

    const [letter, setLetter] = useState('')
    const letterInputRef = useRef(null)

  const HandleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter('')

    letterInputRef.current.focus()
  }


  return (
    <div className='game'>
      <p className='points'>
        <span>Pontuação: {score}</span>
      </p>
      <h1>adivinhe a palavra</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span> {pickedCategory}</span>
      </h3>
      <p>voce ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>(
          guessdLetters.includes(letter) ? (
            <span key={i} className='letter'>
              {letter}
            </span>
          ) : (
           
            <span key={i} className='blankSquare'></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={HandleSubmit}>
          <input
          ref={letterInputRef}
          value={letter}
          type="text"
          name="letter"
          maxLength='1'
          required
          onChange={(e) => setLetter(e.target.value)} />
          <button>Jogar!!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>letras já ultilizadas</p>
        {wrongLetters.map((letter,i)=>(
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default GameScreen