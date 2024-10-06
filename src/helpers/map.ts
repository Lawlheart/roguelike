export const asPixels = (coord: number): number => {
  return coord * 32
}

export const coordIndex = (
  coords: number[][],
  position: number[]
): number => {
  for (let i = 0; i < coords.length; i++) {
    if (
      coords[i][0] == position[0] &&
      coords[i][1] == position[1]
    ) {
      return i
    }
  }
  return -1
}
