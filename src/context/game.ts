import { createContext } from "react"

import { IGameContext } from "../types"
import { DEFAULT_INITIAL_STATE } from "../config"

export const GameContext = createContext<IGameContext>({
  gameState: DEFAULT_INITIAL_STATE,
  setGameState: () => console.log('DUMMY SAVE'),
})
