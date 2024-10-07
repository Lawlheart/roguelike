import GameDisplay from '../components/GameDisplay'
import GameProvider from '../components/GameProvider'
import { useGame } from '../hooks'

function Game() {
  const { moveSprite } = useGame()

  const validKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyR']

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault()
    if (!validKeys.includes(e.code)) return
    moveSprite(e.code)
  }

  return (
    <GameProvider>
      <main
      className="game-view"
      tabIndex={0}
      onKeyDown={handleKeyDown}>
          <GameDisplay></GameDisplay>
      </main>
    </GameProvider>
  )
}

export default Game
