import { asPixels } from "../helpers"
import { useGame } from "../hooks"

export default function PlayAgain() {
  const { gameState, resetGame } = useGame()
  const { viewwidth, viewheight } = gameState.map

  return (
    <div
      className="box game-win"
      style={{
        width: asPixels(viewwidth),
        height: asPixels(viewheight),
      }}
    >
      <h1 style={{ color: "white" }}>YOU WIN!</h1>
      <button className="play-again" onClick={resetGame}>
        Play Again?
      </button>
    </div>
  )
}