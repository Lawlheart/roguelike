import { useEffect, useState } from 'react'

import { PLAYER_INITIAL_STATE } from '../config/player'

function usePlayer() {
  const [playerState, setPlayerState] = useState(PLAYER_INITIAL_STATE)

  useEffect(() => {
    return () => {
      
    };
  }, [playerState])
  return [playerState, setPlayerState]
}

export default usePlayer
