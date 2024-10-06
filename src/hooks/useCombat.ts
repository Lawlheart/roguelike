import { useState } from "react"

import { COMBAT_INITIAL_STATE } from "../config"
import { useBaddies, usePlayer, useGame } from "../hooks"
import { random } from "../helpers"

export function useCombat() {
  const [combatState, setCombatState] = useState(COMBAT_INITIAL_STATE)

  const { baddieState, setBaddieState, vanquish } = useBaddies()
  const { playerState, setPlayerState, playerDamage, checkForLevelUp } = usePlayer()
  const { gameState, setGameState } = useGame()

  const flashMessage = (message: string, messageType: string) => {
    let {
      hitmessage,
      hurtmessage,
      healmessage,
      xpmessage,
      messageCount: count,
    } = combatState

    if (messageType === "hit") {
      hitmessage = message
    } else if (messageType === "hurt") {
      hurtmessage = message
    } else if (messageType === "heal") {
      healmessage = message
    } else if (messageType === "xp") {
      xpmessage = message
    }
    setCombatState(
      {
        ...combatState,
        hitmessage: hitmessage,
        hurtmessage: hurtmessage,
        healmessage: healmessage,
        xpmessage: xpmessage,
        messageCount: (count += 1),
      }
    )
    
    setTimeout(function () {
      if (combatState.messageCount === count) {
        setCombatState(
          {
            ...combatState,
            hitmessage: "",
            hurtmessage: "",
            healmessage: "",
            xpmessage: "",
            messageCount: (count += 1),
          }
        )
      }
    }, 600)
  }

  const takeDamage = (damage: number) => {
    let { health } = playerState
    let { game: { playing } } = gameState

    if (health - damage <= 0) {
      health = 0
      playing = false
    } else {
      health -= damage
    }

    setPlayerState({
      ...playerState,
      health,
    })

    setGameState({
      ...gameState,
      game: {
        playing,
        win: false,
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
    const { maxhealth } = playerState
    let { health } = playerState
    if (health + healing >= maxhealth) {
      health = maxhealth
    } else {
      health += healing
    }
    flashMessage("+ " + healing + " hp", "heal")
    setPlayerState({
      ...playerState,
      health: health,
    })
  }

  const fight = (baddieIndex: number) => {
    const { baddieset } = baddieState
    const baddie = baddieset[baddieIndex]

    const playerLives = takeDamage(random(baddie.mindmg, baddie.maxdmg))
    if (playerLives) {
      const damage = playerDamage()
      if (damage >= baddie.hp) {
        vanquish(baddieIndex)
        flashMessage("+ " + 10 * baddie.level + " xp", "xp")
        checkForLevelUp(playerState.xp + 10 * baddie.level)

        setPlayerState({
          ...playerState,
          xp: playerState.xp + 10 * baddie.level,
        })
        return true
      } else {
        baddie.hp -= damage
        setBaddieState({
          ...baddieState,
          baddieset: baddieset,
        })
        return false
      }
    }
  }

  const fightBoss = () => {
    const { bossData } = baddieState

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
        setBaddieState({
          ...baddieState,
          bossData,
        });
      }
    }
    return false;
  }

  return {
    combatState,
    setCombatState,
    flashMessage,
    takeDamage,
    heal,
    fight,
    fightBoss,
  }
}
