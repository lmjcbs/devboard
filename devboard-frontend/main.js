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

const renderTechnologies = () => {
  fetch(`${BASE_URL}/technologies`)
  .then(resp => resp.json())
  .then(technologies => {
    const technologiesArray = technologies.map(technology => new Technology(technology))
    container().innerHTML = technologiesArray.reduce((all, tec) => all += tec.renderTechnology(),'')
    containerTitle().textContent = 'All Technologies'
  })
}

const renderPositionForm = () => {
  containerTitle().textContent = 'Advertise your own position'
  container().innerHTML = `
    <form onsubmit="createPosition();return false;>

      <label for="title">Title</label>
      <input type="text" id="title" name="title" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="company">Company</label>
      <input type="text" id="company" name="company" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="location">Location</label>
      <input type="text" id="location" name="location" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>
      
      <label for="category">Category</label>
      <input type="text" id="category" name="category" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="technology">Technology</label>
      <input type="text" id="technology" name="technology" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="salary_gbp">Salary</label>
      <input type="text" id="salary-gbp" name="salary-gbp" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="experience_required">Experience Required</label>
      <input type="text" id="experience_required" name="experience_required" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="description">Description</label>
      <textarea id="description" name="description" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-8 px-2 pl-10 appearance-none leading-normal"></textarea><br>

      <input type="submit" value="Submit">
    </form>
  `
}

document.addEventListener("DOMContentLoaded", () => {
  renderPositions()
});
