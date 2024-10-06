import GameMap from './GameMap'

import { useGame } from "../hooks"
import { asPixels } from "../helpers"
import { PlayerSprite } from './PlayerSprite'

function GameView() {
  const {
    gameState: {
      map: {
        viewwidth,
        viewheight
      }
    }
  } = useGame()

  return (
    <div
      className="box"
      style={{
        width: asPixels(viewwidth),
        height: asPixels(viewheight),
      }}
    >
      <GameMap />
      <PlayerSprite/>
    </div>
  )
}

export default GameView
