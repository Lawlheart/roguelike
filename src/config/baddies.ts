import { IBaddiesConfig, IBaddiesState } from "../types"

// Configurable Settings
export const DEFAULT_BADDIES_CONFIG: IBaddiesConfig = {
  baddieFoot: "left",
  baddieCount: 20,
  bossData: {
    hp: 200,
    mindmg: 5,
    maxdmg: 60,
    level: 9001,
  },
}

// Initial States
export const BADDIES_INITIAL_STATE: IBaddiesState = {
  ...DEFAULT_BADDIES_CONFIG,
  baddieset: [],
  baddieCoords: [],
  bossCoords: [],
}

