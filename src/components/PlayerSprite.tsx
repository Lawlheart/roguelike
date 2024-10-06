import { useContext } from "react"

import { FloatingText } from "./FloatingText"
import { asPixels } from "../helpers"
import { GameContext } from '../context'


export const PlayerSprite = () => {
  const gameState = useContext(GameContext)

  const {
    player: {
      sprite,
      direction,
      xpos,
      ypos
    }
  } = gameState

  const heroclass = `sprite player ${sprite} ${direction}`
  const herostyle = {
    top: asPixels(ypos),
    left: asPixels(xpos),
  }

  return (
    <div
        className={heroclass}
        onKeyDown={moveSprite}
        style={herostyle}
      >
        <FloatingText />
      </div>
  )
}