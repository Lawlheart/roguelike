function GameDisplay() {
  // var heroclass =
  // "sprite player " + this.state.sprite + " " + this.state.direction;
  // var herostyle = {
  //   top: this.pixels(this.state.ypos),
  //   left: this.pixels(this.state.xpos),
  // };
  // var mapmargin =
  //   "-" +
  //   this.pixels(this.state.bgy) +
  //   "px 0 0 -" +
  //   this.pixels(this.state.bgx) +
  //   "px";
  // var mapStyle = {
  //   height: this.pixels(this.state.gridheight),
  //   width: this.pixels(this.state.gridwidth),
  //   margin: mapmargin,
  // };
  // var weaponclass = "player-weapon gear " + this.state.weapon;
  // var healthBarClass =
  //   "health-bar health-val-" +
  //   Math.floor((this.state.health * 100) / this.state.maxhealth);


  // var display;
  // if (this.state.health === 0) {
  //   display = (
  //     <div
  //       className="box game-over"
  //       style={{
  //         width: this.pixels(this.state.viewwidth),
  //         height: this.pixels(this.state.viewheight),
  //       }}
  //     >
  //       <h1 style={{ color: "white" }}>GAME OVER</h1>
  //       <button className="play-again" onClick={this.resetGame}>
  //         Play Again?
  //       </button>
  //     </div>
  //   );
  // } else if (this.state.win) {
  //   display = (
  //     <div
  //       className="box game-win"
  //       style={{
  //         width: this.pixels(this.state.viewwidth),
  //         height: this.pixels(this.state.viewheight),
  //       }}
  //     >
  //       <h1 style={{ color: "white" }}>YOU WIN!</h1>
  //       <button className="play-again" onClick={this.resetGame}>
  //         Play Again?
  //       </button>
  //     </div>
  //   );
  // } else {
  //   display = (
  //     <div
  //       className="box"
  //       style={{
  //         width: this.pixels(this.state.viewwidth),
  //         height: this.pixels(this.state.viewheight),
  //       }}
  //     >
  //       <GameMap
  //         gridheight={this.state.gridheight}
  //         gridwidth={this.state.gridwidth}
  //         playing={this.state.playing}
  //         mapStyle={mapStyle}
  //         pixels={this.pixels}
  //         bgx={this.state.bgx}
  //         bgy={this.state.bgy}
  //         map={this.state.map}
  //         playerhealth={this.state.health}
  //         player={this.state.player}
  //         coords={this.state.coords}
  //         potions={this.state.potions}
  //         baddies={this.state.baddies}
  //         baddieset={this.state.baddieset}
  //         weapons={this.state.weapons}
  //         weaponset={this.state.weaponset}
  //         boss={this.state.boss}
  //         random={this.random}
  //         fight={this.fight}
  //         validMove={this.validMove}
  //         grid={this.state.grid}
  //       />
  //       <div
  //         className={heroclass}
  //         onKeyDown={this.moveSprite}
  //         style={herostyle}
  //       >
  //         <div className="floating-text">
  //           <div className="hit">{this.state.hitmessage}</div>
  //           <div className="hurt">{this.state.hurtmessage}</div>
  //           <div className="heal">{this.state.healmessage}</div>
  //           <div className="xp">{this.state.xpmessage}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }






  return (
    <div>GameDisplay</div>
  )
}

export default GameDisplay
