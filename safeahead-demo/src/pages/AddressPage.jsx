import { useState } from 'react'
import './AddressPage.css'

function AddressPage({ onContinue, onSafeAhead }) {
  const [address, setAddress] = useState('14 River Rd, Penrith NSW 2750')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (address.trim()) {
      onContinue(address)
    }
  }

  return (
    <div className="address-page">
      <div className="address-page-content">
        <h1 className="address-page-title">
          Let's get your home<br />insurance quote
        </h1>

        <button type="button" className="btn-safeahead-top" onClick={() => onSafeAhead && onSafeAhead()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          What's Actually Covered?
        </button>

        <div className="quote-card">
          <h3 className="quote-card-label">Your home policy type</h3>
          <div className="policy-type-box">
            <div className="policy-type-icons">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 7V5a4 4 0 0 0-8 0v2"/>
                <line x1="12" y1="11" x2="12" y2="15"/>
              </svg>
            </div>
            <span className="policy-type-text">Home Building and Contents Insurance</span>
          </div>
          <button className="link-btn">See other home policy types</button>
        </div>

        <div className="quote-card">
          <h3 className="quote-card-label">When should we start this policy?</h3>
          <div className="date-input-wrapper">
            <input
              type="text"
              className="date-input"
              defaultValue="23/06/2026"
              readOnly
            />
            <svg className="date-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
        </div>

        <div className="quote-card quote-card-highlight">
          <h3 className="quote-card-label">What is the address of your home?</h3>
          <form onSubmit={handleSubmit}>
            <div className="address-input-wrapper">
              <input
                type="text"
                className="address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Start typing and select from the list"
              />
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted-text)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <button type="button" className="link-btn">Can't see your address? Enter your address manually</button>
            <button type="submit" className="btn-continue">
              Continue
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default AddressPage
