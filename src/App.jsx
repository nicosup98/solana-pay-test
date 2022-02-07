import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
function App() {

  return (
    <div className="container is-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
  
}

export default App
