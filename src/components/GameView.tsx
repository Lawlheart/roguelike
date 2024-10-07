import GameMap from './GameMap'

import { asPixels } from "../helpers"
import { PlayerSprite } from './PlayerSprite'
import { useContext } from 'react'
import { GameContext } from '../context'

function GameView() {
  const { gameState } = useContext(GameContext)

  const { 
    map: {
      viewwidth,
      viewheight
    } 
  } = gameState

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
