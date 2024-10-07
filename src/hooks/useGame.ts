import { useContext } from "react"

import { useBaddies, useMap, useRooms } from "."
import { GameContext } from "../context"

export function useGame() {
  const { gameState, setGameState } = useContext(GameContext)

  const { makeBaddieSet } = useBaddies()
  const { validMove, resolveMove, getAllCoords, carveHalls, genMap, randomPlayerStart, randomLocations } = useMap()
  const { placeRooms } = useRooms()

  const initialize = () => {
    const rooms = placeRooms()
    let coords = getAllCoords(rooms)
    coords = carveHalls(rooms, coords)

    const map = genMap(coords)
    const playerCoords = randomPlayerStart(coords)

    let invalids = [playerCoords]
    
    const potions = randomLocations(5, coords, invalids)
    invalids = [...invalids, ...potions]

    const baddies = randomLocations(30, coords, invalids)
    invalids = [...invalids, ...baddies]

    const weaponCoords = randomLocations(4, coords, invalids)
    invalids = [...invalids, ...weaponCoords]

    const bossCoords = randomLocations(1, coords, invalids)
    const baddieset = makeBaddieSet(baddies.length)

    setGameState({
      ...gameState,
      baddies: {
        ...gameState.baddies,
        baddieset,
        bossCoords,
      },
      player: {
        ...gameState.player,
        player: playerCoords
      },
      combat: {
        ...gameState.combat,
        weaponCoords,
      },
      map: {
        ...gameState.map,
        map,
        rooms,
      },
    })
    console.log('Initialize', gameState)
  }

  const resetGame = () => {
    initialize()
  }

  const moveSprite = (keyCode: string) =>{
    console.log('MoveSprite function')
    if (gameState.player.health === 0 || gameState.game.win) {
      return;
    }
    const { player } = gameState.player
    let { direction, sprite, xpos, ypos } = gameState.player
    const { gridheight, gridwidth, viewheight, viewwidth } = gameState.map
    let { bgx, bgy } = gameState.map

    console.log(keyCode)

    if (keyCode === 'KeyS' || keyCode === 'ArrowDown') {
      console.log("DOWN")
      direction = "down";
      if (validMove(player[0], player[1] + 1)) {
        if (
          bgy < gridheight - viewheight &&
          ypos > Math.floor(viewheight / 2)
        ) {
          bgy += 1;
        } else {
          ypos += 1;
        }
      }
    } else if (keyCode === 'KeyW' || keyCode === 'ArrowUp') {
      console.log("UP")
      direction = "up";
      if (validMove(player[0], player[1] - 1)) {
        if (bgy > 0 && ypos < Math.floor(viewheight / 2)) {
          bgy -= 1;
        } else {
          ypos -= 1;
        }
      }
    } else if (keyCode === 'KeyA' || keyCode === 'ArrowLeft') {
      console.log("LEFT")
      direction = "left";
      if (validMove(player[0] - 1, player[1])) {
        if (bgx > 0 && xpos < Math.floor(viewwidth / 2)) {
          bgx -= 1;
        } else {
          xpos -= 1;
        }
      }
    } else if (keyCode === 'KeyD' || keyCode === 'ArrowRight') {
      console.log("RIGHT")
      direction = "right";
      if (validMove(player[0] + 1, player[1])) {
        if (
          bgx < gridwidth - viewwidth &&
          xpos > Math.floor(viewwidth / 2)
        ) {
          bgx += 1;
        } else {
          xpos += 1;
        }
      }
    } else if (keyCode === 'KeyB') {
      sprite = "blackmage";
    } else if (keyCode === 'KeyR') {
      sprite = "redmage";
    }
    if (resolveMove([xpos + bgx, ypos + bgy])) {
      console.log('Resolving Move')
      setGameState({
        ...gameState,
        player: {
          ...gameState.player,
          direction: direction,
          sprite: sprite,
          xpos: xpos,
          ypos: ypos,
          player: [xpos + bgx, ypos + bgy],
        },
        map: {
          ...gameState.map,
          bgx: bgx,
          bgy: bgy,
        }
      })
    }
  }

  return {
    gameState,
    setGameState,
    initialize,
    resetGame,
    moveSprite,
  }
}