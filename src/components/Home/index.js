import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import './index.css'
import Covid19Context from '../../context/Covid19Context'
import ConfirmedIcon from '../ConfirmedIcon'
import ActiveIcon from '../ActiveIcon'
import RecoveredIcon from '../RecoveredIcon'
import DeceasedIcon from '../DeceasedIcon'
import StateWiseTable from '../StateWiseTable'
import Footer from '../Footer'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  SUCCESS: 'SUCCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusList.initial,
    stateDetailsList: [],
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
  }

  componentDidMount() {
    this.getAllDetails()
  }

  getAllDetails = async () => {
    this.setState({apiStatus: apiStatusList.loading})

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'

    const response = await fetch(url)
    const data = await response.json()
    const requiredList = this.convertObjectsDataIntoListItemsUsingForInMethod(
      data,
    )
    this.setState({
      stateDetailsList: requiredList,
      apiStatus: apiStatusList.success,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    let totalConfirmed = 0
    let totalActive = 0
    let totalRecovered = 0
    let totalDeceased = 0
    // getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      // console.log(keyName)
      const isPresent = statesList.some(state => state.state_code === keyName)

      if (data[keyName] && isPresent) {
        const {total} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        totalConfirmed += confirmed
        const deceased = total.deceased ? total.deceased : 0
        totalDeceased += deceased
        const recovered = total.recovered ? total.recovered : 0
        totalRecovered += recovered
        totalActive += confirmed - (deceased + recovered)
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    this.setState({totalActive, totalConfirmed, totalDeceased, totalRecovered})
    return resultList
  }

  getLoadingView = () => (
    <div data-testid="loader" className="spinner-container">
      <Loader
        type="TailSpin"
        color="#007bff"
        height="60"
        width="60"
        ariaLabel="tail-spin-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        radius={0}
      />
    </div>
  )

  getSuccessView = () => {
    const {
      totalActive,
      totalConfirmed,
      totalDeceased,
      totalRecovered,
      stateDetailsList,
    } = this.state
    return (
      <div className="home-container">
        <div className="search-bg-container">
          <div className="search-container">
            <BsSearch className="search-icon" />
            <input
              type="text"
              placeholder="Enter the State"
              className="search-input"
            />
          </div>
        </div>
        <div className="home-tabs-container">
          <div className="tab-container">
            <p className="tabs-heading confirmed">Confirmed</p>
            <ConfirmedIcon />
            <p className="tabs-total-count confirmed">{totalConfirmed}</p>
          </div>
          <div className="tab-container">
            <p className="tabs-heading active">Active</p>
            <ActiveIcon />
            <p className="tabs-total-count active">{totalActive}</p>
          </div>
          <div className="tab-container">
            <p className="tabs-heading recovered">Recovered</p>
            <RecoveredIcon />
            <p className="tabs-total-count recovered">{totalRecovered}</p>
          </div>
          <div className="tab-container">
            <p className="tabs-heading deceased">Deceased</p>
            <DeceasedIcon />
            <p className="tabs-total-count deceased">{totalDeceased}</p>
          </div>
        </div>
        <StateWiseTable stateDetailsList={stateDetailsList} />
        <Footer />
      </div>
    )
  }

  getDesiredView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.loading:
        return this.getLoadingView()
      case apiStatusList.success:
        return this.getSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <Covid19Context.Consumer>
        {value => {
          const {showHamburgerItems} = value

          return (
            <div className="home-bg-container">
              <Header />
              {!showHamburgerItems && this.getDesiredView()}
            </div>
          )
        }}
      </Covid19Context.Consumer>
    )
  }
}

export default Home
