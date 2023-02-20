// import NavbarHamburger from '../NavbarHamburger'
import hamburger from '../../Hamburger.svg'

import './index.css'

const Header = () => {
  console.log('Header')
  return (
    <nav className="navbar-bg-container">
      <div className="navbar-container">
        <h1 className="header-heading">
          COVID19<span className="header-span-heading">INDIA</span>
        </h1>
        <button type="button" className="hamburger-button">
          <img src={hamburger} alt="HamburgerIcon" className="hamburger-icon" />
        </button>
      </div>
    </nav>
  )
}

export default Header
