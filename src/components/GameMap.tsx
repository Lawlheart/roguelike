import { ReactElement } from "react"

import { asPixels } from "../helpers"
import { useGame, useMap } from "../hooks"

function GameMap() {
  const { gameState: {
    map: {
      map,
      gridheight,
      gridwidth,
      potions,
      bgx,
      bgy
    },
    baddies: {
      baddieCoords,
      baddieset,
      baddieFoot,
      bossCoords,
    },
    combat: {
      weaponCoords,
      weaponset,
    },
  } } = useGame()
  const { fogCheck } = useMap()

  const mapStyle = {
    height: asPixels(gridheight),
    width: asPixels(gridwidth),
    margin: `-${asPixels(bgy)}px 0 0 -${asPixels(bgx)}px`,
  }

  const tiles = gridheight * gridwidth

  let grid: ReactElement[] = []

  const walls = [...Array(tiles)].map((_, index) => {
    const x = index % gridwidth
    const y = Math.floor(index / gridwidth)

    const wallClass = map[y][x] === 0 ? 'wall': ''
    const coordClass = `coords-x-${x} coords-y-${y}`
    const fogClass = fogCheck(x, y) ? 'fog' : ''

    const classname = `tile ${wallClass} ${coordClass} ${fogClass}`

    const tileKey = `tile-x${x}-y${y}`
    return (
      <div className={classname} key={tileKey} />
    )
  })

  grid = [...grid, ...walls]

  const placedPotions = [...Array(potions.length)].map((_, index) => {
    const coordClass = `x-${potions[index][0]} y-${potions[index][1]}`
    const fogClass = fogCheck(potions[index][0], potions[index][1]) ? 'fog' : ''

    return (
      <div
        className={`gear potion ${coordClass} ${fogClass}`}
        key={`potion-${index}`}
        style={{
          left: asPixels(potions[index][0]),
          top: asPixels(potions[index][1]),
        }}
      />
    )
  })

  grid = [...grid, ...placedPotions]

  const placedBaddies = [...Array(baddieCoords.length)].map((_, index) => {

    const sprite = `sprite baddie `
    const color = baddieset[index].color
    const coords = `x-${baddieCoords[index][0]}  y-${baddieCoords[index][1]}`
    const fog = fogCheck(baddieCoords[index][0], baddieCoords[index][1]) ? 'fog' : ''
    
    return (
      <div
        className={`${sprite} ${color} ${baddieFoot} ${coords} ${fog}`}
        key={`baddie-${index}`}
        style={{
          left: asPixels(baddieCoords[index][0]),
          top: asPixels(baddieCoords[index][1]),
        }}
      />
    )
  })

  grid = [...grid, ...placedBaddies]

  const placedWeapons = [...Array(weaponCoords.length)].map((_, index) => {
    const weaponclass = `gear ${weaponset[index]}`
    const coordClass = `x-${weaponCoords[index][0]} y-${weaponCoords[index][1]}`
    const fogClass = fogCheck(weaponCoords[index][0], weaponCoords[index][1]) ? 'fog' : ''
    const className = `${weaponclass} ${coordClass} ${ fogClass}`

    return (
      <div
        className={className}
        key={`weapon-${index}`}
        style={{
          left: asPixels(weaponCoords[index][0]),
          top: asPixels(weaponCoords[index][1]),
        }}
      />
    )
  })

  grid = [...grid, ...placedWeapons]

  const placedBosses = [...Array(bossCoords.length)].map((_, index) => {
    const boss = bossCoords[0]
    const fogClass = fogCheck(boss[0], boss[1]) ? 'fog' : ''

    return (
      <div
        className={`sprite boss ${fogClass}`}
        key={`boss-${index}`}
        style={{
          left: asPixels(boss[0]),
          top: asPixels(boss[1]),
        }}
      />
    )
  })

  grid = [...grid, ...placedBosses]

  return (
    <div className="map" style={mapStyle}>
      {grid}
    </div>
  )
}

export default GameMap
