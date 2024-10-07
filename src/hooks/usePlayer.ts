import { useContext } from 'react'

import { random } from '../helpers'
import { GameContext } from '../context'
import { useMessage } from '.'

export function usePlayer() {
  const { gameState, setGameState } = useContext(GameContext)

  const { flashMessage } = useMessage()

  const playerDamage = () => {
    const { weapon, level } = gameState.player

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
    flashMessage("* " + damage + " dmg", "hit")
    return damage
  }

  const checkForLevelUp = (xp: number) => {
    let { level } = gameState.player
    level = Math.floor(xp / 40) + 1
    if (level !== gameState.player.level) {
      flashMessage("Level up!", "xp")
      levelUp()
      return true
    }
    return false
  }

  const levelUp = () => {
    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        maxhealth: 80 + 20 * gameState.player.level,
        health: (gameState.player.health += 20),
        level: (gameState.player.level += 1),
      }
    })
  }

  return {
    playerDamage,
    checkForLevelUp,
    levelUp,
  }
}
