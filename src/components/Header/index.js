import {Link, withRouter} from 'react-router-dom'
import hamburger from '../../Hamburger.svg'

import './index.css'
import Covid19Context from '../../context/Covid19Context'
import NavbarHamburger from '../NavbarHamburger'

const Header = props => {
  const {match} = props
  const {path} = match

  return (
    <Covid19Context.Consumer>
      {value => {
        const {showHamburgerItems, toggleHamburgerItems} = value

        const onClickingHamburgerIcon = () => {
          toggleHamburgerItems()
        }

        return (
          <>
            <nav className="navbar-bg-container">
              <div className="navbar-container">
                <Link to="/" className="header-heading">
                  COVID19<span className="header-span-heading">INDIA</span>
                </Link>
                <button
                  type="button"
                  className="hamburger-button"
                  onClick={onClickingHamburgerIcon}
                >
                  <img src={hamburger} alt="HamburgerIcon" />
                </button>
                <div className="nav-items-container">
                  <Link
                    to="/"
                    className={`nav-items ${
                      path === '/' && 'active-route-color'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={`nav-items ${
                      path === '/about' && 'active-route-color'
                    }`}
                  >
                    About
                  </Link>
                </div>
              </div>
            </nav>
            {showHamburgerItems && (
              <NavbarHamburger
                toggleHamburgerItems={toggleHamburgerItems}
                path={path}
              />
            )}
          </>
        )
      }}
    </Covid19Context.Consumer>
  )
}

export default withRouter(Header)
