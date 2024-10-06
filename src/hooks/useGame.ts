import { useState } from "react"

import { DEFAULT_INITIAL_STATE } from "../config"
import { usePlayer, useBaddies, useCombat, useMap, useRooms } from "."
import { IRoom } from "../types"

export function useGame() {
  const [gameState, setGameState] = useState(DEFAULT_INITIAL_STATE)

  const { baddieState } = useBaddies()
  const { playerState, setPlayerState } = usePlayer()
  const { combatState } = useCombat()
  const { mapState, setMapState, validMove, resolveMove, getAllCoords, carveHalls, genMap } = useMap()
  const { placeRooms } = useRooms()

  const initialize = () => {
    const rooms = placeRooms()
    let coords = getAllCoords(rooms)
    coords = carveHalls(rooms, coords)

    const map = genMap(coords)
    let playerCoords = this.randomPlayerStart(coords)

    let invalids = [playerCoords]
    let potions = this.randomLocations(5, coords, invalids)
    invalids = invalids.concat(potions)
    let baddies = this.randomLocations(30, coords, invalids)
    invalids = invalids.concat(baddies)
    let weapons = this.randomLocations(4, coords, invalids)
    invalids = invalids.concat(weapons)
    let boss = this.randomLocations(1, coords, invalids)
    let baddieset = this.getBaddieSet(baddies.length)
    



    setGameState({
      ...gameState,
      baddies: baddieState,
      player: playerState,
      combat: combatState,
      map: mapState,
    })
  }

  const resetGame = () => {
    // this.replaceState(this.getInitialState(), function () {
    //   this.initialize();
    // });
  }

  const moveSprite = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if (playerState.health === 0 || gameState.game.win) {
      return;
    }
    e.preventDefault()
    const { player } = playerState
    let { direction, sprite, xpos, ypos } = playerState
    const { gridheight, gridwidth, viewheight, viewwidth } = mapState
    let { bgx, bgy } = mapState

    if (e.keyCode === 40 || e.keyCode === 83) {
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
    } else if (e.keyCode === 38 || e.keyCode === 87) {
      direction = "up";
      if (validMove(player[0], player[1] - 1)) {
        if (bgy > 0 && ypos < Math.floor(viewheight / 2)) {
          bgy -= 1;
        } else {
          ypos -= 1;
        }
      }
    } else if (e.keyCode === 37 || e.keyCode === 65) {
      direction = "left";
      if (validMove(player[0] - 1, player[1])) {
        if (bgx > 0 && xpos < Math.floor(viewwidth / 2)) {
          bgx -= 1;
        } else {
          xpos -= 1;
        }
      }
    } else if (e.keyCode === 39 || e.keyCode === 68) {
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
    } else if (e.keyCode === 66) {
      sprite = "blackmage";
    } else if (e.keyCode === 82) {
      sprite = "redmage";
    }
    if (resolveMove([xpos + bgx, ypos + bgy])) {
      setPlayerState({
        ...playerState,
        direction: direction,
        sprite: sprite,
        xpos: xpos,
        ypos: ypos,
        player: [xpos + bgx, ypos + bgy],
      })

      setMapState({
        ...mapState,
        bgx: bgx,
        bgy: bgy,
      });
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