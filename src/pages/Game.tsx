import GameInterface from '../components/GameInterface'
import GameDisplay from '../components/GameDisplay'

function Game() {
  return (
    <div
    className="game-view"
    // key={this.state.playing}
    >
        
        <GameInterface></GameInterface>
        <GameDisplay></GameDisplay>
      </div>
  )
}

export default Game
