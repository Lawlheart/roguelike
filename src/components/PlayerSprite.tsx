import { useGame } from "../hooks"
import { FloatingText } from "./FloatingText"
import { asPixels } from "../helpers"

export const PlayerSprite = () => {
  const {
    gameState: {
      player: {
        sprite,
        direction,
        xpos,
        ypos
      }
    },
    moveSprite
  } = useGame()

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