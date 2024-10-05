import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Welcome from './Welcome'

function Layout() {
  return (
    <>
      <div className="min-h-screen w-screen flex flex-col">
        <Header />
        <Welcome />
        <main className="hive max-w-6xl mx-auto flex-grow py-2 px-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
