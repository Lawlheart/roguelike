import { useState } from 'react'

import { PLAYER_INITIAL_STATE } from '../config'
// import { useCombat } from '../hooks'
import { random } from '../helpers'

export function usePlayer() {
  const [playerState, setPlayerState] = useState(PLAYER_INITIAL_STATE)

  // const { flashMessage } = useCombat()

  const playerDamage = () => {
    const { weapon, level } = playerState

    let damage = 5 * level
    if (weapon === "unarmed") {
      damage += random(2, 4)
    } else if (weapon === "dagger") {
      damage += random(2, 8)
    } else if (weapon === "sword") {
      damage += random(2, 16)
    } else if (weapon === "maul") {
      damage += random(4, 24)
    }
    // flashMessage("* " + damage + " dmg", "hit")
    return damage
  }

  const checkForLevelUp = (xp: number) => {
    let { level } = playerState
    level = Math.floor(xp / 40) + 1
    if (level !== playerState.level) {
      // flashMessage("Level up!", "xp")
      levelUp()
      return true
    }
    return false
  }

  const levelUp = () => {
    setPlayerState({
      ...playerState,
      maxhealth: 80 + 20 * playerState.level,
      health: (playerState.health += 20),
      level: (playerState.level += 1),
    })
  }

  return {
    playerState,
    setPlayerState,
    playerDamage,
    checkForLevelUp,
    levelUp,
  }
}
