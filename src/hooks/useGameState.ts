const DEFAULT_INITIAL_STATE = {
  // Game Config
  

  //player info
  sprite: "redmage",
  direction: "down",
  xp: 0,
  health: 100,
  maxhealth: 100,
  level: 1,
  weapon: "unarmed",

  //display info
  player: [3, 6], //game player coords
  xpos: 3, //player view position
  ypos: 6, //player view position
  gridheight: 30,
  gridwidth: 40,
  viewheight: 15,
  viewwidth: 20,
  bgx: 0, // view offset
  bgy: 0, // view offset

  // 
  hitmessage: "",
  hurtmessage: "",
  healmessage: "",
  xpmessage: "",
  messageCount: 0,

  //random generation info
  map: [],
  coords: [],
  runs: 500,
  minRoomSize: 2,
  maxRoomSize: 6,
  potions: [],

  // Baddie Config
  baddieset: [],
  baddies: [],
  baddieFoot: "left",

  // Item Config
  weaponset: ["dagger", "staff", "sword", "maul"],
  weapons: [],

  // Boss Config
  boss: [],
  bossData: {
    hp: 200,
    mindmg: 5,
    maxdmg: 60,
    level: 9001,
  },

  // Game State
  playing: true,
  win: false,
}