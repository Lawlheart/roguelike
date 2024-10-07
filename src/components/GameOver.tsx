import { useContext } from 'react'

import { asPixels } from '../helpers'
import { GameContext } from '../context'
import { useGame } from '../hooks'

function GameOver() {
  const { gameState } = useContext(GameContext)

  const { viewwidth, viewheight } = gameState.map
  const { resetGame } = useGame()

  return (
    <div
      className="box game-over"
      style={{
        width: asPixels(viewwidth),
        height: asPixels(viewheight),
      }}
    >
      <h1 style={{ color: "white" }}>GAME OVER</h1>
      <button className="play-again" onClick={resetGame}>
        Play Again?
      </button>
    </div>
  )
}

export default GameOver
