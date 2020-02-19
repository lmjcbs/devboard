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
        switch (true) {
          case (b.salaryGBP > a.salaryGBP):
            return 1;
          case (a.salaryGBP > b.salaryGBP):
            return -1;
          default:
            return 0;
        }
      });
    case 'byCompanyName':
      return positionsArray.sort((a, b) => {
        switch (true) {
          case (a.company > b.company):
            return 1;
          case (b.company > a.company):
            return -1;
          default:
            return 0;
        }
      });
    default:
      return positionsArray;
  }
};

const filterPositionsBySearch = (searchTerm) => (
  getResourceAsync('positions').then((positions) => positions.filter((pos) => (
    pos.title.includes(searchTerm) || pos.company.includes(searchTerm)
  )))
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
  document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault();
    createPosition();
  });
};

// render resouce event listeners
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
document.querySelector('input[type="search"]').addEventListener('search', (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector('input[type="search"]').value;
  renderPositions(filterPositionsBySearch(searchTerm));
});

document.addEventListener('DOMContentLoaded', () => {
  renderPositions(getResourceAsync('positions'));
});
