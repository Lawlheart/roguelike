export interface IMapCoords {
  [key: string]: number[][]
}

// Baddies Config Types
export interface Baddie {
  hp: number;
  color: string;
  mindmg: number;
  maxdmg: number;
  level: number;
}
export interface IBaddiesConfig {
  baddieFoot: string
}


export interface IBaddiesState extends IBaddiesConfig {
  baddieset: Baddie[]
  baddies: number[][]
}

export interface IBossConfig {
  bossData: {
    hp: number
    mindmg: number
    maxdmg: number
    level: number
  }
}


export interface IBossState extends IBossConfig {
  boss: number[][]
}
// Combat Config Types
export interface ICombatConfig {
  weaponset: string[]
}

export interface ICombatState extends ICombatConfig {
  weapons: number[][]
}


// Display Config Types
export interface IDisplayConfig {
  gridheight: number
  gridwidth: number
  viewheight: number
  viewwidth: number
  bgx: number
  bgy: number
}

export interface IDisplayState extends IDisplayConfig {
  hitmessage: string
  hurtmessage: string
  healmessage: string
  xpmessage: string
  messageCount: number
}


// Map Config Types
export interface IMapConfig {
  runs: number
  minRoomSize: number
  maxRoomSize: number
}

export interface IMapState extends IMapConfig {
  map: string[][]
  coords: number[][]
  potions: number[][],
}

// Player Config Types
export interface IPlayerConfig {
  sprite: string
}

export interface IPlayerState extends IPlayerConfig {
  direction: string
  xp: number
  health: number
  maxhealth: number
  level: number
  weapon: string
  player: number[]
  xpos: number
  ypos: number
}


// Game Config Types
export interface IGameState {
  baddies: IBaddiesState
  boss: IBossState
  combat: ICombatState
  display: IDisplayState
  player: IPlayerState
  map: IMapState
  game: {
    playing: boolean,
    win: boolean,
  }
}
