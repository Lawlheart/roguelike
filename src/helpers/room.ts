import { IRoom } from "../types"

export class Room {
  constructor(x: number, y: number, w: number, h: number) {
    const x1 = x
    const x2 = x + w
    const y1 = y
    const y2 = y + h
    return ({
      x1,
      x2,
      y1,
      y2,
      center: [
        Math.floor((x1 + x2) / 2),
        Math.floor((y1 + y2) / 2),
      ]
    } as IRoom)
  }
}

export const makeRoom = (x: number, y: number, w: number, h: number): IRoom => {
  return new Room(x, y, h, w) as IRoom
}