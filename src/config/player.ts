import { IPlayerConfig, IPlayerState } from "../types/config"

// Configurable Settings
export const DEFAULT_PLAYER_SETTINGS: IPlayerConfig = {
  sprite: "redmage",
}

// Initial States
export const PLAYER_INITIAL_STATE: IPlayerState = {
  ...DEFAULT_PLAYER_SETTINGS,
  direction: "down",
  xp: 0,
  health: 100,
  maxhealth: 100,
  level: 1,
  weapon: "unarmed",
  
  player: [], //game player coords
  xpos: 0, //player view position
  ypos: 0, //player view position
}
