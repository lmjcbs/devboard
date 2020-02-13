const BASE_URL = 'http://localhost:3000'
const containerTitle = () => document.querySelector('#container-title')
const container = () => document.querySelector('#positions-container')

const renderPositions = () => {
  fetch(`${BASE_URL}/positions`)
  .then(resp => resp.json())
  .then(positions => {
    clearContainer()
    containerTitle().textContent = 'All Positions'
    const positionsArray = positions.map(position => new Position(position))
    positionsArray.forEach(position => container().innerHTML += position.renderPosition())
  })
}

const renderLocations = () => {
  fetch(`${BASE_URL}/locations`)
  .then(resp => resp.json())
  .then(locations => {
    clearContainer()
    containerTitle().textContent = 'All Locations'
    const locationsArray = locations.map(location => new Location(location))
    locationsArray.forEach(location => container().innerHTML += location.renderLocation())
  })
}

const renderCategories = () => {
  fetch(`${BASE_URL}/categories`)
  .then(resp => resp.json())
  .then(categories => {
    const categoriesArray = categories.map(category => new Category(category))
    console.log(categoriesArray)
  })
}

const renderTechnlogies = () => {
  fetch(`${BASE_URL}/technologies`)
  .then(resp => resp.json())
  .then(technologies => {

  })
}

const clearContainer = () => {
  document.querySelector('#positionsContainer').innerHTML = ''
}

document.addEventListener("DOMContentLoaded", () => {
  // console.log(container)
  // renderPositions()
  renderLocations()

});
