const Position = require('./position');

const BASE_URL = 'http://localhost:3000';
const containerTitle = () => document.querySelector('#container-title');
const container = () => document.querySelector('#positions-container');

// Abstract async fetch to return resource, avoids repetition in render functions
const getResourceAsync = async (resource) => {
  const response = await fetch(`${BASE_URL}/${resource}`);
  return response.json();
};

const filterPositions = (positionsArray, filter) => {
  switch (filter) {
    case 'bySalary':
      return positionsArray.sort((a, b) => {
        let output;
        if (b.salaryGBP > a.salaryGBP) {
          output = 1;
        } else if (a.salaryGBP > b.salaryGBP) {
          output = -1;
        } return output || 0;
      });
    case 'byCompanyName':
      return positionsArray.sort((a, b) => {
        let output;
        if (a.company > b.company) {
          output = 1;
        } else if (b.company > a.company) {
          output = -1;
        } return output || 0;
      });
    default:
      return positionsArray;
  }
};

const filterPositionsBySearch = (searchTerm) => getResourceAsync('positions').then((positions) => positions.filter((pos) => pos.title.includes(searchTerm) || pos.company.includes(searchTerm)));

const renderPositions = (allPositions = getResourceAsync('positions'), filter = undefined) => {
  allPositions.then((positions) => {
    const positionsArray = positions.map((position) => new Position(position));
    const filteredArray = filterPositions(positionsArray, filter);
    container().innerHTML = filteredArray.reduce((currentOutput, pos) => {
      const newPosition = pos.renderPosition();
      const newOutput = currentOutput + newPosition;
      return newOutput;
    }, '');
    containerTitle().textContent = 'All Positions';
  });
  // --- OLD IMPLEMENTATION USING FETCH INSIDE EACH RENDER ---
  // fetch(`${BASE_URL}/positions`)
  // .then(resp => resp.json())
  // .then((positions) => {
  //   const positionsArray = positions.map(position => new Position(position))
  //   const filteredArray = filterPositions(positionsArray, filter);
  //   container().innerHTML = filteredArray.reduce((all, pos) => all += pos.renderPosition(),'')
  //   containerTitle().textContent = 'All Positions'
  // })
};

const renderLocations = () => {
  getResourceAsync('locations').then((locations) => {
    const locationsArray = locations.map((location) => new Location(location));
    container().innerHTML = locationsArray.reduce((all, loc) => all += loc.renderLocation(), '');
    containerTitle().textContent = 'All Locations';
  });
};

const renderCategories = () => {
  getResourceAsync('categories').then((categories) => {
    const categoriesArray = categories.map((category) => new Category(category));
    container().innerHTML = categoriesArray.reduce((all, cat) => all += cat.renderCategory(), '');
    containerTitle().textContent = 'All Categories';
  });
};

const renderTechnologies = () => {
  getResourceAsync('technologies').then((technologies) => {
    const technologiesArray = technologies.map((technology) => new Technology(technology));
    container().innerHTML = technologiesArray.reduce((all, tec) => all += tec.renderTechnology(), '');
    containerTitle().textContent = 'All Technologies';
  });
};

const createPosition = () => {
  const position = {
    title: document.querySelector('#title').value,
    company: document.querySelector('#company').value,
    location: document.querySelector('#location').value,
    category: document.querySelector('#category').value,
    technology: document.querySelector('#technology').value,
    salary_gbp: document.querySelector('#salary-gbp').value,
    experience_required: document.querySelector('#experience-required').value,
    description: document.querySelector('#description').value,
  };
  fetch(`${BASE_URL}/positions`, {
    method: 'POST',
    body: JSON.stringify(position),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(renderPositions());
};

const renderPositionForm = () => {
  containerTitle().textContent = 'Advertise your own position';
  container().innerHTML = `
    <form>
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

      <label for="salary-gbp">Salary</label>
      <input type="text" id="salary-gbp" name="salary-gbp" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="experience-required">Experience Required</label>
      <input type="text" id="experience-required" name="experience-required" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-1 px-2 pl-10 appearance-none leading-normal"><br>

      <label for="description">Description</label>
      <textarea id="description" name="description" class="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-purple-500 rounded py-8 px-2 pl-10 appearance-none leading-normal"></textarea><br>

      <input type="submit" value="Submit">
    </form>
  `;
  document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault();
    createPosition();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderPositions();
  document.querySelector('input[type="search"]').addEventListener('search', (e) => {
    e.preventDefault();
    const searchTerm = document.querySelector('input[type="search"]').value;
    renderPositions(filterPositionsBySearch(searchTerm));
  });
});
