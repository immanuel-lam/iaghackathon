import { useState } from 'react'
import Navbar from './components/Navbar'
import AddressPage from './pages/AddressPage'
import SafeAheadAddressPage from './pages/SafeAheadAddressPage'
import RiskResultsPage from './pages/RiskResultsPage'
import EventDetailPage from './pages/EventDetailPage'
import './App.css'

function App() {
  const [page, setPage] = useState('quote')
  const [address, setAddress] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleContinue = (addr) => {
    setAddress(addr)
    setPage('results')
  }

  const handleBack = () => {
    setPage('address')
  }

  const handleSafeAhead = () => {
    setPage('address')
  }

  const handleAddressBack = () => {
    setPage('quote')
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setPage('event-detail')
  }

  const handleEventBack = () => {
    setPage('results')
  }

  return (
    <div className="app">
      <Navbar />
      {page === 'quote' && <AddressPage onContinue={handleContinue} onSafeAhead={handleSafeAhead} />}
      {page === 'address' && <SafeAheadAddressPage onContinue={handleContinue} onBack={handleAddressBack} />}
      {page === 'results' && <RiskResultsPage address={address} onBack={handleBack} onEventClick={handleEventClick} onContinueQuote={() => setPage('quote')} />}
      {page === 'event-detail' && <EventDetailPage event={selectedEvent} address={address} onBack={handleEventBack} />}
    </div>
  )
}

export default App
