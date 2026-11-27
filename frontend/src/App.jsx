import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './pages/Menu'
import Checkout from './pages/checkout'
import { useState } from 'react'

function App() {
  const [showCheckout, setShowCheckout] = useState(false)

  if (showCheckout) {
    return <Checkout />
  }

  return (
    <div className="min-h-screen bg-[#f7f3e9]">
      <Navbar />
      <Hero />
      <Menu onCheckout={() => setShowCheckout(true)} />
    </div>
  )
}

export default App