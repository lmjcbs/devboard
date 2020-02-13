const BASE_URL = 'http://localhost:3000'
const container = document.querySelector('#positions-container');

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

  renderPosition() {
    return `
    <div id="position-${this.id}">
      <h3>${this.title} at ${this.company}</h3>
      <p>${this.location}</p>
      <p>${this.category} |  ${this.technology}</p>
      <p>Salary: £${this.salaryGBP}</p>
      <p>Experience Required: ${this.experienceRequired}</p>
      <p>${this.description}</p>
    </div>
    `
  }
}

const renderPositions = () => {
  fetch(`${BASE_URL}/positions`)
  .then(resp => resp.json())
  .then(positions => {
    const positionsArray = positions.map(position => new Position(position))
    positionsArray.forEach(position => container.innerHTML += position.renderPosition())
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
