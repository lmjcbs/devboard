const BASE_URL = 'http://localhost:3000';
const containerTitle = () => document.querySelector('#container-title');
const container = () => document.querySelector('#positions-container');

// Abstract async fetch to return resource, avoids repetition in render functions
const getResourceAsync = async (resource) => {
  const response = await fetch(`${BASE_URL}/${resource}`);
  return response.json();
};

// Order positions by salary or company name filter term
const filterPositions = (positionsArray, filter) => {
  switch (filter) {
    case 'bySalary':
      return positionsArray.sort((a, b) => b.salaryGBP - a.salaryGBP);
    case 'byCompanyName':
      return positionsArray.sort((a, b) => {
        // Ignores company name casing
        const comapanyA = a.company.toUpperCase();
        const comapanyB = b.company.toUpperCase();
        switch (true) {
          case (comapanyA > comapanyB):
            return 1;
          case (comapanyB > comapanyA):
            return -1;
          default:
            return 0;
        }
      });
    default:
      return positionsArray;
  }
};

// returns positions by title or company name if match
const filterPositionsBySearch = (searchTerm) => (
  getResourceAsync('positions').then((positions) => {
    let filtered = positions.filter((pos) => (
      pos.title.includes(searchTerm) || pos.company.includes(searchTerm)
    ));
    filtered = filtered.map((position) => new Position(position));
    container().innerHTML = filtered.reduce((total, pos) => total + pos.renderPosition(), '');
    containerTitle().textContent = `Showing results for '${searchTerm}'`;
  })
);

const renderPositions = (positionsPromise = getResourceAsync('positions'), filter = undefined) => {
  positionsPromise.then((positions) => {
    const positionsArray = positions.map((position) => new Position(position));
    const filteredArray = filterPositions(positionsArray, filter);
    container().innerHTML = filteredArray.reduce((total, pos) => total + pos.renderPosition(), '');
    containerTitle().textContent = 'All Positions';
  });
};

const renderLocations = () => {
  getResourceAsync('locations').then((locations) => {
    const locationsArray = locations.map((location) => new Location(location));
    container().innerHTML = locationsArray.reduce((total, loc) => total + loc.renderLocation(), '');
    containerTitle().textContent = 'All Locations';
  });
};

const renderCategories = () => {
  getResourceAsync('categories').then((categories) => {
    const categoriesArray = categories.map((category) => new Category(category));
    container().innerHTML = categoriesArray.reduce((total, cat) => total + cat.renderCategory(), '');
    containerTitle().textContent = 'All Categories';
  });
};

const renderTechnologies = () => {
  getResourceAsync('technologies').then((technologies) => {
    const technologiesArray = technologies.map((technology) => new Technology(technology));
    container().innerHTML = technologiesArray.reduce((total, tec) => total + tec.renderTechnology(), '');
    containerTitle().textContent = 'All Technologies';
  });
};

// POSTs position to /positions, handled by PositionsController#create
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
  }).then(renderPositions());
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
  // Override default form submit, post data using fetch
  document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault();
    createPosition();
  });
};
// add event listeners to filter buttons
document.querySelector('#filter-by-salary').addEventListener('click', (e) => {
  e.preventDefault();
  renderPositions(getResourceAsync('positions'), 'bySalary');
});

document.querySelector('#filter-by-company').addEventListener('click', (e) => {
  e.preventDefault();
  renderPositions(getResourceAsync('positions'), 'byCompanyName');
});

// render resource event listeners
document.querySelector('#positions-link').addEventListener('click', (e) => {
  e.preventDefault();
  renderPositions(getResourceAsync('positions'));
});

document.querySelector('#locations-link').addEventListener('click', (e) => {
  e.preventDefault();
  renderLocations();
});

document.querySelector('#categories-link').addEventListener('click', (e) => {
  e.preventDefault();
  renderCategories();
});

document.querySelector('#technologies-link').addEventListener('click', (e) => {
  e.preventDefault();
  renderTechnologies();
});

// render advertise positions form event listener
document.querySelector('#advertise-job').addEventListener('click', (e) => {
  e.preventDefault();
  renderPositionForm();
});

// add search function listener to search bar
const searchBar = document.querySelector('input[type="search"]');
searchBar.addEventListener('search', (e) => {
  e.preventDefault();
  const searchTerm = searchBar.value;
  (filterPositionsBySearch(searchTerm));
});

document.addEventListener('DOMContentLoaded', () => {
  renderPositions(getResourceAsync('positions'));
});
