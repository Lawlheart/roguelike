import { IMapConfig, IMapState } from "../types"

// Configurable Settings
export const DEFAULT_MAP_SETTINGS: IMapConfig = {
  runs: 500,
  minRoomSize: 2,
  maxRoomSize: 6,
  gridheight: 30,
  gridwidth: 40,
  viewheight: 15,
  viewwidth: 20,
  bgx: 0, // view offset
  bgy: 0, // view offset
}

// Initial States
export const MAP_INITIAL_STATE: IMapState = {
  ...DEFAULT_MAP_SETTINGS,
  map: [],
  rooms: [],
  wallCoords: [],
  potions: [],
}