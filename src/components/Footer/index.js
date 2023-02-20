import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="footer-heading">
        COVID19<span className="footer-heading-1">INDIA</span>
      </h1>
      <p className="footer-para">
        we stand with everyone fighting on the front lines
      </p>
      <div>
        <VscGithubAlt className="footer-icons" />
        <FiInstagram className="footer-icons" />
        <FaTwitter className="footer-icons" />
      </div>
    </div>
  )
}
