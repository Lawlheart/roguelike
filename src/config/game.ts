import { DEFAULT_BADDIES_CONFIG, BADDIES_INITIAL_STATE } from "./baddies"
import { DEFAULT_COMBAT_CONFIG, COMBAT_INITIAL_STATE } from "./combat"
import { DEFAULT_MAP_SETTINGS, MAP_INITIAL_STATE } from "./map"
import { DEFAULT_PLAYER_SETTINGS, PLAYER_INITIAL_STATE } from "./player"
import { IGameState } from "../types/config"


export const DEFAULT_INITIAL_STATE: IGameState = {
  baddies: {
    ...DEFAULT_BADDIES_CONFIG,
    ...BADDIES_INITIAL_STATE,
  },
  combat: {
    ...DEFAULT_COMBAT_CONFIG,
    ...COMBAT_INITIAL_STATE,
  },
  map: {
    ...DEFAULT_MAP_SETTINGS,
    ...MAP_INITIAL_STATE,
  },
  player: {
    ...DEFAULT_PLAYER_SETTINGS,
    ...PLAYER_INITIAL_STATE,
  },
  // Game State
  game: {
    playing: true,
    win: false,
  }
}