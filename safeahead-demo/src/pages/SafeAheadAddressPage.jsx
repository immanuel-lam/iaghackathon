import { useState } from 'react'
import './SafeAheadAddressPage.css'

function SafeAheadAddressPage({ onContinue, onBack }) {
  const [address, setAddress] = useState('14 River Rd, Penrith NSW 2750')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (address.trim()) {
      onContinue(address)
    }
  }

  return (
    <div className="sa-address-page">
      <div className="sa-hero">
        <div className="sa-hero-content">
          <button className="sa-back-link" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to quote
          </button>
          <h1>What's Actually Covered?</h1>
          <p className="sa-subtitle">Enter your address to see historical risk data and what your policy covers at this location.</p>
        </div>
      </div>

      <div className="sa-form-container">
        <div className="sa-card">
          <form onSubmit={handleSubmit}>
            <label className="sa-label" htmlFor="sa-address-input">
              Property address
            </label>
            <div className="sa-input-wrapper">
              <svg className="sa-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8f8a8a" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                id="sa-address-input"
                type="text"
                className="sa-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your property address"
              />
            </div>
            <button type="submit" className="sa-btn-continue">
              See what's covered
            </button>
          </form>

          <div className="sa-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mid-blue)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>We'll show you historical incidents, risk data, and coverage details for this address</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SafeAheadAddressPage
