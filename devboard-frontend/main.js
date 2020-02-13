const BASE_URL = 'http://localhost:3000'
const containerTitle = () => document.querySelector('#container-title')
const container = () => document.querySelector('#positions-container')

const renderPositions = () => {
  fetch(`${BASE_URL}/positions`)
  .then(resp => resp.json())
  .then(positions => {
    const positionsArray = positions.map(position => new Position(position))
    container().innerHTML = positionsArray.reduce((all, pos) => all += pos.renderPosition(),'')
    containerTitle().textContent = 'All Positions'
  })
}

const renderLocations = () => {
  fetch(`${BASE_URL}/locations`)
  .then(resp => resp.json())
  .then(locations => {
    const locationsArray = locations.map(location => new Location(location))
    container().innerHTML = locationsArray.reduce((all, loc) => all += loc.renderLocation(),'')
    containerTitle().textContent = 'All Locations'
  })
}

const renderCategories = () => {
  fetch(`${BASE_URL}/categories`)
  .then(resp => resp.json())
  .then(categories => {
    const categoriesArray = categories.map(category => new Category(category))
    container().innerHTML = categoriesArray.reduce((all, cat) => all += cat.renderCategory(),'')
    containerTitle().textContent = 'All Categories'
  })
}

const renderTechnlogies = () => {
  fetch(`${BASE_URL}/technologies`)
  .then(resp => resp.json())
  .then(technologies => {
  })
}

document.addEventListener("DOMContentLoaded", () => {
  renderPositions()
});
