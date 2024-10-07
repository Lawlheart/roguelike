import { useState } from "react"

import { DEFAULT_INITIAL_STATE } from "../config"
import { GameContext } from "../context"
import { GameProviderProps } from "../types"

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState(DEFAULT_INITIAL_STATE)

  return (
    <div>
      {gameState && (
        <GameContext.Provider
          value={{
            gameState,
            setGameState,
          }}
        >
          {children}
        </GameContext.Provider>
      )}
    </div>
  )
}

export default GameProvider
