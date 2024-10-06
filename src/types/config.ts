// Baddies Config Types
export interface IBaddiesConfig {
  baddieFoot: string
  baddieCount: number
  bossData: {
    hp: number
    mindmg: number
    maxdmg: number
    level: number
  }
}

export interface IBaddiesState extends IBaddiesConfig {
  baddieset: {
    hp: number;
    color: string;
    mindmg: number;
    maxdmg: number;
    level: number;
  }[]
  baddieCoords: number[][]
  bossCoords: number[][]
}

// Combat Config Types
export interface ICombatConfig {
  weaponset: string[]
}

export interface ICombatState extends ICombatConfig {
  weaponCoords: number[][]
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
  gridheight: number
  gridwidth: number
  viewheight: number
  viewwidth: number
  bgx: number
  bgy: number
}

export interface IMapState extends IMapConfig {
  map: number[][]
  rooms: string[][]
  wallCoords: number[][]
  potions: number[][]
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
  combat: ICombatState
  player: IPlayerState
  map: IMapState
  game: {
    playing: boolean,
    win: boolean,
  }
}
