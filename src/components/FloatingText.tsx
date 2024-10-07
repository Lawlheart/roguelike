import { useContext } from "react"

import { GameContext } from "../context"

export const FloatingText = () => {
  const { gameState } = useContext(GameContext)
  const { 
    hitmessage, 
    hurtmessage, 
    healmessage, 
    xpmessage
  } = gameState.combat

  return (
    <div className="floating-text">
      <div className="hit">{hitmessage}</div>
      <div className="hurt">{hurtmessage}</div>
      <div className="heal">{healmessage}</div>
      <div className="xp">{xpmessage}</div>
    </div>
  )
}