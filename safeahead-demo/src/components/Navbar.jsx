import './Navbar.css'
import nrmaLogo from '../assets/nrma-logo.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={nrmaLogo} alt="NRMA Insurance" className="navbar-logo-img" />
          </div>
        </div>
        <div className="navbar-right">
          <button className="btn-help-nav">Help</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
