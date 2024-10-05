import useBaddies from "../hooks"
import { IBaddiesState } from "../types"
import { random } from "../helpers"

function useCombat() {
  const [baddieState, setBaddieState] = useBaddies()

  const fight = (baddieIndex: number) => {
    const { baddieset, baddies } = baddieState as IBaddiesState
    const baddie = baddieset[baddieIndex];
    const lives = this.takeDamage(random(baddie.mindmg, baddie.maxdmg));
    if (lives) {
      const damage = this.playerDamage();
      if (damage >= baddie.hp) {
        baddieset.splice(baddieIndex, 1);
        baddies.splice(baddieIndex, 1);
        this.flashMessage("+ " + 10 * baddie.level + " xp", "xp");
        this.checkForLevelUp(this.state.xp + 10 * baddie.level);
        this.setState({
          xp: this.state.xp + 10 * baddie.level,
          baddies: baddies,
          baddieset: baddieset,
        });
        return true;
      } else {
        baddie.hp -= damage;
        this.setState({
          baddieset: baddieset,
        });
        return false;
      }
    }
  }
}