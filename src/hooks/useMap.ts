import { useContext } from "react"

import { useCombat } from "."
import { IRoom } from "../types"
import { random } from "../helpers"
import { GameContext } from "../context"

export function useMap() {
  const { gameState, setGameState } = useContext(GameContext)

  const { fight, fightBoss, heal } = useCombat()

  const coordIndex = (coords: number[][], position: number[]) => {
    for (let i = 0; i < coords.length; i++) {
      if (coords[i][0] == position[0] && coords[i][1] == position[1]) {
        return i
      }
    }
    return -1
  }

  const genMap = (coords: number[][]) => {
    const { gridheight, gridwidth } = gameState.map
    coords = coords.slice()
    const map = []
    for (let i = 0; i < gridheight; i++) {
      const row = []
      for (let j = 0; j < gridwidth; j++) {
        const index = coordIndex(coords, [j, i])
        if (index >= 0) {
          coords.splice(index, 1)
          row.push("1")
        } else {
          row.push("0")
        }
      }
      map.push(row)
    }
    setGameState({
      ...gameState,
      map: {
        ...gameState.map,
        map,
      },
    })
    return map
  }

  const getAllCoords = (rooms: IRoom[]) => {
    const coords = []
    for (let k = 0; k < rooms.length; k++) {
      const room = rooms[k]
      for (let i = room.x1; i <= room.x2; i++) {
        for (let j = room.y1; j <= room.y2; j++) {
          coords.push([i, j])
        }
      }
    }
    return coords
  }

  const addHCorridors = (
    x1: number,
    x2: number,
    y: number,
    coords: number[][]
  ) => {
    for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
      if (coordIndex(coords, [j, y]) < 0) {
        coords.push([j, y])
      }
    }
    return coords
  }

  const addVCorridors = (
    y1: number,
    y2: number,
    x: number,
    coords: number[][]
  ) => {
    for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++) {
      if (coordIndex(coords, [x, j]) < 0) {
        coords.push([x, j])
      }
    }
    return coords
  }

  const carveHalls = (rooms: IRoom[], coords: number[][]) => {
    for (let i = 1; i < rooms.length; i++) {
      const x1 = rooms[i - 1].center[0]
      const x2 = rooms[i].center[0]
      const y1 = rooms[i - 1].center[1]
      const y2 = rooms[i].center[1]
      if (random(0, 1)) {
        coords = addHCorridors(x1, x2, y1, coords)
        coords = addVCorridors(y1, y2, x2, coords)
      } else {
        coords = addVCorridors(y1, y2, x2, coords)
        coords = addHCorridors(x1, x2, y1, coords)
      }
    }
    return coords
  }

  const randomPlayerStart = (coords: number[][]) => {
    const player = coords[random(0, coords.length - 1)]
    const { viewwidth, viewheight, gridheight, gridwidth } = gameState.map
    let xpos, ypos, bgx, bgy

    if (player[0] < viewwidth / 2) {
      bgx = 0
      xpos = player[0]
    } else if (player[0] > gridwidth - viewwidth / 2) {
      bgx = gridwidth - viewwidth
      xpos = player[0] - bgx
    } else {
      xpos = Math.round(viewwidth / 2)
      bgx = player[0] - xpos
    }

    if (player[1] < viewheight / 2) {
      bgy = 0
      ypos = player[1]
    } else if (player[1] > gridheight - viewheight / 2) {
      bgy = gridheight - viewheight
      ypos = player[1] - bgy
    } else {
      ypos = Math.round(viewheight / 2)
      bgy = player[1] - ypos
    }
    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        xpos: xpos,
        ypos: ypos,
      },
      map: {
        ...gameState.map,
        bgx: bgx,
        bgy: bgy,
      },
    })

    return player
  }

  const randomLocations = (
    num: number,
    coords: number[][],
    invalids: number[][]
  ) => {
    const locations = []
    while (locations.length < num) {
      const location = coords[random(0, coords.length - 1)]
      let valid = true

      for (let i = 0; i < invalids.length; i++) {
        if (location[0] == invalids[i][0] && location[1] == invalids[i][1]) {
          valid = false
        }
      }
      if (valid) {
        locations.push(location)
        invalids.push(location)
      }
    }
    return locations
  }

  const validMove = (x: number, y: number) => {
    const { gridwidth, gridheight, wallCoords } = gameState.map
    const onmap = x > 0 && x < gridwidth && y > 0 && y < gridheight
    const notWall = coordIndex(wallCoords, [x, y]) >= 0
    return onmap && notWall
  }

  const resolveMove = (player: number[]) => {
    let {
      player: { weapon },
      combat: { weaponset },
    } = gameState
    const {
      map: { potions },
      combat: { weaponCoords },
      baddies: { baddieCoords, bossCoords },
    } = gameState

    // Check for and apply Potions
    const hitPotions = potions.filter(function (coords) {
      return !(coords[0] === player[0] && coords[1] === player[1])
    })
    if (hitPotions.length) {
      // Heal and remove potion from map
      heal(100)
      setGameState({
        ...gameState,
        map: {
          ...gameState.map,
          potions,
        },
      })
    }

    // Check for hitting baddies for combat
    let baddieIndex
    const hitBaddies = baddieCoords.filter(function (coords, index) {
      if (coords[0] === player[0] && coords[1] === player[1]) {
        // Mark Baddie for hitting
        baddieIndex = index
      }
      return !(coords[0] === player[0] && coords[1] === player[1])
    })
    if (hitBaddies.length) {
      if (baddieIndex && !fight(baddieIndex)) {
        return false
      }
    }

    // Check for weapons
    const foundWeapons = weaponCoords.filter(function (coords, index) {
      if (coords[0] === player[0] && coords[1] === player[1]) {
        weapon = weaponset[index]
        // Pick up weapon
        weaponset = weaponset.splice(index, 1)
      }
      return !(coords[0] === player[0] && coords[1] === player[1])
    })
    if (foundWeapons.length) {
      setGameState({
        ...gameState,
        combat: {
          ...gameState.combat,
          weaponCoords,
        },
        player: {
          ...gameState.player,
          weapon,
        },
      })
    }

    // Check for combat with the Boss
    const hitBoss =
      bossCoords[0] &&
      player[0] === bossCoords[0][0] &&
      player[1] === bossCoords[0][1]
    if (hitBoss) {
      if (!fightBoss()) {
        return false
      }
    }
    return true
  }

  const fogCheck = (x: number, y: number) => {
    const { player: { player } } = gameState
    // Short circuiting for now
    return false
    return (
      Math.abs(player[0] - x) + Math.abs(player[1] - y) > 5 ||
      Math.abs(player[0] - x) > 4 ||
      Math.abs(player[1] - y) > 4
    )
  }

  return {
    resolveMove,
    validMove,
    fogCheck,
    genMap,
    getAllCoords,
    carveHalls,
    randomPlayerStart,
    randomLocations,
  }
}
