import { useState } from 'react'

import { random } from '../helpers'
import { BADDIES_INITIAL_STATE } from '../config/baddies'
import { useCombat, usePlayer, useMap } from '.'

export function useBaddies() {
  const [baddieState, setBaddieState] = useState(BADDIES_INITIAL_STATE)
  
  const { playerState } = usePlayer()
  const { fight } = useCombat()
  const { validMove } = useMap()

  const dance = () => {
    const { baddieCoords } = baddieState
    const {  player } = playerState
 
    let nextCoord, nextfoot;
    if (baddieState.baddieFoot === "left") {
      nextfoot = "right";
    } else {
      nextfoot = "left";
    }
    
    for (let i = 0; i < baddieCoords.length; i++) {
      const randomNum = random(1, 4)
      const x = baddieCoords[i][0]
      const y = baddieCoords[i][1]
      if (randomNum === 1) {
        nextCoord = [x + 1, y]
      } else if (randomNum === 2) {
        nextCoord = [x - 1, y]
      } else if (randomNum === 3) {
        nextCoord = [x, y + 1]
      } else {
        nextCoord = [x, y - 1]
      }
      if (
        nextCoord[0] === player[0] &&
        nextCoord[1] === player[1]
      ) {
        if (!fight(i)) {
          return;
        }
      } else if (validMove(nextCoord[0], nextCoord[1])) {
        baddieCoords[i] = nextCoord;
      }
    }
    setBaddieState({
      ...baddieState,
      baddieFoot: nextfoot,
      baddieCoords: baddieCoords,
    });
  }

  const getBaddieSet = (count: number) => {
    const baddieset = []
    const colors = ["blue", "red", "gold"]

    for (let i = 0; i < count; i++) {
      const roll = random(1, 3)
      baddieset.push({
        hp: random(5 * roll, 15 * roll),
        color: colors[roll - 1],
        mindmg: 5,
        maxdmg: 10 * roll + 10,
        level: roll,
      });
    }
    return baddieset;
  }

  const vanquish = (baddieIndex: number) => {
    const { baddieCoords, baddieset } = baddieState

    baddieset.splice(baddieIndex, 1)
    baddieCoords.splice(baddieIndex, 1)
    
    setBaddieState({
      ...baddieState,
      baddieCoords,
      baddieset,
    })
  }
  
  return { baddieState, setBaddieState, dance, vanquish, getBaddieSet }
}
