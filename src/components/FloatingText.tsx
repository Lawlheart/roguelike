import { useCombat } from "../hooks"

export const FloatingText = () => {
  const { 
    combatState: { 
      hitmessage, 
      hurtmessage, 
      healmessage, 
      xpmessage
    }
  } = useCombat()

  return (
    <div className="floating-text">
      <div className="hit">{hitmessage}</div>
      <div className="hurt">{hurtmessage}</div>
      <div className="heal">{healmessage}</div>
      <div className="xp">{xpmessage}</div>
    </div>
  )
}