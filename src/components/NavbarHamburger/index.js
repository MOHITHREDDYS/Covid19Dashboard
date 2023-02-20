import {Link} from 'react-router-dom'

import closeIcon from '../../CloseIcon.svg'

import './index.css'

const NavbarHamburger = props => {
  const {toggleHamburgerItems, path} = props

  let color1 = ''
  let color2 = ''

  if (path === '/') {
    color1 = 'active-route-color'
  }

  if (path === '/about') {
    color2 = 'active-route-color'
  }

  return (
    <div className="ham-items-bg-container">
      <div className="ham-items-container">
        <div>
          <Link
            to="/"
            className={`hamburger-item ${color1}`}
            onClick={toggleHamburgerItems}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hamburger-item ${color2}`}
            onClick={toggleHamburgerItems}
          >
            About
          </Link>
        </div>
        <button
          type="button"
          className="close-icon-button"
          onClick={toggleHamburgerItems}
        >
          <img src={closeIcon} alt="CloseIcon" />
        </button>
      </div>
    </div>
  )
}

export default NavbarHamburger
