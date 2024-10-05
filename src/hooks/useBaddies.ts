import { useEffect, useState } from 'react'

import { random } from '../helpers'
import { BADDIES_INITIAL_STATE } from '../config/baddies'
import usePlayer from './usePlayer'

function useBaddies() {
  const [baddieState, setBaddieState] = useState(BADDIES_INITIAL_STATE)
  const [playerState] = usePlayer()

  const baddieWalk = () => {
    let nextCoord, nextfoot;
    if (baddieState.baddieFoot === "left") {
      nextfoot = "right";
    } else {
      nextfoot = "left";
    }
    const baddies = baddieState.baddies
    for (let i = 0; i < baddies.length; i++) {
      const randomNum = random(1, 4)
      const x = baddies[i][0]
      const y = baddies[i][1]
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
        nextCoord[0] === playerState.player[0] &&
        nextCoord[1] === playerState.player[1]
      ) {
        if (!this.props.fight(i)) {
          return;
        }
      } else if (this.props.validMove(nextCoord[0], nextCoord[1])) {
        baddies[i] = nextCoord;
      }
    }
    setBaddieState({
      baddieset: baddieState.baddieset,
      baddieFoot: nextfoot,
      baddies: baddies,
    });
  }


  useEffect(() => {
    return () => {
      
    };
  }, [])
  return [baddieState, setBaddieState]
}

export default useBaddies
