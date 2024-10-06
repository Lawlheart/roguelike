import { useMap } from "../hooks"

function GameSidebar() {
  const { mapState } = useMap()

  return (
    <div className="sidebar">
      <div className="baddies-box clearfix">
        <h2>Baddies</h2>
        <h4>Easy</h4>
        <div className="sprite baddie blue info right" />
        <h4>Hard</h4>
        <div className="sprite baddie red info right" />
        <h4>Deadly</h4>
        <div className="sprite baddie gold info right" />
        <h4>Boss</h4>
        <div className="sprite boss info" />
      </div>
      <div className="weapons-box clearfix">
        <h2>Weapons</h2>
        <h4>Weakest</h4>
        <div className="gear dagger info" />
        <h4>Weak</h4>
        <div className="gear staff info" />
        <h4>Strong</h4>
        <div className="gear sword info" />
        <h4>Strongest</h4>
        <div className="gear maul info" />
      </div>
      <div className="potions-box clearfix">
        <h2>Potions</h2>
        <h4>{mapState.potions.length} on map</h4>
        <div className="gear potion info" />
      </div>
      <div className="objective-box clearfix">
        <h2>Objective</h2>
        <h4>Kill the boss</h4>
      </div>
    </div>
  )
}

export default GameSidebar
