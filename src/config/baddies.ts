import { IBaddiesConfig, IBaddiesState } from "../types/config"

// Configurable Settings
export const DEFAULT_BADDIES_CONFIG: IBaddiesConfig = {
  baddieFoot: "left",
}

// Initial States
export const BADDIES_INITIAL_STATE: IBaddiesState = {
  ...DEFAULT_BADDIES_CONFIG,
  baddieset: [],
  baddies: [],
}

