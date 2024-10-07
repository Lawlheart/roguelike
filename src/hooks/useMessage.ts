import { useContext } from "react"

import { GameContext } from "../context"

export function useMessage() {
  const { gameState, setGameState } = useContext(GameContext)

  const flashMessage = (message: string, messageType: string) => {
    let {
      hitmessage,
      hurtmessage,
      healmessage,
      xpmessage,
      messageCount: count,
    } = gameState.combat

    if (messageType === "hit") {
      hitmessage = message
    } else if (messageType === "hurt") {
      hurtmessage = message
    } else if (messageType === "heal") {
      healmessage = message
    } else if (messageType === "xp") {
      xpmessage = message
    }
    setGameState(
      {
        ...gameState,
        combat: {
          ...gameState.combat,
          hitmessage: hitmessage,
          hurtmessage: hurtmessage,
          healmessage: healmessage,
          xpmessage: xpmessage,
          messageCount: (count += 1),
        }
      }
    )
    
    setTimeout(function () {
      if (gameState.combat.messageCount === count) {
        setGameState(
          {
            ...gameState,
            combat: {
              ...gameState.combat,
              hitmessage: "",
              hurtmessage: "",
              healmessage: "",
              xpmessage: "",
              messageCount: (count += 1),
            }
          }
        )
      }
    }, 600)
  }

  return {
    flashMessage,
  }
}
