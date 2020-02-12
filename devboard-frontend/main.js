const BASE_URL = 'http://localhost:3000'

function renderPositions() {
  fetch(`${BASE_URL}/positions`)
  .then(resp => resp.json)
  .then(positions => {

  })
}

function renderLocations() {
  fetch(`${BASE_URL}/locations`)
  .then(resp => resp.json)
  .then(locations => {

  })
}

function renderCategories() {
  fetch(`${BASE_URL}/categories`)
  .then(resp => resp.json)
  .then(categories => {

  })
}

function renderTechnlogies() {
  fetch(`${BASE_URL}/technologies`)
  .then(resp => resp.json)
  .then(technologies => {

  })
}
