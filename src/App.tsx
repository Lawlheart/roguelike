import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './pages/Game'
import Lost from './pages/Lost'
import Vite from './pages/Vite'

import './styles/App.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/vite" element={<Vite/>} />
          <Route path="*" element={<Lost />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App