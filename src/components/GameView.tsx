import GameMap from './GameMap'

import { useGame } from "../hooks"
import { asPixels } from "../helpers"
import { PlayerSprite } from './PlayerSprite'
import { createContext } from 'react'

function GameView() {
  const { gameState } = useGame()

  const GameContext = createContext(gameState)

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
      <GameContext.Provider value={gameState}>
        <GameMap />
        <PlayerSprite/>
      </GameContext.Provider>
    </div>
  )
}

export default GameView
