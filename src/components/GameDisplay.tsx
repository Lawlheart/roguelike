import { useContext } from "react"

import { GameContext } from "../context"
import GameInterface from "./GameInterface"
import GameOver from "./GameOver"
import GameSidebar from "./GameSidebar"
import GameView from "./GameView"
import PlayAgain from "./PlayAgain"

function GameDisplay() {
  const { gameState } = useContext(GameContext)

  const {
    player: {
      health,
    },
    game: {
      win,
    }
  } = gameState


  const gameIsPlaying = !win && !!health

  return (
    <>
      <GameSidebar />
      <GameInterface />
      { gameIsPlaying ? 
        (<GameView />) :
        (win ?
          (<PlayAgain />) :
          (<GameOver />))
      }
    </>
  )
}

export default GameDisplay
