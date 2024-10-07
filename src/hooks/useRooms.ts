import { useContext } from "react"

import { makeRoom, random } from "../helpers"
import { IRoom } from "../types"
import { GameContext } from "../context"

export function useRooms() {
  const { gameState } = useContext(GameContext)

  const intersects = (roomA: IRoom, roomB: IRoom) => {
    return (
      roomB.x1 - 1 <= roomA.x2 &&
      roomB.x2 + 1 >= roomA.x1 &&
      roomB.y1 - 1 <= roomA.y2 &&
      roomB.y2 + 1 >= roomA.y1
    )
  }

  const placeRooms = (): IRoom[] => {
    const {
      minRoomSize,
      maxRoomSize,
      gridwidth,
      gridheight,
      runs,
    } = gameState.map
    const rooms = []
    for (let i = 0; i < runs; i++) {
      const w = random(minRoomSize, maxRoomSize)
      const h = random(minRoomSize, maxRoomSize)
      const x = random(1, gridwidth - w - 2)
      const y = random(1, gridheight - h - 2)

      const newRoom: IRoom = makeRoom(x, y, w, h)

      let failed = false
      for (let j = 0; j < rooms.length; j++) {
        if (intersects(newRoom, rooms[j])) {
          failed = true
          break
        }
      }
      if (!failed) {
        rooms.push(newRoom)
      }
    }
    return [...rooms]
  }

  return {
    placeRooms,
    intersects,
  }
}