import { useState } from 'react'
import './RiskResultsPage.css'

const riskData = [
  {
    id: 'flood',
    label: 'Flood',
    level: 'HIGH',
    stat: '3 events / 10 years',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
        <path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
        <path d="M12 3v8"/>
        <path d="M8 7l4-4 4 4"/>
      </svg>
    ),
  },
  {
    id: 'storm',
    label: 'Storm / Hail',
    level: 'HIGH',
    stat: '5 events / 10 years',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
        <polyline points="13 11 9 17 15 17 11 23"/>
      </svg>
    ),
  },
  {
    id: 'bushfire',
    label: 'Bushfire',
    level: 'LOW',
    stat: 'No events in area',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z"/>
      </svg>
    ),
  },
  {
    id: 'theft',
    label: 'Break-ins',
    level: 'ABOVE AVG',
    stat: '12% above state average',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
]

const coverageCategories = [
  {
    id: 'human',
    title: 'Human',
    color: '#D4537E',
    bgColor: '#FBEAF0',
    items: [
      { name: 'Theft or attempted theft', note: 'Must report to police', building: true, contents: true },
      { name: 'Deliberate / intentional act', note: 'Incl. vandalism and malicious acts', building: true, contents: true },
      { name: 'Riot or civil commotion', building: true, contents: true },
      { name: 'Animal damage', note: 'Animals not kept at the site', building: true, contents: true },
      { name: 'Identity theft', note: 'Up to $5k (Plus) / $2.5k (Standard)', building: false, contents: true },
      { name: 'Replacement of keys & locks', note: 'No excess applies', building: true, contents: true },
      { name: 'Visitors\' belongings', note: 'Up to $2,500 per incident', building: false, contents: true },
      { name: 'Legal liability – away from home', note: 'Up to $20M', building: false, contents: true },
    ],
  },
  {
    id: 'environ',
    title: 'Environmental / Natural',
    color: '#1D9E75',
    bgColor: '#E1F5EE',
    items: [
      { name: 'Earthquake', note: 'Incl. landslide within 72 hrs', building: true, contents: true },
      { name: 'Flood or rainwater run-off', note: 'Incl. landslide within 72 hrs', building: true, contents: true },
      { name: 'Storm', note: 'Rain, hail, snow, cyclone, tornado', building: true, contents: true },
      { name: 'Storm surge or tsunami', building: true, contents: true },
      { name: 'Lightning', note: 'Incl. power surge caused by lightning', building: true, contents: true },
      { name: 'Impact', note: 'Trees, vehicles, aircraft, satellite debris', building: true, contents: true },
      { name: 'Fire / bushfire', note: 'Deliberately lit or naturally occurring', building: true, contents: true },
      { name: 'Landscaping', note: 'Up to $3k (Plus) / $1.5k (Standard)', building: true, contents: false },
    ],
  },
  {
    id: 'systems',
    title: 'Home Systems',
    color: '#378ADD',
    bgColor: '#E6F1FB',
    items: [
      { name: 'Escape of water or liquid', note: 'Pipes, appliances, aquariums, pools', building: true, contents: true },
      { name: 'Accidental breakage of glass', note: 'Fixed glass, cooktops, sanitary ware', building: true, contents: true },
      { name: 'Electrical motor burnout', note: 'Motors up to 15 yrs old. Plus / Optional', building: true, contents: true },
      { name: 'Locating the cause of damage', note: 'Reasonable costs to find & access source', building: true, contents: false },
      { name: 'Legal liability – at the home', note: 'Up to $20M', building: true, contents: true },
      { name: 'Explosion', note: 'Physical evidence required', building: true, contents: true },
      { name: 'Accidental damage', note: 'Plus / Optional', building: true, contents: true },
    ],
  },
  {
    id: 'recovery',
    title: 'Recovery & Lifestyle',
    color: '#BA7517',
    bgColor: '#FAEEDA',
    items: [
      { name: 'Temporary accommodation', note: 'Up to 24 mths (Plus) / 12 mths (Standard)', building: true, contents: true },
      { name: 'Storage costs', note: 'While home is uninhabitable', building: false, contents: true },
      { name: 'Food spoilage', note: 'Up to $2k (Plus) / $500 (Standard). No excess', building: false, contents: true },
      { name: 'Funeral expenses', note: 'Up to $15k (Plus) / $10k (Standard)', building: true, contents: true },
      { name: 'Removal of debris', note: 'Up to 10% of sum insured', building: true, contents: true },
      { name: 'Professional & rebuilding fees', note: 'Architects, engineers, legal', building: true, contents: false },
      { name: 'Safety net', note: '25% extra if rebuild exceeds sum insured. Plus only', building: true, contents: false },
      { name: 'Contents away from home', note: 'Up to 20% of sum insured, 60 days', building: false, contents: true },
      { name: 'Contents in transit', note: 'Fire, theft, storm, flood, collision', building: false, contents: true },
      { name: 'Students living away from home', note: 'Up to $5,000', building: false, contents: true },
    ],
  },
]

const timeline = [
  {
    date: 'Mar 2022',
    title: 'Flash flooding',
    description: '140mm in 2 hours. 12 properties on this street affected. SES responded to 34 calls in the area.',
  },
  {
    date: 'Nov 2023',
    title: 'Severe hailstorm',
    description: '4cm hailstones. 28 vehicle damage claims and 9 roof damage claims within 2km.',
  },
  {
    date: 'Feb 2020',
    title: 'Heavy rainfall event',
    description: 'Minor street flooding. 3 water ingress claims on this block.',
  },
  {
    date: 'Dec 2018',
    title: 'Thunderstorm with wind damage',
    description: 'Gusts to 95km/h. Tree damage reported on neighbouring properties.',
  },
]

const actions = [
  {
    priority: 1,
    title: 'Add flood cover',
    description: 'Not included by default in this area. Properties here have a 30% chance of flood claim in any 10-year period.',
  },
  {
    priority: 2,
    title: 'Clean gutters before November',
    description: 'Storm season peaks Nov–Dec. Properties with maintained gutters had 60% fewer water ingress claims.',
  },
  {
    priority: 3,
    title: 'Move cars undercover during hail warnings',
    description: 'Saves $500+ excess. 28 vehicle claims from the Nov 2023 event alone.',
  },
  {
    priority: 4,
    title: 'Consider hail-rated roofing if renovating',
    description: 'Metal roofing rated for 4cm+ hail costs ~$3k more but avoids repeat claims.',
  },
]

function RiskResultsPage({ address, onBack, onEventClick, onContinueQuote }) {
  const [activeTab, setActiveTab] = useState('combined')
  const [expandedCategories, setExpandedCategories] = useState([])
  const [mainView, setMainView] = useState('covered')

  const getLevelClass = (level) => {
    if (level === 'HIGH') return 'level-high'
    if (level === 'LOW') return 'level-low'
    return 'level-moderate'
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <div className="results-header-content">
          <button className="back-link" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button>
          <div className="results-address-row">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h2 className="results-address">{address}</h2>
          </div>
          <p className="results-subtitle">Property risk profile based on historical data (2015–2025)</p>
          <div className="risk-cards-grid">
            {riskData.map((risk) => (
              <div key={risk.id} className={`risk-card ${getLevelClass(risk.level)}`}>
                <div className="risk-card-icon">{risk.icon}</div>
                <div className="risk-card-info">
                  <span className="risk-card-label">{risk.label}</span>
                  <span className={`risk-card-level ${getLevelClass(risk.level)}`}>{risk.level}</span>
                </div>
                <span className="risk-card-stat">{risk.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="results-body">
        <div className="main-view-tabs">
          <button
            className={`main-view-tab ${mainView === 'covered' ? 'active' : ''}`}
            onClick={() => setMainView('covered')}
          >
            What's Covered
          </button>
          <button
            className={`main-view-tab ${mainView === 'happened' ? 'active' : ''}`}
            onClick={() => setMainView('happened')}
          >
            Historical Incidents
          </button>
        </div>

        {mainView === 'covered' && (
        <section className="breakdown-section">
          <div className="breakdown-tabs">
            <button
              className={`breakdown-tab ${activeTab === 'combined' ? 'active' : ''}`}
              onClick={() => setActiveTab('combined')}
            >
              Combined
            </button>
            <button
              className={`breakdown-tab ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Building
            </button>
            <button
              className={`breakdown-tab ${activeTab === 'contents' ? 'active' : ''}`}
              onClick={() => setActiveTab('contents')}
            >
              Contents
            </button>
          </div>
          <div className="accordion-list">
            {coverageCategories.map((cat) => {
              const isExpanded = expandedCategories.includes(cat.id)
              const coveredCount = activeTab === 'combined'
                ? cat.items.length
                : cat.items.filter((item) =>
                    activeTab === 'home' ? item.building : item.contents
                  ).length
              return (
                <div key={cat.id} className="accordion-item">
                  <button
                    className="accordion-header"
                    onClick={() =>
                      setExpandedCategories(
                        isExpanded
                          ? expandedCategories.filter((id) => id !== cat.id)
                          : [...expandedCategories, cat.id]
                      )
                    }
                  >
                    <div className="accordion-header-left">
                      <span className="accordion-dot" style={{ backgroundColor: cat.color }} />
                      <span className="accordion-title">{cat.title}</span>
                      <span className="accordion-count">
                        {activeTab === 'combined'
                          ? `${cat.items.length} events`
                          : `${coveredCount}/${cat.items.length} covered`
                        }
                      </span>
                    </div>
                    <svg
                      className={`accordion-chevron ${isExpanded ? 'expanded' : ''}`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="accordion-body">
                      {cat.items.map((item, i) => {
                        const isCovered =
                          activeTab === 'combined' ||
                          (activeTab === 'home' && item.building) ||
                          (activeTab === 'contents' && item.contents)
                        return (
                          <div
                            key={i}
                            className={`coverage-row ${!isCovered ? 'greyed-out' : ''}`}
                            onClick={() => onEventClick && onEventClick({ ...item, categoryTitle: cat.title, categoryColor: cat.color })}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="coverage-row-left">
                              <span className="coverage-name">{item.name}</span>
                              {item.note && <span className="coverage-note">{item.note}</span>}
                            </div>
                            <div className="coverage-tags">
                              {item.building && (
                                <span className={`cover-tag tag-building ${activeTab === 'contents' && !item.contents ? '' : ''}`}>
                                  Building
                                </span>
                              )}
                              {item.contents && (
                                <span className="cover-tag tag-contents">Contents</span>
                              )}
                              {!item.building && !item.contents && (
                                <span className="cover-tag tag-none">—</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
        )}

        {mainView === 'happened' && (
        <section className="timeline-section">
          <div className="timeline">
            {timeline.map((event, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-date">{event.date}</span>
                  <h4 className="timeline-title">{event.title}</h4>
                  <p className="timeline-desc">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        <section className="actions-section">
          <h3 className="section-heading">What you can do</h3>
          <p className="actions-intro">Based on what happens at properties like yours, these are the top actions to protect your home.</p>
          <div className="actions-list">
            {actions.map((action) => (
              <div key={action.priority} className="action-item">
                <span className="action-number">{action.priority}</span>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                  <p className="action-desc">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-card">
            <h3>Ready to get your quote?</h3>
            <p>This risk data will be factored into your personalised cover recommendation.</p>
            <button className="btn-continue-quote" onClick={() => onContinueQuote && onContinueQuote()}>Continue to quote</button>
          </div>
        </section>

        <footer className="results-footer">
          <p>Data sourced from Bureau of Meteorology, SES incident records, NSW RFS, ABS crime statistics, and Insurance Council of Australia catastrophe records. Last updated June 2025.</p>
        </footer>
      </div>
    </div>
  )
}

export default RiskResultsPage
