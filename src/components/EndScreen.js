import './end.css'

const endScreen = ({retry,score}) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      
      <h2>Parabéns sua pontuação foi: <span>{score}</span></h2>
      


      <button onClick={retry}>Resetar o jogo</button>

    </div>
  )
}

export default endScreen