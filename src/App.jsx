import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Transaction from './pages/Transaction'
import Payment from './pages/Payment'
import QrPayment from './pages/QrPayment'
function App() {

  return (
    <div className="container is-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/QrPayment" element={<QrPayment />} />
      </Routes>
    </div>
  )
  
}

export default App
