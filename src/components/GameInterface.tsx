import { useGame } from "../hooks"

function GameInterface() {
  const { gameState: {
    player: {
      player,
      health,
      maxhealth,
      weapon,
      level,
      xp,
    }
  } } = useGame()

  const weaponclass = `player-weapon gear ${weapon}`
    
  const healthBarClass = `health-bar health-val-${
    Math.floor((health * 100) / maxhealth)
  }`

  return (
    <div className="user-interface">
      <div className="player-stats">
        <h3 className="player-level">Level {level}</h3>
        <h4 className="player-xp">XP: {xp}</h4>
        <h4 className="weapon-label">Weapon</h4>
        <div className={weaponclass} />
      </div>
      <h1 className="coords">coordinates: {player.join(", ")}</h1>
      <div className="health-bar-container">
        <div className={healthBarClass} />
      </div>
    </div>
  )
}

export default GameInterface
