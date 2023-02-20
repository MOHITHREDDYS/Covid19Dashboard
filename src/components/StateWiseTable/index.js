import {FcGenericSortingDesc, FcGenericSortingAsc} from 'react-icons/fc'
import './index.css'

const StateWiseTable = props => {
  const {stateDetailsList} = props
  console.log(stateDetailsList)

  return (
    <div className="state-table-container">
      <ul className="states-list-container">
        <li className="state-item">
          <div className=" column-headings state-sorting-container">
            <p>States/UT</p>
            <button
              type="button"
              data-testid="ascendingSort"
              className="ordering-button"
            >
              <FcGenericSortingAsc className="order-icon" />
            </button>
            <button
              type="button"
              data-testid="ascendingSort"
              className="ordering-button"
            >
              <FcGenericSortingDesc className="order-icon" />
            </button>
          </div>
          <p className="column-headings">Confirmed</p>
          <p className="column-headings">Active</p>
          <p className="column-headings">Recovered</p>
          <p className="column-headings">Deceased</p>
          <p className="column-headings">Population</p>
        </li>
        {stateDetailsList.map(state => {
          const {
            name,
            confirmed,
            active,
            recovered,
            deceased,
            population,
          } = state

          return (
            <li key={name} className="state-item value-item">
              <p className="table-values state-name">{name}</p>
              <p className="table-values no-of-confirmed">{confirmed}</p>
              <p className="table-values no-of-active">{active}</p>
              <p className="table-values no-of-recovered">{recovered}</p>
              <p className="table-values no-of-deceased">{deceased}</p>
              <p className="table-values no-of-population">{population}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default StateWiseTable
