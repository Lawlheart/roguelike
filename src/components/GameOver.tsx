import { useMap, useGame } from '../hooks'

import { asPixels } from '../helpers'

function GameOver() {
  const { mapState } = useMap()
  const { resetGame } = useGame()

  return (
    <div
      className="box game-over"
      style={{
        width: asPixels(mapState.viewwidth),
        height: asPixels(mapState.viewheight),
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
