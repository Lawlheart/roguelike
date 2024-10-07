import { useContext, useEffect, useState } from "react"

import { asPixels } from "../helpers"
import { useGame, useMap } from "../hooks"
import { GameContext } from "../context"

function GameMap() {
  const { gameState } = useContext(GameContext)
  const [wallElements, setWallElements] = useState<React.ReactNode[]>([])
  const [potionElements, setPotionElements] = useState<React.ReactNode[]>([])
  const [baddieElements, setBaddieElements] = useState<React.ReactNode[]>([])
  const [weaponElements, setWeaponElements] = useState<React.ReactNode[]>([])
  const [bossElements, setBossElements] = useState<React.ReactNode[]>([])
  const { fogCheck } = useMap()

  const { initialize } = useGame()
  
  const {
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
  } = gameState
  // console.log(gameState)

  const tiles = gridheight * gridwidth

  // Renders the different elements: Walls, Baddies, Player, Potions
  // TODO Abstract this part better
  useEffect(() => {
    initialize()
  }, ['once'])

  // Add Walls to the Map through the Grid Array
  useEffect(() => {
    if (!map) return
    console.log('Attempting to generate walls', map)
    const walls = [...Array(tiles)].map((_, index) => {
      const x = index % gridwidth
      const y = Math.floor(index / gridwidth)
  
      const wallClass = map && map[y] && map[y][x] === 0 ? 'wall': ''
      const coordClass = `coords-x-${x} coords-y-${y}`
      const fogClass = fogCheck(x, y) ? 'fog' : ''
  
      const classname = `tile ${wallClass} ${coordClass} ${fogClass}`
  
      const tileKey = `tile-x${x}-y${y}`
      return (
        <div className={classname} key={tileKey} />
      )
    })
    setWallElements(walls)
    console.log('generated walls', walls)
  }, [map])

  // Add Potions to the Map through the Grid Array
  useEffect(() => {
    if (!potions) return
    console.log('Attempting to generate Potions', potions)
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
    console.log('generated potions', placedPotions)
    setPotionElements(placedPotions)
  }, [potions])

  // Add Baddies to the Map through the Grid Array
  useEffect(() => {
    if (!baddieset) return
    console.log('Attempting to generate Baddies', baddieset)
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
    setBaddieElements(placedBaddies)
    console.log('generated baddies', placedBaddies)
  }, [baddieCoords, baddieFoot, baddieset ])

  // Add Weapons to the Map through the Grid Array
  useEffect(() => {
    if (!weaponCoords) return
    console.log('Attempting to generate weapons', weaponCoords)
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
    setWeaponElements(placedWeapons)
    console.log('generated weapons', placedWeapons)
  }, [weaponset, weaponCoords])

  // Add Boss to the Map through the Grid Array
  useEffect(() => {
    if (!bossCoords) return
    console.log('Attempting to generate the boss', bossCoords)
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
    setBossElements(placedBosses)
    console.log('generated the boss', placedBosses)
  }, [bossCoords])

  return (
    <div
      className="map"
      style={{
        height: asPixels(gridheight),
        width: asPixels(gridwidth),
        margin: `-${asPixels(bgy)}px 0 0 -${asPixels(bgx)}px`,
    }}>
      { wallElements }
      { potionElements }
      { baddieElements }
      { weaponElements }
      { bossElements }
    </div>
  )
}

export default GameMap
