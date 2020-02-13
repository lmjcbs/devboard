const BASE_URL = 'http://localhost:3000'
const containerTitle = () => document.querySelector('#container-title')
const container = () => document.querySelector('#positionsContainer')

const renderPositions = () => {
  fetch(`${BASE_URL}/positions`)
  .then(resp => resp.json())
  .then(positions => {
    clearContainer()
    // const containerTitle = document.querySelector('#container-title')
    containerTitle().textContent = 'All Positions'
    const positionsArray = positions.map(position => new Position(position))
    // const container = document.querySelector('#positionsContainer')
    positionsArray.forEach(position => container().innerHTML += position.renderPosition())
  })
}

const renderLocations = () => {
  fetch(`${BASE_URL}/locations`)
  .then(resp => resp.json())
  .then(locations => {
    clearContainer()
    // const containerTitle = document.querySelector('#container-title')
    containerTitle().textContent = 'All Locations'
    const locationsArray = locations.map(location => new Location(location))
    // const container = document.querySelector('#positionsContainer')
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
