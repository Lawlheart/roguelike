import { useContext } from "react"

import { useMessage, usePlayer } from "../hooks"
import { random } from "../helpers"
import { GameContext } from "../context"

export function useCombat() {
  const { gameState, setGameState } = useContext(GameContext) 

  const { playerDamage, checkForLevelUp } = usePlayer()
  const { flashMessage } = useMessage()

  const takeDamage = (damage: number) => {
    let { game: { playing }, player: { health } } = gameState

    if (health - damage <= 0) {
      health = 0
      playing = false
    } else {
      health -= damage
    }

    setGameState({
      ...gameState,
      game: {
        playing,
        win: false,
      },
      player: {
        ...gameState.player,
        health,
      }
    })

    if (!playing) {
      return false
    } else {
      flashMessage("- " + damage + " hp", "hurt")
      return true
    }
  }

  const heal = (healing: number) => {
    const { maxhealth } = gameState.player
    let { health } = gameState.player
    if (health + healing >= maxhealth) {
      health = maxhealth
    } else {
      health += healing
    }
    flashMessage("+ " + healing + " hp", "heal")
    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        health,
      }
    })
  }

  const vanquish = (baddieIndex: number) => {
    const { baddieCoords, baddieset } = gameState.baddies

    baddieset.splice(baddieIndex, 1)
    baddieCoords.splice(baddieIndex, 1)
    
    setGameState({
      ...gameState,
      baddies: {
        ...gameState.baddies,
        baddieCoords,
        baddieset,
      }
    })
  }

  const fight = (baddieIndex: number) => {
    const { baddieset } = gameState.baddies
    const baddie = baddieset[baddieIndex]

    const playerLives = takeDamage(random(baddie.mindmg, baddie.maxdmg))
    if (playerLives) {
      const damage = playerDamage()
      if (damage >= baddie.hp) {
        vanquish(baddieIndex)
        flashMessage("+ " + 10 * baddie.level + " xp", "xp")
        checkForLevelUp(gameState.player.xp + 10 * baddie.level)

        setGameState({
          ...gameState,
          player: {
            ...gameState.player,
            xp: gameState.player.xp + 10 * baddie.level,
          }
        })
        return true
      } else {
        baddie.hp -= damage
        setGameState({
          ...gameState,
          baddies: {
            ...gameState.baddies,
            baddieset: baddieset,
          }
        })
        return false
      }
    }
  }

  const fightBoss = () => {
    const { bossData } = gameState.baddies

    const randomDamage = random(bossData.mindmg, bossData.maxdmg)
    const lives = takeDamage(randomDamage)

    if (lives) {
      const damage = playerDamage()

      if (damage >= bossData.hp) {
        setGameState({ 
          ...gameState,
          game: {
            playing: false,
            win: true,
          }
        });
      } else {
        bossData.hp -= damage;
        setGameState({
          ...gameState,
          baddies: {
            ...gameState.baddies,
            bossData,
          }
        })
      }
    }
    return false;
  }

  return {
    takeDamage,
    heal,
    fight,
    fightBoss,
  }
}
