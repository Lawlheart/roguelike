import { IDisplayConfig, IDisplayState } from "../types/config"

// Configurable Settings
export const DEFAULT_DISPLAY_SETTINGS: IDisplayConfig = {
  gridheight: 30,
  gridwidth: 40,
  viewheight: 15,
  viewwidth: 20,
  bgx: 0, // view offset
  bgy: 0, // view offset
}

// Initial States
export const DISPLAY_INITIAL_STATE: IDisplayState = {
  ...DEFAULT_DISPLAY_SETTINGS,
  hitmessage: "",
  hurtmessage: "",
  healmessage: "",
  xpmessage: "",
  messageCount: 0,
}