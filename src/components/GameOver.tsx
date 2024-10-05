function GameOver() {
  return (
    <div
      className="box game-over"
      style={{
        width: pixels(state.viewwidth),
        height: pixels(state.viewheight),
      }}
    >
      <h1 style={{ color: "white" }}>GAME OVER</h1>
      <button className="play-again" onClick={this.resetGame}>
        Play Again?
      </button>
    </div>
  )
}

export default GameOver
