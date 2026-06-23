import pdsData from '../data/pds-coverage.json'
import './EventDetailPage.css'

const nameToKey = {
  'Theft or attempted theft': 'theft_or_attempted_theft',
  'Deliberate / intentional act': 'deliberate_or_intentional_act',
  'Riot or civil commotion': 'riot_or_civil_commotion',
  'Animal damage': 'animal_damage',
  'Identity theft': 'identity_theft',
  'Replacement of keys & locks': 'replacement_of_keys_and_locks',
  "Visitors' belongings": 'visitors_belongings',
  'Legal liability – away from home': 'legal_liability_away_from_home',
  'Legal liability – at the home': 'legal_liability_at_the_home',
  'Earthquake': 'earthquake',
  'Flood or rainwater run-off': 'flood_or_rainwater_runoff',
  'Storm': 'storm',
  'Storm surge or tsunami': 'storm_surge_or_tsunami',
  'Lightning': 'lightning',
  'Impact': 'impact',
  'Fire / bushfire': 'fire_or_bushfire',
  'Landscaping': 'landscaping',
  'Escape of water or liquid': 'escape_of_water_or_liquid',
  'Accidental breakage of glass': 'accidental_breakage_of_glass',
  'Electrical motor burnout': 'electrical_motor_burnout',
  'Locating the cause of damage': 'locating_the_cause_of_damage',
  'Explosion': 'explosion',
  'Accidental damage': 'accidental_damage',
  'Temporary accommodation': 'temporary_accommodation',
  'Storage costs': 'storage_costs',
  'Food spoilage': 'food_spoilage',
  'Funeral expenses': 'funeral_expenses',
  'Removal of debris': 'removal_of_debris',
  'Professional & rebuilding fees': 'professional_and_rebuilding_fees',
  'Safety net': 'safety_net',
  'Contents away from home': 'contents_away_from_home',
  'Contents in transit': 'contents_in_transit',
  'Students living away from home': 'students_living_away_from_home',
}

const frequencyData = {
  'identity_theft': [
    { year: '2019', count: 12 },
    { year: '2020', count: 18 },
    { year: '2021', count: 24 },
    { year: '2022', count: 31 },
    { year: '2023', count: 38 },
    { year: '2024', count: 45 },
  ],
  'theft_or_attempted_theft': [
    { year: '2019', count: 28 },
    { year: '2020', count: 22 },
    { year: '2021', count: 25 },
    { year: '2022', count: 30 },
    { year: '2023', count: 27 },
    { year: '2024', count: 32 },
  ],
  'flood_or_rainwater_runoff': [
    { year: '2019', count: 2 },
    { year: '2020', count: 5 },
    { year: '2021', count: 3 },
    { year: '2022', count: 14 },
    { year: '2023', count: 4 },
    { year: '2024', count: 6 },
  ],
  'storm': [
    { year: '2019', count: 8 },
    { year: '2020', count: 12 },
    { year: '2021', count: 9 },
    { year: '2022', count: 15 },
    { year: '2023', count: 18 },
    { year: '2024', count: 11 },
  ],
  'escape_of_water_or_liquid': [
    { year: '2019', count: 6 },
    { year: '2020', count: 8 },
    { year: '2021', count: 7 },
    { year: '2022', count: 9 },
    { year: '2023', count: 11 },
    { year: '2024', count: 10 },
  ],
}

const defaultFrequency = [
  { year: '2019', count: 4 },
  { year: '2020', count: 6 },
  { year: '2021', count: 5 },
  { year: '2022', count: 8 },
  { year: '2023', count: 7 },
  { year: '2024', count: 9 },
]

const incidentsData = {
  'identity_theft': [
    { date: 'Sep 2024', description: 'Data breach at major retailer exposed 2.1M customer records. 45 claims in this postcode.' },
    { date: 'Mar 2023', description: 'Phishing campaign targeted western Sydney residents. 12 identity theft claims in area.' },
    { date: 'Nov 2022', description: 'Mail theft ring operating in Penrith/Eastern Creek corridor. 8 victims on nearby streets.' },
  ],
  'flood_or_rainwater_runoff': [
    { date: 'Mar 2022', description: 'Flash flooding — 140mm in 2 hours. 12 properties on this street affected. SES responded to 34 calls.' },
    { date: 'Feb 2020', description: 'Heavy rainfall event. Minor street flooding. 3 water ingress claims on this block.' },
    { date: 'Apr 2017', description: 'East Coast Low brought sustained heavy rain. Multiple properties reported water damage.' },
  ],
  'storm': [
    { date: 'Nov 2023', description: 'Severe hailstorm — 4cm hailstones. 28 vehicle damage claims and 9 roof damage claims within 2km.' },
    { date: 'Dec 2018', description: 'Thunderstorm with gusts to 95km/h. Tree damage reported on neighbouring properties.' },
    { date: 'Jan 2020', description: 'Severe thunderstorm with heavy rain. Gutter overflow caused minor ceiling damage in 4 homes.' },
  ],
  'theft_or_attempted_theft': [
    { date: 'Jan 2024', description: 'Holiday period break-in cluster. 6 properties targeted within 1km over 2 weeks.' },
    { date: 'Jul 2023', description: 'Attempted theft reported on this street. No entry gained.' },
    { date: 'Dec 2022', description: 'Package theft from doorsteps reported by 3 neighbours in December period.' },
  ],
}

const defaultIncidents = [
  { date: '2023', description: 'Multiple incidents recorded in surrounding area within the last 2 years.' },
  { date: '2022', description: 'Claims activity recorded for this postcode. Contact NRMA for detailed history.' },
]

function EventDetailPage({ event, address, onBack }) {
  if (!event) return null

  const key = nameToKey[event.name] || null
  const pds = key ? pdsData[key] : null
  const frequency = (key && frequencyData[key]) || defaultFrequency
  const incidents = (key && incidentsData[key]) || defaultIncidents
  const maxCount = Math.max(...frequency.map((d) => d.count))

  return (
    <div className="event-detail-page">
      <div className="event-detail-header">
        <div className="event-detail-header-content">
          <button className="back-link" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to results
          </button>
          <h2 className="event-detail-title">{event.name}</h2>
          <div className="event-detail-meta">
            <span className="event-detail-address">{address}</span>
          </div>
        </div>
      </div>

      <div className="event-detail-body">
        <section className="event-section">
          <div className="event-section-heading-row">
            <h3 className="event-section-heading">Definition</h3>
            <div className="event-section-tags">
              <span className="event-cat-tag" style={{ backgroundColor: event.categoryColor + '20', color: event.categoryColor }}>
                {event.categoryTitle}
              </span>
              {pds?.plusOnly && <span className="cover-tag tag-plus">Plus only</span>}
            </div>
          </div>
          <p className="event-definition">
            {pds ? pds.definition : 'Coverage for damage or loss caused by this event type. Refer to your Product Disclosure Statement for full terms.'}
          </p>
          <span className="pds-source">Source: NRMA Home Insurance PDS (Sep 2023)</span>
        </section>

        <section className="event-section">
          <div className="event-section-heading-row">
            <h3 className="event-section-heading">Coverage details</h3>
            <div className="event-section-tags">
              {event.building && <span className="cover-tag tag-building">Building</span>}
              {event.contents && <span className="cover-tag tag-contents">Contents</span>}
            </div>
          </div>
          <p className="event-definition">
            {pds ? pds.coverageDetails : 'Covered under standard home insurance policy. Check your PDS for specific limits and exclusions.'}
          </p>
        </section>

        {pds?.exclusions && (
          <section className="event-section">
            <h3 className="event-section-heading">What's not covered</h3>
            <p className="event-exclusions">{pds.exclusions}</p>
          </section>
        )}

        <section className="event-section">
          <h3 className="event-section-heading">Frequency in your area</h3>
          <p className="event-chart-subtitle">Claims recorded within 2km of {address}</p>
          <div className="event-chart">
            {frequency.map((d) => (
              <div key={d.year} className="chart-bar-group">
                <span className="chart-value">{d.count}</span>
                <div className="chart-bar-container">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(d.count / maxCount) * 100}%`,
                      backgroundColor: event.categoryColor,
                    }}
                  />
                </div>
                <span className="chart-label">{d.year}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="event-section">
          <h3 className="event-section-heading">Recent incidents near you</h3>
          <div className="event-incidents">
            {incidents.map((incident, i) => (
              <div key={i} className="event-incident-item" style={{ borderLeftColor: event.categoryColor }}>
                <span className="event-incident-date">{incident.date}</span>
                <p className="event-incident-desc">{incident.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default EventDetailPage
