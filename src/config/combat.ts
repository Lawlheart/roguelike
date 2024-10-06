import { ICombatConfig, ICombatState } from "../types"

// Configurable Settings
export const DEFAULT_COMBAT_CONFIG: ICombatConfig = {
  weaponset: ["dagger", "staff", "sword", "maul"],
}

// Initial States
export const COMBAT_INITIAL_STATE: ICombatState = {
  ...DEFAULT_COMBAT_CONFIG,
  weaponCoords: [],
  hitmessage: "",
  hurtmessage: "",
  healmessage: "",
  xpmessage: "",
  messageCount: 0,
}