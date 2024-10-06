import { useGame } from "../hooks"
import GameInterface from "./GameInterface"
import GameOver from "./GameOver"
import GameSidebar from "./GameSidebar"
import GameView from "./GameView"
import PlayAgain from "./PlayAgain"

function GameDisplay() {
  const { gameState: {
    player: {
      health,
    },
    game: {
      win,
    }
  } } = useGame()

  let displayElement

  const gameIsOver = win || health
  if (health === 0) {
    displayElement = (<GameOver />)
  } else if (win) {
    displayElement = (<PlayAgain />)
  } else {
    displayElement = (
      <GameView />
    );
  }
  return (
    <>
      <GameSidebar />
      <GameInterface />
      { gameIsOver ? 
        (win ? (<PlayAgain />) : (<GameOver />)) :
        (<GameView />)
      }
      { displayElement }
    </>
  )
}

export default GameDisplay
