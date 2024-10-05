import { Link } from 'react-router-dom'

function Header() {
  const headerNav = [
    {
      text: 'Home',
      link: '',
    }, 
    {
      text: 'Vue Demo',
      link: 'vite',
    }
  ]
  return (
    <>
      <header className="containerized p-4 flex">
        <span className="title py-2 px-4">
          Roguelike Dungeon Game
        </span>
        <nav className="flex">
          <ul className="flex">
            { headerNav.map(({ text, link }) => (
              <li className="py-2 px-4">
                <Link to={link}>
                  { text }
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
