import React from 'react'

const Covid19Context = React.createContext({
  showHamburgerItems: false,
  toggleHamburgerItems: () => {},
  statesList: [],
})

export default Covid19Context
