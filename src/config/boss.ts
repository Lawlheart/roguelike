import { IBossConfig, IBossState } from "../types/config"


// Configurable Settings
export const DEFAULT_BOSS_SETTINGS: IBossConfig = {
  bossData: {
    hp: 200,
    mindmg: 5,
    maxdmg: 60,
    level: 9001,
  },
}

// Initial States
export const BOSS_INITIAL_STATE: IBossState = {
  ...DEFAULT_BOSS_SETTINGS,
  boss: [],
}