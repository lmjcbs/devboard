const BASE_URL = 'http://localhost:3000'
const container = document.getElementById('container')

class Position {
  constructor(pos) {
    this.id = pos.id
    this.title = pos.title
    this.company = pos.company
    this.description = pos.description
    this.salaryGBP = pos.salaryGBP
    this.experienceRequired = pos.experienceRequired
    this.location = pos.location
    this.category = pos.category
    this.technology = pos.technology
  }
}

const renderPositions = () => {
  fetch(`${BASE_URL}/positions`)
  .then(resp => resp.json())
  .then(positions => {
    const positionsObjArray = positions.map(position => new Position(position))
  })
}

const renderLocations = () => {
  fetch(`${BASE_URL}/locations`)
  .then(resp => resp.json())
  .then(locations => {
    console.log(locations)
  })
}

const renderCategories = () => {
  fetch(`${BASE_URL}/categories`)
  .then(resp => resp.json())
  .then(categories => {

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
