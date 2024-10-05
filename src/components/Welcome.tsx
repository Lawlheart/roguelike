function Welcome() {
  const taglines = [
    "Beat the Boss to Win",
    "Use the Arrow keys or WASD to move"
  ]

  return (
    <section className="bg-blue-500 text-sm flex flex-wrap font-bold justify-center">
      { taglines.map((tagline, index) => (
      <div key={index} className={'px-4' + (index % 2 ? ' text-gold-500' : '')}>
        {tagline}
      </div>
    )) }
    </section>
  )
}

export default Welcome