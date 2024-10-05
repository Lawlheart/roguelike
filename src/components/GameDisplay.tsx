function GameDisplay() {
  function pixels(coord) {
    return coord * 32;
  }

  let heroclass =
  "sprite player " + state.sprite + " " + state.direction;
  let herostyle = {
    top: pixels(state.ypos),
    left: pixels(state.xpos),
  };
  let mapmargin =
    "-" +
    pixels(state.bgy) +
    "px 0 0 -" +
    pixels(state.bgx) +
    "px";
  let mapStyle = {
    height: pixels(state.gridheight),
    width: pixels(state.gridwidth),
    margin: mapmargin,
  };
  let weaponclass = "player-weapon gear " + state.weapon;
  let healthBarClass =
    "health-bar health-val-" +
    Math.floor((state.health * 100) / state.maxhealth);


  let display;
  if (state.health === 0) {
    display = (
      
    );
  } else if (state.win) {
    display = (
      <div
        className="box game-win"
        style={{
          width: pixels(state.viewwidth),
          height: pixels(state.viewheight),
        }}
      >
        <h1 style={{ color: "white" }}>YOU WIN!</h1>
        <button className="play-again" onClick={this.resetGame}>
          Play Again?
        </button>
      </div>
    );
  } else {
    display = (
      <div
        className="box"
        style={{
          width: pixels(state.viewwidth),
          height: pixels(state.viewheight),
        }}
      >
        <GameMap
          gridheight={state.gridheight}
          gridwidth={state.gridwidth}
          playing={state.playing}
          mapStyle={mapStyle}
          pixels={pixels}
          bgx={state.bgx}
          bgy={state.bgy}
          map={state.map}
          playerhealth={state.health}
          player={state.player}
          coords={state.coords}
          potions={state.potions}
          baddies={state.baddies}
          baddieset={state.baddieset}
          weapons={state.weapons}
          weaponset={state.weaponset}
          boss={state.boss}
          random={this.random}
          fight={this.fight}
          validMove={this.validMove}
          grid={state.grid}
        />
        <div
          className={heroclass}
          onKeyDown={this.moveSprite}
          style={herostyle}
        >
          <div className="floating-text">
            <div className="hit">{state.hitmessage}</div>
            <div className="hurt">{state.hurtmessage}</div>
            <div className="heal">{state.healmessage}</div>
            <div className="xp">{state.xpmessage}</div>
          </div>
        </div>
      </div>
    );
  }






  return (
    <div>GameDisplay</div>
  )
}

export default GameDisplay
